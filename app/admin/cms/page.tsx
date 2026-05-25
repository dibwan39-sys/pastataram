'use client'

import { useState } from 'react'
import { Save, FileText, Image, Type, Layout } from 'lucide-react'
import { cmsContent } from '@/lib/data'
import toast from 'react-hot-toast'

export default function AdminCMSPage() {
  const [content, setContent] = useState({
    heroTitleAr: cmsContent.heroTitleAr,
    heroTitleEn: cmsContent.heroTitle,
    heroSubtitleAr: cmsContent.heroSubtitleAr,
    heroSubtitleEn: cmsContent.heroSubtitle,
    heroImage: cmsContent.heroImage,
    aboutTextAr: cmsContent.aboutTextAr,
    aboutTextEn: cmsContent.aboutText,
  })

  const handleSave = () => toast.success('CMS content saved!')

  const sections = [
    {
      id: 'hero',
      title: 'Hero Section',
      icon: Layout,
      fields: [
        { key: 'heroTitleAr', label: 'Hero Title (Arabic)', type: 'text', dir: 'rtl', rows: 2 },
        { key: 'heroTitleEn', label: 'Hero Title (English)', type: 'text', dir: 'ltr', rows: 2 },
        { key: 'heroSubtitleAr', label: 'Hero Subtitle (Arabic)', type: 'text', dir: 'rtl', rows: 2 },
        { key: 'heroSubtitleEn', label: 'Hero Subtitle (English)', type: 'text', dir: 'ltr', rows: 2 },
        { key: 'heroImage', label: 'Hero Background Image URL', type: 'text', dir: 'ltr', rows: 1 },
      ],
    },
    {
      id: 'about',
      title: 'About Section',
      icon: Type,
      fields: [
        { key: 'aboutTextAr', label: 'About Text (Arabic)', type: 'textarea', dir: 'rtl', rows: 4 },
        { key: 'aboutTextEn', label: 'About Text (English)', type: 'textarea', dir: 'ltr', rows: 4 },
      ],
    },
  ]

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory">CMS Content</h1>
          <p className="text-sm text-brand-latte mt-1">Manage website content and text</p>
        </div>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {sections.map((section) => {
        const Icon = section.icon
        return (
          <div key={section.id} className="bg-white dark:bg-[#2A1F1C] rounded-2xl p-6 shadow-card">
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
                  {field.rows > 1 ? (
                    <textarea
                      value={(content as any)[field.key]}
                      onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                      rows={field.rows}
                      dir={field.dir}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-espresso/30 text-brand-espresso dark:text-brand-ivory focus:outline-none focus:border-brand-rose-gold text-sm resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={(content as any)[field.key]}
                      onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                      dir={field.dir}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-espresso/30 text-brand-espresso dark:text-brand-ivory focus:outline-none focus:border-brand-rose-gold text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* Preview */}
      <div className="bg-white dark:bg-[#2A1F1C] rounded-2xl p-6 shadow-card">
        <h3 className="font-bold text-brand-espresso dark:text-brand-ivory mb-4">Hero Preview</h3>
        <div className="relative rounded-xl overflow-hidden h-40">
          <img src={content.heroImage} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-6">
            <div>
              <p className="text-white font-black text-lg leading-tight" dir="rtl">
                {content.heroTitleAr.slice(0, 40)}...
              </p>
              <p className="text-white/70 text-sm mt-1" dir="rtl">
                {content.heroSubtitleAr.slice(0, 50)}...
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2 px-8 py-3">
          <Save className="w-4 h-4" />
          Publish Changes
        </button>
      </div>
    </div>
  )
}
