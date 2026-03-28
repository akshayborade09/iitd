'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ReviewConfirmPanelProps {
  data: {
    name: string
    whatsapp: string
    city: string
    duration: string
    travelStatus: string
    accommodation: string
  }
  onBack: () => void
  onSubmit: () => void
}

const DURATION_LABELS: Record<string, string> = {
  full: 'May 16 – 20 (5 days)',
  weekend: 'May 16 – 17 (2 days)',
}

const TRAVEL_STATUS_LABELS: Record<string, string> = {
  done: 'Booked',
  not_yet: 'Not yet booked',
}

const ACCOMMODATION_LABELS: Record<string, string> = {
  own: 'Own arrangement',
  common: 'Seeking common accommodation',
}

function SummaryRow({ icon, label, value, delay = 0, isExiting = false }: { icon: string; label: string; value: string; delay?: number; isExiting?: boolean }) {
  return (
    <div
      className={`${isExiting ? 'animate-fade-slide-up' : 'animate-fade-slide-down'} smooth-corners flex flex-col px-4 py-[14px] rounded-[24px] max-lg:rounded-[16px] border border-[rgba(255,255,255,0.1)] bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-[rgba(255, 255, 255, 0.2)]`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex gap-2 items-center">
        <Image src={icon} alt="" width={20} height={20} />
        <p className="text-[16px] text-white leading-[34px]">{label}</p>
      </div>
      <p className="text-[16px] text-white leading-[24px]">{value}</p>
    </div>
  )
}

export default function ReviewConfirmPanel({ data, onBack, onSubmit }: ReviewConfirmPanelProps) {
  const [isExiting, setIsExiting] = useState(false)

  const animClass = isExiting ? 'animate-fade-slide-up' : 'animate-fade-slide-down'

  const handleSubmit = () => {
    setIsExiting(true)
    setTimeout(() => onSubmit(), 350)
  }

  const handleBack = () => {
    setIsExiting(true)
    setTimeout(() => onBack(), 350)
  }

  return (
    <div className="flex flex-col gap-10 h-full px-[20px] py-[20px] max-lg:px-6 max-lg:py-8">
      <div className="flex flex-col gap-[38px]">
        {/* Header */}
        <div className={`${animClass} flex gap-5 items-center`} style={{ animationDelay: isExiting ? '0ms' : '0ms' }}>
          <button
            onClick={handleBack}
            className="flex items-center justify-center p-2 rounded-full border border-[rgba(255,255,255,0.1)] cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.15)]"
          >
            <Image src="/icons/arrow-left.svg" alt="Back" width={24} height={24} />
          </button>
          <h2 className="text-xl max-lg:text-[24px] font-normal text-white">Review &amp; Confirm</h2>
        </div>

        {/* Summary rows */}
        <div className="flex flex-col gap-3">
          <SummaryRow icon="/icons/name.svg" label="Name" value={data.name} delay={isExiting ? 40 : 60} isExiting={isExiting} />
          <SummaryRow icon="/icons/number.svg" label="WhatsApp number" value={data.whatsapp} delay={isExiting ? 80 : 120} isExiting={isExiting} />
          <SummaryRow icon="/icons/travel.svg" label="Travelling From" value={data.city} delay={isExiting ? 120 : 180} isExiting={isExiting} />
          <SummaryRow icon="/icons/visit.svg" label="Visit Dates" value={DURATION_LABELS[data.duration] ?? data.duration} delay={isExiting ? 160 : 240} isExiting={isExiting} />
          <SummaryRow icon="/icons/accomodation.svg" label="Accommodation" value={ACCOMMODATION_LABELS[data.accommodation] ?? data.accommodation} delay={isExiting ? 200 : 300} isExiting={isExiting} />
        </div>
      </div>

      <div className={`${animClass}`} style={{ animationDelay: isExiting ? '240ms' : '360ms' }}>
        <button
          onClick={handleSubmit}
          className="smooth-corners h-[56px] w-full rounded-[24px] max-lg:rounded-[16px] border-[8px] max-lg:border-[6px] border-[rgba(199,203,109,0.1)] bg-[#e3ed26] text-[18px] max-lg:text-[16px] text-black leading-[34px] opacity-90 text-center cursor-pointer transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Submit
        </button>
      </div>
    </div>
  )
}
