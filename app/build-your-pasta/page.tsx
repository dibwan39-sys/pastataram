'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChefHat, Plus, Minus, ShoppingCart, Sparkles, Check } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { useUIStore, useCartStore } from '@/lib/store'
import { formatPrice, generateId } from '@/lib/utils'
import toast from 'react-hot-toast'

const pastaTypes = [
  { id: 'spaghetti', nameAr: 'سباغيتي', nameEn: 'Spaghetti', emoji: '🍝', price: 0 },
  { id: 'fettuccine', nameAr: 'فيتوتشيني', nameEn: 'Fettuccine', emoji: '🍜', price: 0 },
  { id: 'penne', nameAr: 'بيني', nameEn: 'Penne', emoji: '🍝', price: 0 },
  { id: 'rigatoni', nameAr: 'ريجاتوني', nameEn: 'Rigatoni', emoji: '🍝', price: 2 },
]

const sauces = [
  { id: 'tomato', nameAr: 'صوص الطماطم', nameEn: 'Tomato Sauce', emoji: '🍅', price: 0 },
  { id: 'cream', nameAr: 'صوص الكريمة', nameEn: 'Cream Sauce', emoji: '🥛', price: 0 },
  { id: 'pesto', nameAr: 'بيستو', nameEn: 'Pesto', emoji: '🌿', price: 3 },
  { id: 'rosé', nameAr: 'روزيه', nameEn: 'Rosé', emoji: '🌹', price: 3 },
]

const proteins = [
  { id: 'chicken', nameAr: 'دجاج مشوي', nameEn: 'Grilled Chicken', emoji: '🍗', price: 0 },
  { id: 'shrimp', nameAr: 'جمبري', nameEn: 'Shrimp', emoji: '🦐', price: 5 },
  { id: 'beef', nameAr: 'لحم بقري', nameEn: 'Beef', emoji: '🥩', price: 5 },
  { id: 'none', nameAr: 'بدون بروتين', nameEn: 'No Protein', emoji: '🥦', price: -3 },
]

const cheeses = [
  { id: 'mozzarella', nameAr: 'موزاريلا', nameEn: 'Mozzarella', emoji: '🧀', price: 0 },
  { id: 'parmesan', nameAr: 'بارميزان', nameEn: 'Parmesan', emoji: '🧀', price: 2 },
  { id: 'extra', nameAr: 'جبنة مضاعفة', nameEn: 'Double Cheese', emoji: '🧀', price: 4 },
  { id: 'none', nameAr: 'بدون جبنة', nameEn: 'No Cheese', emoji: '❌', price: -2 },
]

const toppings = [
  { id: 'mushroom', nameAr: 'مشروم', nameEn: 'Mushrooms', emoji: '🍄', price: 2 },
  { id: 'eggplant', nameAr: 'باذنجان', nameEn: 'Eggplant', emoji: '🍆', price: 2 },
  { id: 'olives', nameAr: 'زيتون', nameEn: 'Olives', emoji: '🫒', price: 2 },
  { id: 'herbs', nameAr: 'أعشاب طازجة', nameEn: 'Fresh Herbs', emoji: '🌿', price: 1 },
  { id: 'pepper', nameAr: 'فلفل رومي', nameEn: 'Bell Pepper', emoji: '🫑', price: 2 },
  { id: 'chili', nameAr: 'فلفل حار', nameEn: 'Chili Flakes', emoji: '🌶️', price: 1 },
]

const BASE_PRICE = 22

