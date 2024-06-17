'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push('/terms-and-conditions')
  }, [])
  return (
    <main className='flex min-h-screen flex-col items-center  bg-blend-darken home-page'>
      <h1 className='text-2xl pt-8'>Assistant AI Web</h1>
    </main>
  )
}
