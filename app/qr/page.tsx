'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Printer, QrCode, BookOpen, Smartphone, ArrowLeft, ArrowRight } from 'lucide-react'
import { useUIStore } from '@/lib/store'

const ORDER_QR = '/images/order-qr.png'

/**
 * Standalone, print-friendly QR ordering card — designed to be printed and
 * placed on tables. Scanning opens /menu so the customer orders from their phone.
 */
export default function QRPage() {
  const { language } = useUIStore()
  const isAr = language === 'ar'

  const steps = isAr
    ? ['امسح الباركود', 'تصفّح المنيو', 'اطلب من هاتفك']
    : ['Scan the code', 'Browse the menu', 'Order from your phone']
  const stepIcons = [QrCode, BookOpen, Smartphone]

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-5 py-10"
      style={{ background: 'linear-gradient(135deg, var(--brand-surface) 0%, var(--brand-noir) 55%, var(--brand-noir-2) 100%)' }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div
        className="w-full max-w-md rounded-[2rem] px-7 py-9 text-center"
        style={{
          background: 'linear-gradient(145deg, rgba(58, 27, 42,0.96) 0%, rgba(58, 27, 42,0.85) 100%)',
          border: '1px solid rgba(231,198,164,0.32)',
          boxShadow: '0 24px 70px rgba(253,101,125,0.22)',
        }}
      >
        {/* Brand */}
        <div className="relative w-20 h-20 mx-auto mb-3">
          <Image src="/images/logo.webp" alt="PASTATARAM" fill className="object-contain" unoptimized priority />
        </div>
        <p className="logo-text font-black text-2xl tracking-wide gradient-text mb-1">PASTATARAM</p>
        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-6" style={{ color: '#FD657D' }}>
          {isAr ? 'اطلب عبر الباركود' : 'QR Ordering'}
        </p>

        {/* QR */}
        <div
          className="rounded-3xl bg-[var(--brand-noir-2)] p-5 mx-auto mb-6"
          style={{ border: '2px solid rgba(231,198,164,0.35)', boxShadow: '0 8px 28px rgba(253,101,125,0.16)' }}
        >
          <img src={ORDER_QR} alt={isAr ? 'باركود الطلب' : 'Order QR code'} className="w-full h-auto" />
        </div>

        <p className="font-black text-lg mb-5" style={{ color: '#FFF3EE' }}>
          {isAr ? 'امسح لعرض المنيو والطلب' : 'Scan to view the menu & order'}
        </p>

        {/* Steps */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {steps.map((label, i) => {
            const Icon = stepIcons[i]
            return (
              <div key={label} className="flex flex-col items-center gap-1.5 w-24">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--brand-surface), #F0D3B0)' }}>
                  <Icon className="w-5 h-5" style={{ color: '#D8C2BD' }} />
                </div>
                <span className="text-[11px] font-bold leading-tight" style={{ color: '#F3E2DC' }}>{label}</span>
              </div>
            )
          })}
        </div>

        <p className="text-xs font-semibold" style={{ color: 'rgba(216,194,189,0.5)' }}>pastataram.vercel.app/menu</p>
      </div>

      {/* Actions — hidden when printing */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-7 print:hidden">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white text-sm"
          style={{ background: 'linear-gradient(135deg, #FD657D, #E7C6A4)', boxShadow: '0 8px 24px rgba(253,101,125,0.35)' }}
        >
          <Printer className="w-4 h-4" />
          {isAr ? 'اطبع بطاقة الطاولة' : 'Print table card'}
        </button>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm"
          style={{ background: 'rgba(58, 27, 42,0.7)', border: '1.5px solid rgba(231,198,164,0.5)', color: '#D8C2BD' }}
        >
          {isAr ? 'افتح المنيو' : 'Open the menu'}
          {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>
    </main>
  )
}
