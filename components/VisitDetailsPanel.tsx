'use client'

import { useState } from 'react'
import Image from 'next/image'

const CITIES = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad',
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Chandigarh', 'Indore', 'Bhopal', 'Nagpur', 'Kochi',
  'Gurgaon', 'Noida', 'Other',
]

interface VisitDetailsPanelProps {
  name: string
  onBack: () => void
  onContinue: (data: { city: string; duration: string }) => void
  initialDelay?: number
}

export default function VisitDetailsPanel({ name, onBack, onContinue, initialDelay = 0 }: VisitDetailsPanelProps) {
  const [city, setCity] = useState('')
  const [duration, setDuration] = useState<string | null>(null)
  const [tried, setTried] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const canContinue = city !== '' && duration !== null

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const animClass = isExiting ? 'animate-fade-slide-up' : 'animate-fade-slide-down'

  const handleContinue = () => {
    if (!canContinue) { setTried(true); return }
    setIsExiting(true)
    setTimeout(() => onContinue({ city, duration: duration! }), 300)
  }

  const handleBack = () => {
    setIsExiting(true)
    setTimeout(() => onBack(), 300)
  }

  return (
    <div className="flex flex-col gap-10 h-full px-[20px] py-[20px] max-lg:px-6 max-lg:py-8">
      {/* Section 1: Header (back + title) */}
      <div className={`${animClass} flex gap-5 items-center`} style={{ animationDelay: isExiting ? '0ms' : `${initialDelay}ms` }}>
        <button
          onClick={handleBack}
          className="flex items-center justify-center p-2 rounded-full border border-[rgba(255,255,255,0.1)] cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.15)]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl max-lg:text-[24px] font-normal text-white">Your visit details</h2>
      </div>

      {/* Section 2: Form fields + button */}
      <div className="flex flex-col gap-[28px]">
        {/* User info */}
        <div className={`${animClass} flex gap-2 items-center`} style={{ animationDelay: isExiting ? '40ms' : `${initialDelay + 60}ms` }}>
          <div
            className="flex items-center justify-center w-[56px] h-[56px] max-lg:w-[40px] max-lg:h-[40px] rounded-[60px] overflow-hidden border border-[rgba(255,246,204,0.15)]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.30) 0%, rgba(221,221,221,0.30) 100%)',
            }}
          >
            <span className="text-white text-xl max-lg:text-[20px]">{initials}</span>
          </div>
          <p className="text-[20px] max-lg:text-[18px] text-white">{name}</p>
        </div>

        {/* Travelling from */}
        <div className={`${animClass} flex flex-col gap-2`} style={{ animationDelay: isExiting ? '80ms' : `${initialDelay + 120}ms` }}>
          <p className="text-[16px] font-bold text-white leading-[34px]">Travelling from</p>
          <div className={`smooth-corners relative glass-input flex items-center justify-between h-[56px] rounded-[24px] max-lg:rounded-[16px] px-4 bg-[rgba(255,255,255,0.05)] border transition-all ${
            city ? '!border-white' : tried && !city ? '!border-[#FF4B4B] !bg-[rgba(255,82,82,0.20)]' : 'border-[rgba(255,255,255,0.08)]'
          }`}>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-full bg-transparent text-white text-[16px] leading-[28px] opacity-90 outline-none appearance-none cursor-pointer"
            >
              <option value="" disabled className="bg-[#1a1a1a] text-white">Select your city</option>
              {CITIES.map((c) => (
                <option key={c} value={c} className="bg-[#1a1a1a] text-white">{c}</option>
              ))}
            </select>
            <svg className="absolute right-4 pointer-events-none" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Visit Duration */}
        <div className={`${animClass} flex flex-col gap-2`} style={{ animationDelay: isExiting ? '120ms' : `${initialDelay + 180}ms` }}>
          <p className="text-[16px] font-bold text-white leading-[34px]">Visit Duration</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setDuration('full')}
              className={`smooth-corners flex items-center gap-3 max-lg:h-auto p-3 border cursor-pointer text-left transition-all ${
                duration === 'full'
                  ? 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(255,255,255,0.12)] border-white shadow-[0px_2px_9px_0px_rgba(0,0,0,0.06)]'
                  : tried && !duration
                    ? 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(255,82,82,0.20)] border-[#FF4B4B]'
                    : 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(23,23,23,0.10)] border-[rgba(255,255,255,0.15)]'
              }`}
            >
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-[16px] text-white opacity-90 leading-[28px]">May 16 – 20</p>
                <p className="text-[14px] text-white/70 leading-[20px]">Full 5-day programme including all sessions &amp; workshops</p>
              </div>
              <Image
                src={duration === 'full' ? '/icons/check-filled.svg' : '/icons/check-empty.svg'}
                alt=""
                width={34}
                height={34}
                className={`shrink-0 ${duration === 'full' ? 'opacity-100' : 'opacity-20'}`}
              />
            </button>
            <button
              onClick={() => setDuration('weekend')}
              className={`smooth-corners flex items-center gap-3 max-lg:h-auto p-3 border cursor-pointer text-left transition-all ${
                duration === 'weekend'
                  ? 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(255,255,255,0.12)] border-white shadow-[0px_2px_9px_0px_rgba(0,0,0,0.06)]'
                  : tried && !duration
                    ? 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(255,82,82,0.20)] border-[#FF4B4B]'
                    : 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(23,23,23,0.10)] border-[rgba(255,255,255,0.15)]'
              }`}
            >
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-[16px] text-white opacity-90 leading-[28px]">May 16 – 17</p>
                <p className="text-[14px] text-white/70 leading-[20px]">Weekend sprint — 2 intensive days on campus</p>
              </div>
              <Image
                src={duration === 'weekend' ? '/icons/check-filled.svg' : '/icons/check-empty.svg'}
                alt=""
                width={34}
                height={34}
                className={`shrink-0 ${duration === 'weekend' ? 'opacity-100' : 'opacity-20'}`}
              />
            </button>
          </div>
        </div>

        <div className={`${animClass}`} style={{ animationDelay: isExiting ? '160ms' : `${initialDelay + 240}ms` }}>
          <button
            onClick={handleContinue}
            className="smooth-corners h-[56px] w-full rounded-[24px] max-lg:rounded-[16px] border-[8px] max-lg:border-[6px] border-[rgba(199,203,109,0.1)] bg-[#e3ed26] text-[18px] max-lg:text-[16px] text-black leading-[34px] opacity-90 text-center cursor-pointer transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
