'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  href?: string
  className?: string
  textColor?: 'dark' | 'light' | 'gradient'
}

const sizes = {
  sm: { img: 36, text: 'text-base' },
  md: { img: 48, text: 'text-xl' },
  lg: { img: 64, text: 'text-2xl' },
  xl: { img: 96, text: 'text-3xl' },
}

export default function Logo({
  size = 'md',
  showText = false,
  href = '/',
  className,
  textColor = 'gradient',
}: LogoProps) {
  const { img, text } = sizes[size]

  const content = (
    <div className={cn('flex items-center gap-2 select-none', className)}>
      <div
        className="relative flex-shrink-0 drop-shadow-lg"
        style={{ width: img, height: img }}
      >
        {/*
          Neither `unoptimized` nor `priority` belongs on a 36–96px mark.

          `unoptimized` served the 1536px, 264 KB master for a logo drawn at
          36px in the navbar — measured on a cold load, that was the single
          largest eagerly fetched asset on the page after the menu artwork.
          `priority` then put it in front of the hero photograph in the fetch
          queue and added an encode job competing with it.

          `sizes` is what lets the browser pick the right variant; without it
          next/image has to assume the full viewport width.
        */}
        <Image
          src="/images/logo.webp"
          alt="PASTATARAM Logo"
          fill
          sizes={`${img}px`}
          className="object-contain"
        />
      </div>
      {showText && (
        <span
          className={cn(
            'logo-text font-black tracking-wide leading-tight',
            text,
            textColor === 'gradient' && 'gradient-text',
            textColor === 'dark' && 'text-brand-espresso',
            textColor === 'light' && 'text-white',
          )}
        >
          PASTATARAM
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {content}
      </Link>
    )
  }

  return content
}
