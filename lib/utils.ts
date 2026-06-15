import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Language } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, lang: Language = 'ar'): string {
  if (lang === 'ar') return `${price} ر.س`
  return `${price} SAR`
}

export function generateOrderNumber(): string {
  const prefix = 'PT'
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0')
  return `${prefix}-${timestamp}-${random}`
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function getWhatsAppLink(phone: string, message: string): string {
  const encodedMessage = encodeURIComponent(message)
  const cleanPhone = phone.replace(/\s+/g, '').replace(/^0/, '966')
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

export function formatDate(date: Date, lang: Language = 'ar'): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const locale = lang === 'ar' ? 'ar-SA' : 'en-US'
  return new Intl.DateTimeFormat(locale, options).format(new Date(date))
}

export function getStatusLabel(status: string, lang: Language): string {
  const labels: Record<string, { ar: string; en: string }> = {
    pending: { ar: 'قيد الانتظار', en: 'Pending' },
    preparing: { ar: 'قيد التحضير', en: 'Preparing' },
    ready: { ar: 'جاهز للاستلام', en: 'Ready for Pickup' },
    completed: { ar: 'مكتمل', en: 'Completed' },
    cancelled: { ar: 'ملغي', en: 'Cancelled' },
  }
  return labels[status]?.[lang] || status
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'text-amber-600 bg-amber-50',
    preparing: 'text-blue-600 bg-blue-50',
    ready: 'text-green-600 bg-green-50',
    completed: 'text-gray-600 bg-gray-50',
    cancelled: 'text-red-600 bg-red-50',
  }
  return colors[status] || 'text-gray-600 bg-gray-50'
}

export function t(key: string, lang: Language, translations: Record<string, { ar: string; en: string }>): string {
  return translations[key]?.[lang] || key
}

/**
 * PASTATARAM trading hours: open daily 3:00 PM → 3:00 AM (next day).
 * Computed against real Jeddah local time (Asia/Riyadh, UTC+3) so the
 * status is correct regardless of the visitor's device timezone.
 */
export interface OpenStatus {
  open: boolean
  /** Short bilingual label, e.g. "Open Now" / "مفتوح الآن". */
  label: string
  /** Secondary line, e.g. "Closes 3:00 AM" / "يفتح ٣:٠٠ مساءً". */
  detail: string
}

const OPEN_HOUR = 15 // 3 PM
const CLOSE_HOUR = 3 // 3 AM (next day)

/** Current hour+minute in Asia/Riyadh as decimal hours (e.g. 15.5 = 3:30 PM). */
function riyadhDecimalHours(now: Date = new Date()): number {
  // Riyadh has no DST; a fixed +3 offset from UTC is exact.
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes()
  const riyadhMinutes = (utcMinutes + 3 * 60) % (24 * 60)
  return riyadhMinutes / 60
}

export function getOpenStatus(lang: Language = 'ar', now: Date = new Date()): OpenStatus {
  const h = riyadhDecimalHours(now)
  // Open if 15:00 ≤ h < 24:00 OR 0:00 ≤ h < 3:00
  const open = h >= OPEN_HOUR || h < CLOSE_HOUR

  if (lang === 'ar') {
    return {
      open,
      label: open ? 'مفتوح الآن' : 'مغلق الآن',
      detail: open ? 'يغلق ٣:٠٠ فجراً' : 'يفتح ٣:٠٠ مساءً',
    }
  }
  return {
    open,
    label: open ? 'Open Now' : 'Closed',
    detail: open ? 'Closes 3:00 AM' : 'Opens 3:00 PM',
  }
}
