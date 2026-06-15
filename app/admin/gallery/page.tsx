'use client'

import { useState } from 'react'
import { Plus, Trash2, Star, Upload } from 'lucide-react'
import { galleryImages as initial } from '@/lib/data'
import { GalleryImage } from '@/lib/types'
import { generateId } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function AdminGalleryPage() {
  const [images, setImages] = useState(initial)
  const [newUrl, setNewUrl] = useState('')
  const [newAlt, setNewAlt] = useState('')
  const [newCategory, setNewCategory] = useState('food')

  const addImage = () => {
    if (!newUrl) { toast.error('Please enter an image URL'); return }
    const img: GalleryImage = {
      id: generateId(), url: newUrl, alt: newAlt || 'Gallery image',
      altAr: newAlt || 'صورة معرض', category: newCategory, featured: false,
    }
    setImages([...images, img])
    setNewUrl(''); setNewAlt('')
    toast.success('Image added!')
  }

  const deleteImage = (id: string) => {
    setImages(images.filter((i) => i.id !== id))
    toast.success('Image deleted')
  }

  const toggleFeatured = (id: string) => {
    setImages(images.map((i) => i.id === id ? { ...i, featured: !i.featured } : i))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory">Gallery Management</h1>
          <p className="text-sm text-brand-latte mt-1">{images.length} images</p>
        </div>
      </div>

      {/* Add Image */}
      <div className="bg-[#1A1614] dark:bg-[#1A1614] rounded-2xl p-5 shadow-card">
        <h3 className="font-bold text-brand-espresso dark:text-brand-ivory mb-4 flex items-center gap-2">
          <Upload className="w-4 h-4 text-brand-rose-gold" />
          Add New Image
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Image URL (https://...)"
            className="flex-1 px-4 py-2.5 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold text-sm"
          />
          <input
            value={newAlt}
            onChange={(e) => setNewAlt(e.target.value)}
            placeholder="Alt text"
            className="sm:w-48 px-4 py-2.5 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold text-sm"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="sm:w-36 px-4 py-2.5 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory focus:outline-none text-sm"
          >
            <option value="food">Food</option>
            <option value="ingredients">Ingredients</option>
            <option value="experience">Experience</option>
          </select>
          <button onClick={addImage} className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group rounded-2xl overflow-hidden aspect-square shadow-card">
            <img src={img.url} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => toggleFeatured(img.id)}
                className={`p-2 rounded-full transition-colors ${img.featured ? 'bg-brand-rose-gold text-white' : 'bg-white/20 text-white hover:bg-brand-rose-gold'}`}
                title="Toggle Featured"
              >
                <Star className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteImage(img.id)}
                className="p-2 rounded-full bg-red-500/80 text-white hover:bg-red-500 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute bottom-2 start-2 flex items-center gap-1">
              <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded-full capitalize">{img.category}</span>
              {img.featured && <span className="bg-brand-rose-gold text-white text-xs px-1.5 py-0.5 rounded-full">★</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
