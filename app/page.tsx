'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'
import ProgressiveBlur from '@/components/ProgressiveBlur'
import FloatingInput from '@/components/FloatingInput'
import VisitDetailsPanel from '@/components/VisitDetailsPanel'
import TravelStayPanel from '@/components/TravelStayPanel'
import ReviewConfirmPanel from '@/components/ReviewConfirmPanel'
import ThankYouPanel from '@/components/ThankYouPanel'
import HeroSlideshow from '@/components/HeroSlideshow'

type Step = 1 | 2 | 3 | 4 | 5

export default function Home() {
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [step, setStep] = useState<Step>(1)

  const [city, setCity] = useState('')
  const [duration, setDuration] = useState('')
  const [travelStatus, setTravelStatus] = useState('')
  const [accommodation, setAccommodation] = useState('')
  const [tried, setTried] = useState(false)

  const validatePhone = useCallback((val: string) => {
    const digits = val.replace(/\D/g, '')
    if (digits.length === 0) return ''
    if (!/^[6-9]/.test(digits)) return whatsapp
    return digits.slice(0, 10)
  }, [whatsapp])

  const handleContinue = () => {
    if (!name.trim() || whatsapp.length < 10) {
      setTried(true)
      return
    }
    setStep(2)
  }

  const handleVisitDetailsContinue = (data: { city: string; duration: string }) => {
    setCity(data.city)
    setDuration(data.duration)
    setStep(3)
  }

  const handleTravelStayContinue = (data: { travelStatus: string; accommodation: string }) => {
    setTravelStatus(data.travelStatus)
    setAccommodation(data.accommodation)
    setStep(4)
  }

  const handleSubmit = async () => {
    await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, whatsapp, city, duration, travelStatus, accommodation }),
    })
    setStep(5)
  }


  const isFormHidden = step >= 2

  return (
    <div className="relative lg:h-full lg:w-[1440px] lg:overflow-hidden max-lg:w-full max-lg:min-h-[100dvh]">
      {/* Layer 1: Background slideshow */}
      <HeroSlideshow activeIndex={[0, 0, 1, 3, 4][step - 1]} />

      {/* Layer 2: Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.24) 55%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* Layer 4: Title */}
      <div className="absolute left-[8%] top-[39%] -translate-y-1/2 z-10 max-lg:hidden">
        <h1 className="text-[72px] font-normal leading-[1.1] text-white">
          Campus Visit
          <br />
          IIT-D AIUX 2026
        </h1>
      </div>


      {/* Layer 5: Progressive blur zone */}
      <ProgressiveBlur className="absolute bottom-0 left-0 right-0 h-[365px] z-10 max-lg:hidden" />

      {/* ====== DESKTOP LAYOUT (≥1024px) ====== */}

      {/* Left side: description + date tags */}
      <div className="absolute bottom-0 left-0 right-0 h-[365px] z-20 max-lg:hidden">
        <div className="absolute left-[8%] bottom-[100px] flex flex-col gap-8 max-w-[588px]">
          <p className="text-lg font-normal leading-[26px] text-white opacity-90">
            Register your visit to the IIT Delhi campus. We&apos;ll coordinate
            travel and accommodation with fellow cohort members.
          </p>

          <div className="flex gap-2 items-center">
            <div className="smooth-corners flex items-center gap-2 rounded-[16px] bg-[rgba(255,255,255,0.08)] px-4 py-[10px]">
              <div className="text-sm text-white opacity-60 tracking-[0.64px]">
                <p className="leading-relaxed">Full Programme</p>
                <p className="leading-relaxed">May 16 – 20</p>
              </div>
            </div>
            <div className="smooth-corners flex items-center gap-2 rounded-[16px] bg-[rgba(255,255,255,0.08)] px-4 py-[10px]">
              <div className="text-sm text-white opacity-60 tracking-[0.64px]">
                <p className="leading-relaxed">Weekend Sprint</p>
                <p className="leading-relaxed">May 16 – 17</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Step 1: form fields — fade in from top, fade out on exit */}
      <div
        className={`absolute left-[calc(50%+110px)] bottom-[100px] right-[10%] flex flex-col gap-[30px] z-30 max-lg:hidden transition-all duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isFormHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col gap-[21px]">
          <div
            className={isFormHidden ? 'animate-fade-slide-up' : 'animate-fade-slide-down'}
            style={{ animationDelay: isFormHidden ? '0ms' : '0ms' }}
          >
            <FloatingInput
              label="Your name"
              value={name}
              onChange={setName}
              className="h-[56px] rounded-[24px] max-lg:rounded-[16px]"
              error={tried && !name.trim()}
            />
          </div>
          <div
            className={isFormHidden ? 'animate-fade-slide-up' : 'animate-fade-slide-down'}
            style={{ animationDelay: isFormHidden ? '40ms' : '60ms' }}
          >
            <FloatingInput
              label="Whatsapp number"
              value={whatsapp}
              onChange={setWhatsapp}
              type="tel"
              inputMode="numeric"
              maxLength={10}
              pattern="[6-9][0-9]{9}"
              validate={validatePhone}
              className="h-[56px] rounded-[24px] max-lg:rounded-[16px]"
              error={tried && whatsapp.length < 10}
            />
          </div>
        </div>

        <div
          className={isFormHidden ? 'animate-fade-slide-up' : 'animate-fade-slide-down'}
          style={{ animationDelay: isFormHidden ? '80ms' : '120ms' }}
        >
          <button
            onClick={handleContinue}
            className="smooth-corners h-[56px] w-full rounded-[24px] max-lg:rounded-[16px] border-[8px] border-[rgba(199,203,109,0.1)] bg-[#e3ed26] text-[18px] text-black leading-[34px] opacity-90 text-center cursor-pointer transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Desktop right panel — persistent container from step 2+ */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-[30%] z-30 max-lg:hidden backdrop-blur-[15px] bg-[rgba(0,0,0,0.2)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          step >= 2
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-[80px] pointer-events-none'
        }`}
        style={{ transitionDelay: step === 2 ? '300ms' : '0ms' }}
      >
        {step === 2 && (
          <div key="step2" className="absolute inset-0">
            <VisitDetailsPanel name={name} onBack={() => setStep(1)} onContinue={handleVisitDetailsContinue} initialDelay={400} />
          </div>
        )}
        {step === 3 && (
          <div key="step3" className="absolute inset-0">
            <TravelStayPanel onBack={() => setStep(2)} onContinue={handleTravelStayContinue} />
          </div>
        )}
        {step === 4 && (
          <div key="step4" className="absolute inset-0">
            <ReviewConfirmPanel
              data={{ name, whatsapp, city, duration, travelStatus, accommodation }}
              onBack={() => setStep(3)}
              onSubmit={handleSubmit}
            />
          </div>
        )}
        {step === 5 && (
          <div key="step5" className="absolute inset-0">
            <ThankYouPanel
              data={{ city, duration, travelStatus, accommodation }}
            />
          </div>
        )}
      </div>

      {/* ====== MOBILE LAYOUT (<1024px) ====== */}

      {/* Mobile Step 1 — always mounted, animated out */}
      <div
        className={`lg:hidden relative z-10 flex flex-col min-h-[100dvh] transition-opacity duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isFormHidden ? 'opacity-0 pointer-events-none max-h-0 overflow-hidden' : ''
        }`}
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.7) 100%)',
        }}
      >
        <div className="flex flex-col gap-[32px] px-6 pt-[50px] pb-[40px]">
          <div className="flex flex-col gap-5">
            <h1 className="text-[40px] font-normal leading-none text-white">
              Campus Visit
              <br />
              IIT-D AIUX 2026
            </h1>

            <div className="flex flex-col gap-8">
              <p className="text-[16px] font-normal leading-[28px] text-white opacity-90">
                Register your visit to the IIT Delhi campus. We&apos;ll coordinate
                travel and accommodation with fellow cohort members.
              </p>

              <div className="flex gap-2 items-center">
                <div className="smooth-corners flex items-center gap-2 rounded-[16px] bg-[rgba(255,255,255,0.08)] px-4 py-[10px]">
                  <div className="text-[14px] text-white tracking-[0.56px]">
                    <p className="leading-[26px]">Full Programme</p>
                    <p className="leading-[26px]">May 16 – 20</p>
                  </div>
                </div>
                <div className="smooth-corners flex items-center gap-2 rounded-[16px] bg-[rgba(255,255,255,0.08)] px-4 py-[10px]">
                  <div className="text-[14px] text-white tracking-[0.56px]">
                    <p className="leading-[26px]">Weekend Sprint</p>
                    <p className="leading-[26px]">May 16 – 17</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[21px]">
              <div
                className={isFormHidden ? 'animate-fade-slide-up' : 'animate-fade-slide-down'}
                style={{ animationDelay: isFormHidden ? '0ms' : '0ms' }}
              >
                <FloatingInput
                  label="Your name"
                  value={name}
                  onChange={setName}
                  className="h-[56px] rounded-[16px]"
                  error={tried && !name.trim()}
                />
              </div>
              <div
                className={isFormHidden ? 'animate-fade-slide-up' : 'animate-fade-slide-down'}
                style={{ animationDelay: isFormHidden ? '40ms' : '60ms' }}
              >
                <FloatingInput
                  label="Whatsapp number"
                  value={whatsapp}
                  onChange={setWhatsapp}
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[6-9][0-9]{9}"
                  validate={validatePhone}
                  className="h-[56px] rounded-[16px]"
                  error={tried && whatsapp.length < 10}
                />
              </div>
            </div>

            <div
              className={isFormHidden ? 'animate-fade-slide-up' : 'animate-fade-slide-down'}
              style={{ animationDelay: isFormHidden ? '80ms' : '120ms' }}
            >
              <button
                onClick={handleContinue}
                className="smooth-corners h-[56px] w-full rounded-[16px] border-[6px] border-[rgba(199,203,109,0.1)] bg-[#e3ed26] text-[16px] text-black leading-[34px] opacity-90 text-center cursor-pointer transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile panel — persistent container from step 2+ */}
      <div
        className={`lg:hidden fixed left-0 right-0 top-0 z-30 overflow-auto backdrop-blur-[15px] bg-[rgba(0,0,0,0.2)] transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          step >= 2
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ height: '100dvh', transitionDelay: step === 2 ? '250ms' : '0ms' }}
      >
        {step === 2 && (
          <div key="step2" className="absolute inset-0">
            <VisitDetailsPanel name={name} onBack={() => setStep(1)} onContinue={handleVisitDetailsContinue} initialDelay={300} />
          </div>
        )}
        {step === 3 && (
          <div key="step3" className="absolute inset-0">
            <TravelStayPanel onBack={() => setStep(2)} onContinue={handleTravelStayContinue} />
          </div>
        )}
        {step === 4 && (
          <div key="step4" className="absolute inset-0">
            <ReviewConfirmPanel
              data={{ name, whatsapp, city, duration, travelStatus, accommodation }}
              onBack={() => setStep(3)}
              onSubmit={handleSubmit}
            />
          </div>
        )}
        {step === 5 && (
          <div key="step5" className="absolute inset-0">
            <ThankYouPanel
              data={{ city, duration, travelStatus, accommodation }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
