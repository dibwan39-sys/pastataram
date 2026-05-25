'use client'

import { useUIStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function OrderPage() {
  const { language } = useUIStore()
  const router = useRouter()
  useEffect(() => { router.replace('/menu') }, [])
  return null
}
