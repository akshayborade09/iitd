'use client'

import { useState, useRef } from 'react'

interface FloatingInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  className?: string
  maxLength?: number
  inputMode?: 'text' | 'tel' | 'numeric' | 'email'
  pattern?: string
  validate?: (value: string) => string
  error?: boolean
}

export default function FloatingInput({
  label,
  value,
  onChange,
  type = 'text',
  className = '',
  maxLength,
  inputMode,
  pattern,
  validate,
  error,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isActive = focused || value.length > 0

  return (
    <div
      ref={wrapperRef}
      className={`glass-input smooth-corners relative flex flex-col justify-center cursor-text ${error ? '!border-[#FF4B4B] !bg-[rgba(255,82,82,0.20)]' : ''} ${className}`}
      onClick={() => inputRef.current?.focus()}
    >
      <label
        className={`absolute left-4 text-white pointer-events-none origin-top-left transition-all duration-200 ease-out ${
          isActive
            ? 'top-2 scale-75 opacity-60 text-[12px]'
            : 'top-1/2 -translate-y-1/2 opacity-90 text-[18px]'
        }`}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => {
          const val = validate ? validate(e.target.value) : e.target.value
          onChange(val)
        }}
        maxLength={maxLength}
        inputMode={inputMode}
        pattern={pattern}
        onFocus={() => {
          setFocused(true)
          const wrapper = wrapperRef.current
          if (!wrapper) return
          setTimeout(() => wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150)
        }}
        onBlur={() => setFocused(false)}
        className={`w-full bg-transparent text-white outline-none px-4 pb-2 transition-all duration-200 ${
          isActive
            ? 'pt-7 opacity-90 text-[18px]'
            : 'pt-4 opacity-0 text-[18px]'
        }`}
      />
    </div>
  )
}
