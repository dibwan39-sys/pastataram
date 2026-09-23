'use client'

import { Check, Minus, Plus } from 'lucide-react'
import type { Extra } from '@/lib/types'

/**
 * The small ordering controls shared by the product card and the product
 * sheet: a price, a quantity stepper and the add-on picker. Keeping them here
 * means an add-on looks and priced the same wherever the customer meets it.
 */

export function Price({ value, isAr, size = 'md' }: { value: number; isAr: boolean; size?: 'sm' | 'md' | 'lg' }) {
  const digits = size === 'lg' ? 'text-[2.25rem]' : size === 'sm' ? 'text-xl' : 'text-[1.7rem]'
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span
        className={`${digits} font-black leading-none tabular-nums`}
        style={{
          background: 'linear-gradient(135deg, #FD657D, #FF8B9D 60%, #E7C6A4)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {value}
      </span>
      <span className="text-sm font-bold text-brand-champagne">{isAr ? 'ر.س' : 'SAR'}</span>
    </span>
  )
}

export function QuantityStepper({
  value,
  onChange,
  isAr,
  label,
}: {
  value: number
  onChange: (n: number) => void
  isAr: boolean
  label: string
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-full p-1"
      style={{ background: 'rgba(82, 22, 47,0.7)', border: '1px solid rgba(231,198,164,0.32)' }}
    >
      <button
        type="button"
        aria-label={isAr ? 'إنقاص الكمية' : 'Decrease quantity'}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-surface-2)] text-brand-cream-dim transition-colors hover:bg-[var(--brand-surface-3)] disabled:opacity-40"
      >
        <Minus className="h-3.5 w-3.5" aria-hidden />
      </button>
      <output className="w-8 text-center text-sm font-black tabular-nums text-brand-cream" aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        aria-label={isAr ? 'زيادة الكمية' : 'Increase quantity'}
        onClick={() => onChange(value + 1)}
        disabled={value >= 99}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-surface-2)] text-brand-cream-dim transition-colors hover:bg-[var(--brand-surface-3)] disabled:opacity-40"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  )
}

export function ExtrasPicker({
  extras,
  selectedIds,
  onToggle,
  isAr,
  heading,
}: {
  extras: Extra[]
  selectedIds: string[]
  onToggle: (id: string) => void
  isAr: boolean
  heading?: string
}) {
  if (extras.length === 0) return null

  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-champagne">
        {heading ?? (isAr ? 'أضِف إضافتك' : 'Add your extra')}
      </legend>
      <div className="flex flex-wrap gap-2">
        {extras.map((extra) => {
          const active = selectedIds.includes(extra.id)
          return (
            <button
              key={extra.id}
              type="button"
              onClick={() => onToggle(extra.id)}
              aria-pressed={active}
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] font-bold transition-colors"
              style={{
                background: active ? 'linear-gradient(135deg, #C43E57, #FD657D)' : 'rgba(82, 22, 47,0.7)',
                border: `1px solid ${active ? 'rgba(255,179,191,0.7)' : 'rgba(231,198,164,0.32)'}`,
                color: active ? '#FFF3EE' : '#D8C2BD',
              }}
            >
              {active ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Plus className="h-3.5 w-3.5" aria-hidden />}
              {isAr ? extra.nameAr : extra.name}
              {/* The surcharge comes from lib/data.ts — never typed in here. */}
              {extra.price > 0 && (
                <span className={active ? 'opacity-90' : 'text-brand-champagne'}>
                  +{extra.price} {isAr ? 'ر.س' : 'SAR'}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
