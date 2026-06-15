'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, EyeOff, Search, X } from 'lucide-react'
import { menuItems as initialItems } from '@/lib/data'
import { MenuItem } from '@/lib/types'
import { formatPrice, generateId } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function AdminMenuPage() {
  const [items, setItems] = useState(initialItems)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<MenuItem | null>(null)
  const [form, setForm] = useState({
    name: '', nameAr: '', description: '', descriptionAr: '',
    price: '', category: 'pasta', image: '', available: true, bestseller: false, featured: false,
  })

  const filtered = items.filter(
    (i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.nameAr.includes(search)
  )

  const openForm = (item?: MenuItem) => {
    if (item) {
      setEditItem(item)
      setForm({
        name: item.name, nameAr: item.nameAr,
        description: item.description, descriptionAr: item.descriptionAr,
        price: item.price.toString(), category: item.category,
        image: item.image, available: item.available,
        bestseller: item.bestseller, featured: item.featured,
      })
    } else {
      setEditItem(null)
      setForm({ name: '', nameAr: '', description: '', descriptionAr: '', price: '', category: 'pasta', image: '', available: true, bestseller: false, featured: false })
    }
    setShowForm(true)
  }

  const handleSave = () => {
    if (!form.name || !form.price) {
      toast.error('Please fill required fields')
      return
    }
    if (editItem) {
      setItems(items.map((i) =>
        i.id === editItem.id ? { ...i, ...form, price: Number(form.price), tags: [] } : i
      ))
      toast.success('Item updated!')
    } else {
      const newItem: MenuItem = {
        id: generateId(),
        name: form.name, nameAr: form.nameAr,
        description: form.description, descriptionAr: form.descriptionAr,
        price: Number(form.price), category: form.category,
        image: form.image || 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80',
        tags: [], available: form.available, featured: form.featured, bestseller: form.bestseller,
      }
      setItems([...items, newItem])
      toast.success('Item added!')
    }
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    setItems(items.filter((i) => i.id !== id))
    toast.success('Item deleted')
  }

  const toggleAvailable = (id: string) => {
    setItems(items.map((i) => i.id === id ? { ...i, available: !i.available } : i))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory">Menu Management</h1>
          <p className="text-sm text-brand-latte mt-1">{items.length} menu items</p>
        </div>
        <button
          onClick={() => openForm()}
          className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-latte" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search menu items..."
          className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-brand-rose/30 bg-[#1A1614] dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold text-sm"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`bg-[#1A1614] dark:bg-[#1A1614] rounded-2xl shadow-card overflow-hidden ${!item.available ? 'opacity-60' : ''}`}
          >
            <div className="relative h-40">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {item.bestseller && (
                <span className="absolute top-2 start-2 bg-gradient-to-r from-brand-rose-gold to-brand-champagne text-white text-xs font-bold px-2 py-1 rounded-full">
                  Bestseller
                </span>
              )}
              {!item.available && (
                <span className="absolute top-2 end-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Unavailable
                </span>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="font-bold text-brand-espresso dark:text-brand-ivory">{item.name}</p>
                  <p className="text-xs text-brand-latte">{item.nameAr}</p>
                </div>
                <span className="font-black text-brand-rose-gold">{formatPrice(item.price, 'en')}</span>
              </div>
              <p className="text-xs text-brand-brown dark:text-brand-mocha mb-4 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-brand-blush dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory px-2.5 py-1 rounded-full capitalize font-medium">
                  {item.category}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleAvailable(item.id)}
                    className={`p-1.5 rounded-lg transition-colors ${item.available ? 'hover:bg-green-50 text-green-500' : 'hover:bg-red-50 text-red-400'}`}
                    title={item.available ? 'Hide' : 'Show'}
                  >
                    {item.available ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => openForm(item)}
                    className="p-1.5 rounded-lg hover:bg-brand-blush/50 transition-colors text-brand-espresso dark:text-brand-ivory"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-[60] bg-[#1A1614] dark:bg-[#1A1614] rounded-3xl shadow-brand-lg overflow-y-auto max-h-[90vh]"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-black text-brand-espresso dark:text-brand-ivory text-xl">
                    {editItem ? 'Edit Item' : 'Add New Item'}
                  </h3>
                  <button onClick={() => setShowForm(false)} className="p-2 rounded-full hover:bg-brand-blush/50">
                    <X className="w-5 h-5 text-brand-espresso dark:text-brand-ivory" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-brand-espresso dark:text-brand-ivory mb-1">Name (EN) *</label>
                      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory focus:outline-none focus:border-brand-rose-gold text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-espresso dark:text-brand-ivory mb-1">Name (AR)</label>
                      <input value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} dir="rtl" className="w-full px-3 py-2 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory focus:outline-none focus:border-brand-rose-gold text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-brand-espresso dark:text-brand-ivory mb-1">Price (SAR) *</label>
                      <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory focus:outline-none focus:border-brand-rose-gold text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-espresso dark:text-brand-ivory mb-1">Category</label>
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory focus:outline-none focus:border-brand-rose-gold text-sm">
                        <option value="pasta">Pasta</option>
                        <option value="sides">Sides</option>
                        <option value="drinks">Drinks</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-espresso dark:text-brand-ivory mb-1">Description (EN)</label>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory focus:outline-none focus:border-brand-rose-gold text-sm resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-espresso dark:text-brand-ivory mb-1">Description (AR)</label>
                    <textarea value={form.descriptionAr} onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })} rows={2} dir="rtl" className="w-full px-3 py-2 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory focus:outline-none focus:border-brand-rose-gold text-sm resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-espresso dark:text-brand-ivory mb-1">Image URL</label>
                    <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory focus:outline-none focus:border-brand-rose-gold text-sm" />
                  </div>
                  <div className="flex items-center gap-6">
                    {[
                      { key: 'available', label: 'Available' },
                      { key: 'featured', label: 'Featured' },
                      { key: 'bestseller', label: 'Bestseller' },
                    ].map((toggle) => (
                      <label key={toggle.key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(form as any)[toggle.key]}
                          onChange={(e) => setForm({ ...form, [toggle.key]: e.target.checked })}
                          className="rounded text-brand-rose-gold"
                        />
                        <span className="text-sm text-brand-espresso dark:text-brand-ivory">{toggle.label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setShowForm(false)} className="btn-secondary flex-1 py-2.5 text-sm">Cancel</button>
                    <button onClick={handleSave} className="btn-primary flex-1 py-2.5 text-sm">{editItem ? 'Save Changes' : 'Add Item'}</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
