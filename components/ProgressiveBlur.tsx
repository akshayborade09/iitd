'use client'

const STEPS = 12
const MAX_BLUR = 44

export default function ProgressiveBlur({
  className = '',
  steps = STEPS,
  maxBlur = MAX_BLUR,
}: {
  className?: string
  steps?: number
  maxBlur?: number
}) {
  const blurPerLayer = maxBlur / steps

  return (
    <div className={`pointer-events-none ${className}`}>
      {Array.from({ length: steps }, (_, i) => {
        const fadeStart = ((i / steps) * 100).toFixed(2)
        const fadeEnd = (((i + 1) / steps) * 100).toFixed(2)

        return (
          <div
            key={i}
            className="absolute inset-0 pointer-events-none"
            style={{
              backdropFilter: `blur(${blurPerLayer}px)`,
              WebkitBackdropFilter: `blur(${blurPerLayer}px)`,
              maskImage: `linear-gradient(to bottom, transparent ${fadeStart}%, black ${fadeEnd}%)`,
              WebkitMaskImage: `linear-gradient(to bottom, transparent ${fadeStart}%, black ${fadeEnd}%)`,
            }}
          />
        )
      })}
    </div>
  )
}
