'use client'

import { useEffect, useRef } from 'react'

const BASE_WIDTH = 1440

export default function ScaleWrapper({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const applyScale = () => {
      const vw = window.innerWidth
      if (vw >= 1024) {
        const scale = vw / BASE_WIDTH
        if (wrapperRef.current) {
          wrapperRef.current.style.transform = `scale(${scale})`
          wrapperRef.current.style.transformOrigin = 'top left'
          wrapperRef.current.style.width = `${BASE_WIDTH}px`
          wrapperRef.current.style.height = `${window.innerHeight / scale}px`
          wrapperRef.current.style.overflow = 'hidden'
        }
      } else {
        if (wrapperRef.current) {
          wrapperRef.current.style.transform = ''
          wrapperRef.current.style.width = ''
          wrapperRef.current.style.height = ''
          wrapperRef.current.style.overflow = ''
        }
      }
    }

    applyScale()
    window.addEventListener('resize', applyScale)
    return () => window.removeEventListener('resize', applyScale)
  }, [])

  return (
    <div ref={wrapperRef}>
      {children}
    </div>
  )
}
