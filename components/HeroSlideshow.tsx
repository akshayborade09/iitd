'use client'

import Image from 'next/image'

const IMAGES = [
  '/assets/step-1.png',
  '/assets/step-2.png',
  '/assets/step-3.png',
  '/assets/step-4.png',
  '/assets/step-5.png',
]

interface HeroSlideshowProps {
  activeIndex: number
  onTransitionChange?: (transitioning: boolean) => void
}

export default function HeroSlideshow({ activeIndex }: HeroSlideshowProps) {
  return (
    <div className="absolute inset-0">
      {IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[800ms] ease-in-out"
          style={{ opacity: i === activeIndex ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            priority={i <= 1}
            quality={90}
          />
        </div>
      ))}
    </div>
  )
}
