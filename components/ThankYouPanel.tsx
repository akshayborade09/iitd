'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ThankYouPanelProps {
  data: {
    city: string
    duration: string
    travelStatus: string
    accommodation: string
  }
}

const DURATION_LABELS: Record<string, string> = {
  full: 'May 16 – 20 (5 days)',
  weekend: 'May 16 – 17 (2 days)',
}

const TRAVEL_LABELS: Record<string, string> = {
  done: 'Travel done',
  not_yet: 'Travel pending',
}

const ACCOMMODATION_LABELS: Record<string, string> = {
  own: 'Own stay',
  common: 'Group stay',
}

function Chip({ icon, label, delay }: { icon: string; label: string; delay: number }) {
  return (
    <div
      className="animate-fade-slide-down smooth-corners flex gap-3 items-center px-4 py-[14px] rounded-[24px] max-lg:rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-[rgba(0,0,0,0.05)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Image src={icon} alt="" width={20} height={20} />
      <p className="text-[16px] text-white leading-[24px]">{label}</p>
    </div>
  )
}

export default function ThankYouPanel({ data }: ThankYouPanelProps) {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-[48px] items-center justify-center h-full p-8">
      {/* Checkmark + text */}
      <div className="animate-fade-slide-down flex flex-col gap-4 items-center" style={{ animationDelay: '0ms' }}>
        <div
          className="flex items-center justify-center w-[100px] h-[100px] rounded-full border border-[rgba(255,255,255,0.1)]"
          style={{
            backgroundImage: 'linear-gradient(135deg, rgba(0,178,56,0.6) 17%, rgba(67,178,35,0.6) 42%, rgba(202,253,0,0.6) 85%)',
            cornerShape: 'round',
          } as React.CSSProperties}
        >
          <Image src="/icons/check.svg" alt="Success" width={44} height={44} />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-[24px] max-lg:text-[24px] font-normal text-white text-center">You are registered</h2>
          <p className="text-[16px] text-white/70 leading-[20px] text-center">Your campus visit registration has been recorded</p>
        </div>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-3 items-start justify-center w-full">
        <Chip icon="/icons/location.svg" label={data.city} delay={150} />
        <Chip icon="/icons/visit.svg" label={DURATION_LABELS[data.duration] ?? data.duration} delay={250} />
        <Chip icon="/icons/accomodation.svg" label={ACCOMMODATION_LABELS[data.accommodation] ?? data.accommodation} delay={350} />
        <Chip icon="/icons/travel.svg" label={TRAVEL_LABELS[data.travelStatus] ?? data.travelStatus} delay={450} />
      </div>

      {/* Back to home button */}
      <div className="animate-fade-slide-down w-full" style={{ animationDelay: '500ms' }}>
        <button
          onClick={() => router.push('/dashboard')}
          className="smooth-corners h-[56px] w-full rounded-[24px] max-lg:rounded-[16px] border-[8px] max-lg:border-[6px] border-[rgba(199,203,109,0.1)] bg-[#e3ed26] text-[18px] max-lg:text-[16px] text-black leading-[34px] opacity-90 text-center cursor-pointer transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Go to dashboard
        </button>
      </div>
    </div>
  )
}
