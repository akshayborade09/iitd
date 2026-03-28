'use client'

import { useState } from 'react'
import Image from 'next/image'

interface TravelStayPanelProps {
  onBack: () => void
  onContinue: (data: { travelStatus: string; accommodation: string }) => void
}

export default function TravelStayPanel({ onBack, onContinue }: TravelStayPanelProps) {
  const [travelStatus, setTravelStatus] = useState<string | null>(null)
  const [accommodation, setAccommodation] = useState<string | null>(null)
  const [tried, setTried] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const canContinue = travelStatus !== null && accommodation !== null

  const animClass = isExiting ? 'animate-fade-slide-up' : 'animate-fade-slide-down'

  const handleContinue = () => {
    if (!canContinue) { setTried(true); return }
    setIsExiting(true)
    setTimeout(() => onContinue({ travelStatus: travelStatus!, accommodation: accommodation! }), 300)
  }

  const handleBack = () => {
    setIsExiting(true)
    setTimeout(() => onBack(), 300)
  }

  return (
    <div className="flex flex-col gap-10 h-full px-[20px] py-[20px] max-lg:px-6 max-lg:py-8">
      <div className="flex flex-col gap-[48px]">
        {/* Header */}
        <div className={`${animClass} flex gap-5 items-center`} style={{ animationDelay: '0ms' }}>
          <button
            onClick={handleBack}
            className="flex items-center justify-center p-2 rounded-full border border-[rgba(255,255,255,0.1)] cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.15)]"
          >
            <Image src="/icons/arrow-left.svg" alt="Back" width={24} height={24} />
          </button>
          <h2 className="text-xl max-lg:text-[24px] font-normal text-white">Travel &amp; Stay</h2>
        </div>

        <div className="flex flex-col gap-[38px]">
          {/* Travelling Status */}
          <div className={`${animClass} flex flex-col gap-2`} style={{ animationDelay: isExiting ? '40ms' : '60ms' }}>
            <p className="text-[16px] font-bold text-white leading-[34px]">Travelling Status</p>
            <div className="flex gap-2">
              <button
                onClick={() => setTravelStatus('done')}
                className={`smooth-corners flex-1 flex items-center justify-center h-[56px] border cursor-pointer text-[16px] font-semibold text-white transition-all ${
                  travelStatus === 'done'
                    ? 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(255,255,255,0.12)] border-white shadow-[0px_2px_9px_0px_rgba(0,0,0,0.06)]'
                    : tried && !travelStatus
                      ? 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(255,82,82,0.20)] border-[#FF4B4B]'
                      : 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(23,23,23,0.10)] border-[rgba(255,255,255,0.15)]'
                }`}
              >
                Done
              </button>
              <button
                onClick={() => setTravelStatus('not_yet')}
                className={`smooth-corners flex-1 flex items-center justify-center h-[56px] border cursor-pointer text-[16px] font-semibold text-white transition-all ${
                  travelStatus === 'not_yet'
                    ? 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(255,255,255,0.12)] border-white shadow-[0px_2px_9px_0px_rgba(0,0,0,0.06)]'
                    : tried && !travelStatus
                      ? 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(255,82,82,0.20)] border-[#FF4B4B]'
                      : 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(23,23,23,0.10)] border-[rgba(255,255,255,0.15)]'
                }`}
              >
                Not yet
              </button>
            </div>
          </div>

          {/* Accommodation */}
          <div className={`${animClass} flex flex-col gap-2`} style={{ animationDelay: isExiting ? '80ms' : '120ms' }}>
            <p className="text-[16px] font-bold text-white leading-[34px]">Accommodation</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setAccommodation('own')}
                className={`smooth-corners flex items-center gap-3 max-lg:h-auto p-4 border cursor-pointer text-left transition-all ${
                  accommodation === 'own'
                    ? 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(255,255,255,0.12)] border-white shadow-[0px_2px_9px_0px_rgba(0,0,0,0.06)]'
                    : tried && !accommodation
                      ? 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(255,82,82,0.20)] border-[#FF4B4B]'
                      : 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(23,23,23,0.10)] border-[rgba(255,255,255,0.15)]'
                }`}
              >
                <div className="flex flex-col gap-1 flex-1">
                  <p className="text-[16px] text-white opacity-90 leading-[28px]">Own arrangement</p>
                  <p className="text-[14px] text-white/70 leading-[20px]">I&apos;ve booked or will book my hotel independently</p>
                </div>
                <Image
                  src={accommodation === 'own' ? '/icons/check-filled.svg' : '/icons/check-empty.svg'}
                  alt=""
                  width={34}
                  height={34}
                  className={`shrink-0 ${accommodation === 'own' ? 'opacity-100' : 'opacity-20'}`}
                />
              </button>
              <button
                onClick={() => setAccommodation('common')}
                className={`smooth-corners flex items-center gap-3 max-lg:h-auto p-4 border cursor-pointer text-left transition-all ${
                  accommodation === 'common'
                    ? 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(255,255,255,0.12)] border-white shadow-[0px_2px_9px_0px_rgba(0,0,0,0.06)]'
                    : tried && !accommodation
                      ? 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(255,82,82,0.20)] border-[#FF4B4B]'
                      : 'rounded-[24px] max-lg:rounded-[16px] bg-[rgba(23,23,23,0.10)] border-[rgba(255,255,255,0.15)]'
                }`}
              >
                <div className="flex flex-col gap-1 flex-1">
                  <p className="text-[16px] text-white opacity-90 leading-[28px]">Common Accommodation</p>
                  <p className="text-[14px] text-white/70 leading-[20px]">I&apos;d like to be part of a group booking with other students</p>
                </div>
                <Image
                  src={accommodation === 'common' ? '/icons/check-filled.svg' : '/icons/check-empty.svg'}
                  alt=""
                  width={34}
                  height={34}
                  className={`shrink-0 ${accommodation === 'common' ? 'opacity-100' : 'opacity-20'}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`${animClass}`} style={{ animationDelay: isExiting ? '120ms' : '180ms' }}>
        <button
          onClick={handleContinue}
          className="smooth-corners h-[56px] w-full rounded-[24px] max-lg:rounded-[16px] border-[8px] max-lg:border-[6px] border-[rgba(199,203,109,0.1)] bg-[#e3ed26] text-[18px] max-lg:text-[16px] text-black leading-[34px] opacity-90 text-center cursor-pointer transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