export default function BuildYourPastaPage() {
  const { language } = useUIStore()
  const { addItem } = useCartStore()
  const isAr = language === 'ar'

  const [selectedPasta, setSelectedPasta] = useState(pastaTypes[0])
  const [selectedSauce, setSelectedSauce] = useState(sauces[0])
  const [selectedProtein, setSelectedProtein] = useState(proteins[0])
  const [selectedCheese, setSelectedCheese] = useState(cheeses[0])
  const [selectedToppings, setSelectedToppings] = useState<string[]>([])
  const [spiceLevel, setSpiceLevel] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [step, setStep] = useState(0)
  const [notes, setNotes] = useState('')

  const totalPrice = useMemo(() => {
    const extras =
      selectedPasta.price +
      selectedSauce.price +
      selectedProtein.price +
      selectedCheese.price +
      selectedToppings.reduce((sum, id) => {
        const t = toppings.find((t) => t.id === id)
        return sum + (t?.price || 0)
      }, 0)
    return Math.max(BASE_PRICE + extras, 15) * quantity
  }, [selectedPasta, selectedSauce, selectedProtein, selectedCheese, selectedToppings, quantity])

  const steps = isAr
    ? ['نوع الباستا', 'الصوص', 'البروتين', 'الجبنة', 'الإضافات', 'مستوى الحرارة']
    : ['Pasta Type', 'Sauce', 'Protein', 'Cheese', 'Toppings', 'Spice Level']

  const toggleTopping = (id: string) => {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  const handleAddToCart = () => {
    const customItem = {
      id: generateId(),
      name: `Custom Pasta - ${selectedPasta.nameEn}`,
      nameAr: `باستا مخصصة - ${selectedPasta.nameAr}`,
      description: `${selectedSauce.nameEn}, ${selectedProtein.nameEn}, ${selectedCheese.nameEn}`,
      descriptionAr: `${selectedSauce.nameAr}, ${selectedProtein.nameAr}, ${selectedCheese.nameAr}`,
      price: totalPrice / quantity,
      category: 'pasta',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80',
      tags: ['custom'],
      available: true,
      featured: false,
      bestseller: false,
    }
    addItem(customItem, quantity, [], notes)
    toast.success(isAr ? 'تمت إضافة باستاتك المخصصة للسلة! 🎉' : 'Custom pasta added to cart! 🎉')
  }

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-br from-brand-espresso via-brand-brown to-brand-espresso overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #CFA18D 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-ivory/10 text-brand-champagne text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              {isAr ? 'تجربة فريدة' : 'Unique Experience'}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              {isAr ? 'صمّم باستاتك الخاصة' : 'Build Your Own Pasta'}
            </h1>
            <p className="text-brand-ivory/70">
              {isAr ? 'اختر مكوناتك وانشئ طبقك المثالي' : 'Choose your ingredients and create your perfect dish'}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-1 mb-10 overflow-x-auto pb-2">
            {steps.map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(i)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  i === step
                    ? 'bg-gradient-to-r from-brand-rose-gold to-brand-champagne text-white'
                    : i < step
                    ? 'bg-brand-blush text-brand-espresso'
                    : 'bg-brand-pearl dark:bg-brand-espresso/30 text-brand-latte'
                }`}
              >
                {i < step && <Check className="w-3 h-3" />}
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Builder */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <StepSection
                    key="pasta"
                    title={isAr ? 'اختر نوع الباستا' : 'Choose Pasta Type'}
                    items={pastaTypes}
                    selected={selectedPasta.id}
                    onSelect={(id) => setSelectedPasta(pastaTypes.find((p) => p.id === id)!)}
                    isAr={isAr}
                    language={language}
                  />
                )}
                {step === 1 && (
                  <StepSection
                    key="sauce"
                    title={isAr ? 'اختر الصوص' : 'Choose Your Sauce'}
                    items={sauces}
                    selected={selectedSauce.id}
                    onSelect={(id) => setSelectedSauce(sauces.find((s) => s.id === id)!)}
                    isAr={isAr}
                    language={language}
                  />
                )}
                {step === 2 && (
                  <StepSection
                    key="protein"
                    title={isAr ? 'اختر البروتين' : 'Choose Your Protein'}
                    items={proteins}
                    selected={selectedProtein.id}
                    onSelect={(id) => setSelectedProtein(proteins.find((p) => p.id === id)!)}
                    isAr={isAr}
                    language={language}
                  />
                )}
                {step === 3 && (
                  <StepSection
                    key="cheese"
                    title={isAr ? 'اختر الجبنة' : 'Choose Your Cheese'}
                    items={cheeses}
                    selected={selectedCheese.id}
                    onSelect={(id) => setSelectedCheese(cheeses.find((c) => c.id === id)!)}
                    isAr={isAr}
                    language={language}
                  />
                )}
                {step === 4 && (
                  <motion.div
                    key="toppings"
                    initial={{ opacity: 0, x: isAr ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isAr ? 20 : -20 }}
                  >
                    <h2 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory mb-6">
                      {isAr ? 'أضف الإضافات' : 'Add Your Toppings'}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {toppings.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => toggleTopping(t.id)}
                          className={`p-4 rounded-2xl border-2 transition-all text-start ${
                            selectedToppings.includes(t.id)
                              ? 'border-brand-rose-gold bg-brand-blush/50 dark:bg-brand-rose-gold/10'
                              : 'border-brand-rose/20 bg-brand-pearl dark:bg-brand-espresso/20 hover:border-brand-rose/50'
                          }`}
                        >
                          <div className="text-2xl mb-1">{t.emoji}</div>
                          <p className="font-semibold text-sm text-brand-espresso dark:text-brand-ivory">
                            {isAr ? t.nameAr : t.nameEn}
                          </p>
                          <p className="text-xs text-brand-rose-gold font-bold">+{t.price} {isAr ? 'ر.س' : 'SAR'}</p>
                          {selectedToppings.includes(t.id) && (
                            <Check className="w-4 h-4 text-brand-rose-gold mt-1" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
                {step === 5 && (
                  <motion.div
                    key="spice"
                    initial={{ opacity: 0, x: isAr ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isAr ? 20 : -20 }}
                  >
                    <h2 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory mb-6">
                      {isAr ? 'مستوى الحرارة' : 'Spice Level'}
                    </h2>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { level: 1, label: isAr ? 'خفيف' : 'Mild', emoji: '😊' },
                        { level: 2, label: isAr ? 'متوسط' : 'Medium', emoji: '🌶️' },
                        { level: 3, label: isAr ? 'حار' : 'Hot', emoji: '🔥' },
                      ].map((s) => (
                        <button
                          key={s.level}
                          onClick={() => setSpiceLevel(s.level)}
                          className={`p-6 rounded-2xl border-2 transition-all text-center ${
                            spiceLevel === s.level
                              ? 'border-brand-rose-gold bg-brand-blush/50 dark:bg-brand-rose-gold/10'
                              : 'border-brand-rose/20 bg-brand-pearl dark:bg-brand-espresso/20 hover:border-brand-rose/50'
                          }`}
                        >
                          <div className="text-3xl mb-2">{s.emoji}</div>
                          <p className="font-bold text-brand-espresso dark:text-brand-ivory">{s.label}</p>
                        </button>
                      ))}
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-semibold text-brand-espresso dark:text-brand-ivory mb-2">
                        {isAr ? 'ملاحظات خاصة' : 'Special Notes'}
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={isAr ? 'أي تعليمات خاصة...' : 'Any special instructions...'}
                        className="w-full p-3 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-espresso/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold resize-none h-24 text-sm"
                        dir={isAr ? 'rtl' : 'ltr'}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="btn-secondary px-6 py-2.5 text-sm disabled:opacity-40"
                >
                  {isAr ? 'السابق' : 'Previous'}
                </button>
                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="btn-primary px-6 py-2.5 text-sm"
                  >
                    {isAr ? 'التالي' : 'Next'}
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {isAr ? 'أضف للسلة' : 'Add to Cart'}
                  </button>
                )}
              </div>
            </div>

            {/* Summary Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="premium-card p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <ChefHat className="w-5 h-5 text-brand-rose-gold" />
                    <h3 className="font-black text-brand-espresso dark:text-brand-ivory">
                      {isAr ? 'ملخص طبقك' : 'Your Pasta Summary'}
                    </h3>
                  </div>
                  <div className="relative h-40 rounded-xl overflow-hidden mb-5">
                    <img
                      src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80"
                      alt="Custom Pasta"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/60 to-transparent" />
                    <p className="absolute bottom-3 start-3 text-white font-bold text-sm">
                      {isAr ? 'باستاتك المخصصة' : 'Your Custom Pasta'}
                    </p>
                  </div>
                  <div className="space-y-3 mb-5 text-sm">
                    {[
                      { label: isAr ? 'نوع الباستا' : 'Pasta', value: isAr ? selectedPasta.nameAr : selectedPasta.nameEn },
                      { label: isAr ? 'الصوص' : 'Sauce', value: isAr ? selectedSauce.nameAr : selectedSauce.nameEn },
                      { label: isAr ? 'البروتين' : 'Protein', value: isAr ? selectedProtein.nameAr : selectedProtein.nameEn },
                      { label: isAr ? 'الجبنة' : 'Cheese', value: isAr ? selectedCheese.nameAr : selectedCheese.nameEn },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center border-b border-brand-rose/10 pb-2">
                        <span className="text-brand-latte">{row.label}</span>
                        <span className="font-semibold text-brand-espresso dark:text-brand-ivory">{row.value}</span>
                      </div>
                    ))}
                    {selectedToppings.length > 0 && (
                      <div className="flex justify-between items-start border-b border-brand-rose/10 pb-2">
                        <span className="text-brand-latte">{isAr ? 'إضافات' : 'Toppings'}</span>
                        <span className="font-semibold text-brand-espresso dark:text-brand-ivory text-end">
                          {selectedToppings.map((id) => {
                            const t = toppings.find((t) => t.id === id)
                            return isAr ? t?.nameAr : t?.nameEn
                          }).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-semibold text-brand-espresso dark:text-brand-ivory text-sm">
                      {isAr ? 'الكمية' : 'Quantity'}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-full bg-brand-blush hover:bg-brand-rose transition-colors flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3 text-brand-espresso" />
                      </button>
                      <span className="font-bold text-brand-espresso dark:text-brand-ivory w-6 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-full bg-brand-blush hover:bg-brand-rose transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3 text-brand-espresso" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-5">
                    <span className="font-bold text-brand-espresso dark:text-brand-ivory">
                      {isAr ? 'الإجمالي' : 'Total'}
                    </span>
                    <span className="text-2xl font-black gradient-text">
                      {formatPrice(totalPrice, language)}
                    </span>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {isAr ? 'أضف للسلة' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

function StepSection({ title, items, selected, onSelect, isAr, language }: {
  title: string
  items: { id: string; nameAr: string; nameEn: string; emoji: string; price: number }[]
  selected: string
  onSelect: (id: string) => void
  isAr: boolean
  language: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isAr ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isAr ? 20 : -20 }}
    >
      <h2 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`p-4 rounded-2xl border-2 transition-all text-center ${
              selected === item.id
                ? 'border-brand-rose-gold bg-brand-blush/50 dark:bg-brand-rose-gold/10 shadow-brand'
                : 'border-brand-rose/20 bg-brand-pearl dark:bg-brand-espresso/20 hover:border-brand-rose/50'
            }`}
          >
            <div className="text-3xl mb-2">{item.emoji}</div>
            <p className="font-bold text-sm text-brand-espresso dark:text-brand-ivory">
              {isAr ? item.nameAr : item.nameEn}
            </p>
            {item.price !== 0 && (
              <p className="text-xs text-brand-rose-gold font-bold mt-1">
                {item.price > 0 ? '+' : ''}{item.price} {isAr ? 'ر.س' : 'SAR'}
              </p>
            )}
            {selected === item.id && <Check className="w-4 h-4 text-brand-rose-gold mx-auto mt-1" />}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
