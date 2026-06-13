'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Instagram, Send, ExternalLink } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { useUIStore } from '@/lib/store'
import { cmsContent, branches, workingHours } from '@/lib/data'
import { getWhatsAppLink } from '@/lib/utils'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const { language } = useUIStore()
  const isAr = language === 'ar'
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const waLink = getWhatsAppLink(
    cmsContent.whatsappNumber,
    isAr ? 'السلام عليكم، أريد طلب من باستاتا رام' : 'Hello, I would like to order from PASTATARAM'
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `${form.name}: ${form.message}`
    window.open(getWhatsAppLink(cmsContent.whatsappNumber, msg), '_blank')
    toast.success(isAr ? 'تم توجيهك لواتساب!' : 'Redirecting to WhatsApp!')
    setForm({ name: '', phone: '', message: '' })
  }

  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@pastataram',
      href: 'https://instagram.com/pastataram',
      color: 'from-purple-500 to-pink-500',
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      handle: '050 193 8696',
      href: waLink,
      color: 'from-green-500 to-emerald-600',
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
  ]

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative py-24 bg-gradient-to-br from-brand-cream via-brand-blush/30 to-brand-pearl dark:from-[#1C1410] dark:via-[#2A1F1C] dark:to-[#1C1410]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-brand-rose-gold text-sm font-bold mb-6">
              <MapPin className="w-4 h-4" />
              {isAr ? 'تواصل معنا' : 'Contact Us'}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-espresso dark:text-brand-ivory mb-4">
              {isAr ? 'الموقع والتواصل' : 'Location & Contact'}
            </h1>
            <p className="text-brand-brown dark:text-brand-mocha max-w-lg mx-auto">
              {isAr ? 'يسعدنا خدمتكم وتلقي استفساراتكم في أي وقت' : 'We are happy to serve you and receive your inquiries at any time'}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Location Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="premium-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blush flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-rose-gold" />
                  </div>
                  <h3 className="font-bold text-brand-espresso dark:text-brand-ivory">
                    {isAr ? 'فروعنا' : 'Our Branches'}
                  </h3>
                </div>
                <div className="space-y-3 mb-4">
                  {branches.map((b) => (
                    <div key={b.id} className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-brand-rose-gold flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-brand-espresso dark:text-brand-ivory text-sm">
                          {isAr ? `الفرع ${b.id} · ${b.nameAr}` : `Branch ${b.id} · ${b.nameEn}`}
                        </p>
                        <p className="text-sm text-brand-brown dark:text-brand-mocha">
                          {isAr ? b.detailAr : b.detailEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="https://maps.google.com/?q=Al+Qurainiyah+Jeddah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-rose-gold font-semibold text-sm hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  {isAr ? 'افتح في الخريطة' : 'Open in Maps'}
                </a>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="premium-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blush flex items-center justify-center">
                    <Phone className="w-5 h-5 text-brand-rose-gold" />
                  </div>
                  <h3 className="font-bold text-brand-espresso dark:text-brand-ivory">
                    {isAr ? 'رقم الهاتف' : 'Phone Number'}
                  </h3>
                </div>
                <a
                  href={`tel:${cmsContent.phone}`}
                  className="text-2xl font-black gradient-text"
                  dir="ltr"
                >
                  {cmsContent.phone}
                </a>
              </motion.div>

              {/* Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="premium-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blush flex items-center justify-center">
                    <Clock className="w-5 h-5 text-brand-rose-gold" />
                  </div>
                  <h3 className="font-bold text-brand-espresso dark:text-brand-ivory">
                    {isAr ? 'أوقات العمل' : 'Working Hours'}
                  </h3>
                </div>
                <p className="text-brand-espresso dark:text-brand-ivory font-semibold">
                  {isAr ? workingHours.ar : workingHours.en}
                </p>
              </motion.div>

              {/* Social */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="premium-card p-6"
              >
                <h3 className="font-bold text-brand-espresso dark:text-brand-ivory mb-4">
                  {isAr ? 'تواصل اجتماعي' : 'Social Media'}
                </h3>
                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-blush/50 dark:hover:bg-brand-espresso/30 transition-colors group"
                    >
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center flex-shrink-0`}>
                        {social.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-brand-espresso dark:text-brand-ivory">
                          {social.name}
                        </p>
                        <p className="text-xs text-brand-latte">{social.handle}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-brand-latte ms-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Map + Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Map placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative h-72 rounded-3xl overflow-hidden shadow-brand"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3712.8!2d39.14!3d21.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDM0JzQ4LjAiTiAzOcKwMDgnMjQuMCJF!5e0!3m2!1sar!2ssa!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[30%]"
                />
                <div className="absolute inset-0 pointer-events-none border-4 border-brand-rose/20 rounded-3xl" />
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="premium-card p-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Send className="w-5 h-5 text-brand-rose-gold" />
                  <h3 className="font-black text-brand-espresso dark:text-brand-ivory">
                    {isAr ? 'أرسل رسالة' : 'Send a Message'}
                  </h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-brand-espresso dark:text-brand-ivory mb-1.5">
                        {isAr ? 'الاسم' : 'Name'}
                      </label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={isAr ? 'اسمك' : 'Your name'}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-espresso/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold text-sm"
                        dir={isAr ? 'rtl' : 'ltr'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-espresso dark:text-brand-ivory mb-1.5">
                        {isAr ? 'الهاتف' : 'Phone'}
                      </label>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="05xxxxxxxx"
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-espresso/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold text-sm"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-espresso dark:text-brand-ivory mb-1.5">
                      {isAr ? 'الرسالة' : 'Message'}
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={isAr ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-espresso/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold resize-none text-sm"
                      dir={isAr ? 'rtl' : 'ltr'}
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {isAr ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
