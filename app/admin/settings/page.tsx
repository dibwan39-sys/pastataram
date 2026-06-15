'use client'

import { useState } from 'react'
import { Save, Phone, MapPin, Clock, Instagram, MessageCircle } from 'lucide-react'
import { cmsContent, businessHours } from '@/lib/data'
import toast from 'react-hot-toast'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    phone: cmsContent.phone,
    whatsapp: cmsContent.whatsappNumber,
    address: cmsContent.address,
    addressAr: cmsContent.addressAr,
    instagram: '@pastataram',
    tiktok: '@pastataram',
    snapchat: '@pastataram',
  })
  const [hours, setHours] = useState(businessHours)

  const handleSave = () => {
    toast.success('Settings saved successfully!')
  }

  const updateHour = (index: number, field: string, value: string | boolean) => {
    setHours(hours.map((h, i) => i === index ? { ...h, [field]: value } : h))
  }

  const sections = [
    {
      title: 'Contact Information',
      icon: Phone,
      fields: [
        { key: 'phone', label: 'Phone Number', type: 'text', dir: 'ltr' },
        { key: 'whatsapp', label: 'WhatsApp Number', type: 'text', dir: 'ltr' },
      ],
    },
    {
      title: 'Location',
      icon: MapPin,
      fields: [
        { key: 'address', label: 'Address (EN)', type: 'text', dir: 'ltr' },
        { key: 'addressAr', label: 'Address (AR)', type: 'text', dir: 'rtl' },
      ],
    },
    {
      title: 'Social Media',
      icon: Instagram,
      fields: [
        { key: 'instagram', label: 'Instagram Handle', type: 'text', dir: 'ltr' },
        { key: 'tiktok', label: 'TikTok Handle', type: 'text', dir: 'ltr' },
        { key: 'snapchat', label: 'Snapchat Handle', type: 'text', dir: 'ltr' },
      ],
    },
  ]

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory">Settings</h1>
          <p className="text-sm text-brand-latte mt-1">Manage restaurant information and configuration</p>
        </div>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* Info sections */}
      {sections.map((section) => {
        const Icon = section.icon
        return (
          <div key={section.title} className="bg-[#1A1614] dark:bg-[#1A1614] rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-brand-blush flex items-center justify-center">
                <Icon className="w-4 h-4 text-brand-rose-gold" />
              </div>
              <h3 className="font-bold text-brand-espresso dark:text-brand-ivory">{section.title}</h3>
            </div>
            <div className="space-y-4">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-brand-espresso dark:text-brand-ivory mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={(settings as any)[field.key]}
                    onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                    dir={field.dir}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory focus:outline-none focus:border-brand-rose-gold text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* Business Hours */}
      <div className="bg-[#1A1614] dark:bg-[#1A1614] rounded-2xl p-6 shadow-card">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-brand-blush flex items-center justify-center">
            <Clock className="w-4 h-4 text-brand-rose-gold" />
          </div>
          <h3 className="font-bold text-brand-espresso dark:text-brand-ivory">Business Hours</h3>
        </div>
        <div className="space-y-3">
          {hours.map((day, i) => (
            <div key={day.day} className="flex items-center gap-4">
              <div className="w-28 flex-shrink-0">
                <p className="text-sm font-semibold text-brand-espresso dark:text-brand-ivory">{day.day}</p>
                <p className="text-xs text-brand-latte">{day.dayAr}</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!day.closed}
                  onChange={(e) => updateHour(i, 'closed', !e.target.checked)}
                  className="rounded"
                />
                <span className="text-xs text-brand-latte">{day.closed ? 'Closed' : 'Open'}</span>
              </label>
              {!day.closed && (
                <>
                  <input
                    type="time"
                    value={day.open}
                    onChange={(e) => updateHour(i, 'open', e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory focus:outline-none text-sm"
                  />
                  <span className="text-brand-latte text-sm">to</span>
                  <input
                    type="time"
                    value={day.close}
                    onChange={(e) => updateHour(i, 'close', e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory focus:outline-none text-sm"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2 px-8 py-3">
          <Save className="w-4 h-4" />
          Save All Settings
        </button>
      </div>
    </div>
  )
}
