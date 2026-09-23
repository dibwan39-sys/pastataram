'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

/** Read-only star row, used on review cards. */
export function StarDisplay({ value, size = 14, label }: { value: number; size?: number; label?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={label ?? `${value} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden
          style={{ width: size, height: size }}
          className={n <= value ? 'star-filled' : 'star-empty'}
        />
      ))}
    </span>
  )
}

/**
 * Star input.
 *
 * Built from real radio inputs so it is operable by keyboard and announced
 * correctly, with the stars drawn on top. Hovering previews a score without
 * committing it.
 */
export function StarInput({
  name,
  value,
  onChange,
  label,
  size = 26,
}: {
  name: string
  value: number
  onChange: (n: number) => void
  label: string
  size?: number
}) {
  const [hover, setHover] = useState(0)
  const shown = hover || value

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-brand-cream-soft">{label}</legend>
      <div className="flex items-center gap-1.5" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label
            key={n}
            className="cursor-pointer rounded p-0.5 transition-transform hover:scale-110 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#FD657D]"
            onMouseEnter={() => setHover(n)}
          >
            <input
              type="radio"
              name={name}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className="sr-only"
            />
            <Star
              aria-hidden
              style={{ width: size, height: size }}
              className={n <= shown ? 'star-filled' : 'star-empty'}
            />
            <span className="sr-only">{n}</span>
          </label>
        ))}
        <span className="ms-2 text-sm font-bold tabular-nums text-brand-champagne" aria-hidden>
          {shown > 0 ? `${shown}/5` : '—'}
        </span>
      </div>
    </fieldset>
  )
}
