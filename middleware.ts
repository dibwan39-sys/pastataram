import { NextResponse, type NextRequest } from 'next/server'

/**
 * ════════════════════════════════════════════════════════════════
 *  /admin — protected at the request boundary
 * ════════════════════════════════════════════════════════════════
 *
 *  What this replaces: the dashboard used to be reachable by anyone who
 *  typed the URL. A single button granted `role: 'super_admin'` with no
 *  credential, and the only thing standing between the public and the panel
 *  was a React component deciding not to render — which is not a boundary at
 *  all, because the page, its data and its bundle had already been sent.
 *
 *  This check runs in middleware, before the admin application renders and
 *  before any admin markup leaves the server. An unauthenticated request
 *  receives 401 and nothing else.
 *
 *  ── What this is ──────────────────────────────────────────────────────
 *  HTTP Basic authentication over a shared secret held in the environment.
 *  It is the strongest protection this deployment can carry honestly: the
 *  project has no database, no user table and no session store, so there is
 *  nothing to authenticate a person against. A shared password verified on
 *  the server is a real boundary; a password compared in the browser is not.
 *
 *  ── What this is NOT ──────────────────────────────────────────────────
 *  It is not per-user identity, and it carries the limits of the scheme:
 *
 *    · One secret for the whole team. Rotating it signs everyone out.
 *    · No audit trail — the server cannot tell who acted.
 *    · Credentials ride on every request, so HTTPS is doing real work here.
 *      Vercel terminates TLS for every deployment; a self-hosted origin must
 *      not be served over plain HTTP.
 *    · No logout. The browser caches Basic credentials until it is closed.
 *
 *  Those limits are the reason this is a floor, not a destination. Real
 *  per-user auth belongs with the backend that will eventually own orders
 *  and reviews.
 *
 *  ── Fail closed ───────────────────────────────────────────────────────
 *  With ADMIN_PASSWORD unset the answer is 503, never "let them in". A
 *  missing secret is a misconfiguration, and the safe reading of a
 *  misconfigured lock is that the door stays shut.
 */

const REALM = 'PASTATARAM admin'

/**
 * Compares without leaking the answer through timing. `===` on strings can
 * return early at the first differing byte, which over enough requests tells
 * an attacker how much of a guess was right.
 */
function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder()
  const x = enc.encode(a)
  const y = enc.encode(b)
  // Length is not a secret worth protecting here, but the comparison still
  // walks the longer of the two so a wrong length costs the same as a wrong byte.
  const len = Math.max(x.length, y.length)
  let diff = x.length ^ y.length
  for (let i = 0; i < len; i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0)
  return diff === 0
}

function unauthorized(body: string, status: 401 | 503) {
  const headers: Record<string, string> = {
    'content-type': 'text/plain; charset=utf-8',
    // Keep an unauthenticated response out of every cache between here and
    // the browser, so a 401 can never be replayed to someone who should see
    // the panel — or a 200 to someone who should not.
    'cache-control': 'no-store',
  }
  if (status === 401) headers['www-authenticate'] = `Basic realm="${REALM}", charset="UTF-8"`
  return new NextResponse(body, { status, headers })
}

export function middleware(request: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD
  const expectedUser = process.env.ADMIN_USER || 'admin'

  if (!expected) {
    return unauthorized(
      'Admin is unavailable: ADMIN_PASSWORD is not configured on the server.',
      503,
    )
  }

  const header = request.headers.get('authorization') || ''
  if (!header.toLowerCase().startsWith('basic ')) {
    return unauthorized('Authentication required.', 401)
  }

  let decoded: string
  try {
    decoded = atob(header.slice(6).trim())
  } catch {
    return unauthorized('Authentication required.', 401)
  }

  // Only the FIRST colon separates user from password — a password may contain
  // colons, and splitting on all of them would reject valid credentials.
  const sep = decoded.indexOf(':')
  const user = sep === -1 ? '' : decoded.slice(0, sep)
  const pass = sep === -1 ? '' : decoded.slice(sep + 1)

  // Both comparisons always run: short-circuiting on the username would reveal
  // whether a guessed username was correct.
  const userOk = safeEqual(user, expectedUser)
  const passOk = safeEqual(pass, expected)
  if (!userOk || !passOk) {
    return unauthorized('Authentication required.', 401)
  }

  return NextResponse.next()
}

/**
 * Every admin route, and nothing else. The public site never enters this
 * middleware, so it cannot be slowed or broken by it.
 */
export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
