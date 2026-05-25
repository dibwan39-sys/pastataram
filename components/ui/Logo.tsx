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
        <Image
          src="/images/logo.png"
          alt="PASTATARAM Logo"
          fill
          className="object-contain"
          priority
          unoptimized
        />
      </div>
      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className={cn(
              'logo-text font-black tracking-wide',
              text,
              textColor === 'gradient' && 'gradient-text',
              textColor === 'dark' && 'text-brand-espresso',
              textColor === 'light' && 'text-white',
            )}
          >
            PASTATA
          </span>
          <span
            className={cn(
              'logo-text font-black tracking-widest -mt-1',
              size === 'sm' ? 'text-xs' : 'text-sm',
              textColor === 'gradient' && 'gradient-text',
              textColor === 'dark' && 'text-brand-espresso',
              textColor === 'light' && 'text-white/80',
            )}
          >
            RAM
          </span>
        </div>
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
