'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export type Registration = {
  id: number
  name: string
  whatsapp: string
  city: string
  duration: string        // 'full' | 'weekend'
  travelStatus: string    // 'done' | 'not_yet'
  accommodation: string   // 'own' | 'common'
  createdAt: string
}

type FilterKey = 'full' | 'weekend' | 'common' | 'own'
type TravelFilter = '' | 'sorted' | 'arranging'

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

function DonutChart({ full, weekend }: { full: number; weekend: number }) {
  const total = full + weekend
  const fullPct = total > 0 ? (full / total) * 100 : 0
  const r = 70
  const fill = 22
  const circ = 2 * Math.PI * r
  const fullLen = (fullPct / 100) * circ

  return (
    <svg width="176" height="176" viewBox="0 0 176 176">
      <circle cx="88" cy="88" r={r} fill="none" stroke="#a5b4fc" strokeWidth={fill}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '88px 88px' }} />
      <circle cx="88" cy="88" r={r} fill="none" stroke="#6366f1" strokeWidth={fill}
        strokeDasharray={`${fullLen} ${circ - fullLen}`}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '88px 88px' }} />
    </svg>
  )
}

const CARD_CLASS = 'bg-white border border-gray-100 rounded-[16px] p-4 overflow-hidden'

export default function DashboardClient({ registrations }: { registrations: Registration[] }) {
  const router = useRouter()
  const [panelOpen, setPanelOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<Set<FilterKey>>(new Set())
  const [cityFilter, setCityFilter] = useState('')
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false)
  const [travelFilter, setTravelFilter] = useState<TravelFilter>('')

  const totalRegistered = registrations.length
  const uniqueCities = useMemo(() => [...new Set(registrations.map(s => s.city))], [registrations])
  const citiesCount = uniqueCities.length
  const travelSorted = registrations.filter(s => s.travelStatus === 'done').length
  const travelPct = totalRegistered > 0 ? Math.round((travelSorted / totalRegistered) * 100) : 0
  const groupStay = registrations.filter(s => s.accommodation === 'common').length
  const fullCount = registrations.filter(s => s.duration === 'full').length
  const weekendCount = registrations.filter(s => s.duration === 'weekend').length
  const ownCount = registrations.filter(s => s.accommodation === 'own').length
  const stillArranging = totalRegistered - travelSorted

  const cityDistribution = useMemo(() => {
    const map: Record<string, number> = {}
    registrations.forEach(s => { map[s.city] = (map[s.city] || 0) + 1 })
    return Object.entries(map).sort((a, b) => b[1] - a[1])
  }, [registrations])

  const maxCityCount = cityDistribution.length > 0 ? cityDistribution[0][1] : 1
  const BAR_MAX_H = 130

  const filteredRegistrations = useMemo(() => {
    let list = registrations
    if (search) list = list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
    if (filters.size > 0) {
      list = list.filter(s => {
        const durationMatch = (filters.has('full') && s.duration === 'full') || (filters.has('weekend') && s.duration === 'weekend')
        const accomMatch = (filters.has('common') && s.accommodation === 'common') || (filters.has('own') && s.accommodation === 'own')
        const hasDuration = filters.has('full') || filters.has('weekend')
        const hasAccom = filters.has('common') || filters.has('own')
        if (hasDuration && hasAccom) return durationMatch && accomMatch
        if (hasDuration) return durationMatch
        if (hasAccom) return accomMatch
        return true
      })
    }
    if (cityFilter) list = list.filter(s => s.city === cityFilter)
    if (travelFilter === 'sorted') list = list.filter(s => s.travelStatus === 'done')
    if (travelFilter === 'arranging') list = list.filter(s => s.travelStatus === 'not_yet')
    return list
  }, [registrations, search, filters, cityFilter, travelFilter])

  const checkboxPills: { key: FilterKey; label: string }[] = [
    { key: 'full', label: 'Full 5 days' },
    { key: 'weekend', label: 'Weekend' },
    { key: 'common', label: 'Group stay' },
    { key: 'own', label: 'Own stay' },
  ]

  const toggleFilter = (key: FilterKey) => {
    setFilters(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-[#f5f5f5]" />

      {/* Content */}
      <div className="relative z-10 p-6 max-lg:p-4 flex flex-col gap-4">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] max-lg:text-[18px] font-normal text-black">Campus Visit IIT-D AIUX 2025</h1>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => router.push('/')}
              className="flex gap-[10px] items-center px-3 py-2 rounded-[60px] border border-[rgba(0,0,0,0.1)] cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.03)]"
            >
              <Image src="/icons/home.svg" alt="" width={20} height={20} className="invert" />
              <span className="text-[14px] max-lg:hidden text-black">Home</span>
            </button>
            <button
              onClick={() => setPanelOpen(true)}
              className="flex gap-[10px] items-center px-3 py-2 rounded-[60px] border border-[rgba(0,0,0,0.1)] cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.03)]"
            >
              <Image src="/icons/participants.svg" alt="" width={20} height={20} className="invert" />
              <span className="text-[14px] max-lg:hidden text-black">Participants</span>
            </button>
          </div>
        </div>

        {/* Row 1: Stat cards */}
        <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-[17px] max-lg:gap-3 text-black">
          <div
            className={`${CARD_CLASS} cursor-pointer hover:bg-gray-50 transition-colors group`}
            onClick={() => { setFilters(new Set()); setTravelFilter(''); setCityFilter(''); setPanelOpen(true) }}
          >
            <p className="text-[14px] max-lg:text-[14px] opacity-60">Total registered</p>
            <div className="flex flex-col gap-[6px] opacity-80 mt-4">
              <p className="text-[32px] max-lg:text-[24px] font-medium group-hover:underline">{totalRegistered}</p>
              <p className="text-[16px] max-lg:text-[13px] opacity-60">confirmed seats</p>
            </div>
          </div>
          <div className={`${CARD_CLASS} cursor-pointer hover:bg-gray-50 transition-colors group`}>
            <p className="text-[14px] max-lg:text-[14px] opacity-60">Cities Represented</p>
            <div className="flex flex-col gap-[6px] opacity-80 mt-4">
              <p className="text-[32px] max-lg:text-[24px] font-medium group-hover:underline">{citiesCount}</p>
              <p className="text-[16px] max-lg:text-[13px] opacity-60">across India</p>
            </div>
          </div>
          <div
            className={`${CARD_CLASS} cursor-pointer hover:bg-gray-50 transition-colors group`}
            onClick={() => { setTravelFilter('sorted'); setFilters(new Set()); setCityFilter(''); setPanelOpen(true) }}
          >
            <p className="text-[14px] max-lg:text-[14px] opacity-60">Travel sorted</p>
            <div className="flex flex-col gap-[6px] opacity-80 mt-4">
              <p className="text-[32px] max-lg:text-[24px] font-medium group-hover:underline">{travelSorted}</p>
              <p className="text-[16px] max-lg:text-[13px] opacity-60">{travelPct}% sorted</p>
            </div>
          </div>
          <div
            className={`${CARD_CLASS} cursor-pointer hover:bg-gray-50 transition-colors group`}
            onClick={() => { setFilters(new Set(['common'])); setTravelFilter(''); setCityFilter(''); setPanelOpen(true) }}
          >
            <p className="text-[14px] max-lg:text-[14px] opacity-60">Group Stay</p>
            <div className="flex flex-col gap-[6px] opacity-80 mt-4">
              <p className="text-[32px] max-lg:text-[24px] font-medium group-hover:underline">{groupStay}</p>
              <p className="text-[16px] max-lg:text-[13px] opacity-60">in common booking</p>
            </div>
          </div>
        </div>

        {/* Row 2: City Distribution */}
        <div className="bg-white border border-gray-100 rounded-[16px] p-4 flex flex-col gap-4 text-black">
          <p className="text-[14px] opacity-60">City Distribution</p>
          {cityDistribution.length > 0 ? (
            <div className="flex gap-5 max-lg:gap-3 items-end overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {cityDistribution.map(([city, count], idx) => (
                <div
                  key={city}
                  className="flex flex-col gap-[10px] items-center shrink-0 w-[72px] max-lg:w-[56px] cursor-pointer group"
                  onClick={() => { setCityFilter(city); setFilters(new Set()); setPanelOpen(true) }}
                >
                  <p className="text-[20px] max-lg:text-[14px] group-hover:underline">{count}</p>
                  <div
                    className="w-full rounded-[16px] max-lg:rounded-[10px] transition-all duration-200 group-hover:scale-[1.05] group-hover:brightness-95"
                    style={{
                      height: `${Math.max(30, (count / maxCityCount) * BAR_MAX_H)}px`,
                      background: `hsl(${210 + idx * 15}, 55%, ${85 + (idx % 3) * 4}%)`,
                    }}
                  />
                  <p className="text-[14px] max-lg:text-[11px] opacity-60 whitespace-nowrap group-hover:opacity-100 transition-opacity duration-200">{city}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[14px] text-black/40 py-4">No registrations yet</p>
          )}
        </div>

        {/* Row 3: Duration / Accommodation / Travel */}
        <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5 text-black">
          {/* Visit Duration */}
          <div className={`${CARD_CLASS} flex flex-col gap-4`}>
            <p className="text-[14px] opacity-60">Visit Duration</p>
            <div className="flex gap-5 items-center">
              <div className="shrink-0">
                <DonutChart full={fullCount} weekend={weekendCount} />
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <div
                  className="group/row flex gap-3 items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={() => { setFilters(new Set(['full'])); setTravelFilter(''); setPanelOpen(true) }}
                >
                  <div className="flex gap-2 items-center flex-1">
                    <div className="w-5 h-5 rounded-[4px] bg-[#6366f1] shrink-0" />
                    <p className="text-[15px] opacity-60">Full 5 days</p>
                  </div>
                  <p className="text-[28px] group-hover/row:underline">{fullCount}</p>
                </div>
                <div
                  className="group/row flex gap-3 items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={() => { setFilters(new Set(['weekend'])); setTravelFilter(''); setPanelOpen(true) }}
                >
                  <div className="flex gap-2 items-center flex-1">
                    <div className="w-5 h-5 rounded-[4px] bg-[#a5b4fc] shrink-0" />
                    <p className="text-[15px] opacity-60">Weekend sprint</p>
                  </div>
                  <p className="text-[28px] group-hover/row:underline">{weekendCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Accommodation */}
          <div className={`${CARD_CLASS} flex flex-col justify-between`}>
            <p className="text-[14px] opacity-60">Accommodation</p>
            <div className="flex flex-col gap-5 mt-4">
              <div
                className="group/row flex flex-col gap-[6px] cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => { setFilters(new Set(['own'])); setTravelFilter(''); setPanelOpen(true) }}
              >
                <p className="text-[32px] group-hover/row:underline">{ownCount}</p>
                <p className="text-[14px] opacity-60">Own Arrangement</p>
              </div>
              <div
                className="group/row flex flex-col gap-[6px] cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => { setFilters(new Set(['common'])); setTravelFilter(''); setPanelOpen(true) }}
              >
                <p className="text-[32px] group-hover/row:underline">{groupStay}</p>
                <p className="text-[14px] opacity-60">Group booking</p>
              </div>
            </div>
          </div>

          {/* Travel Status */}
          <div className={`${CARD_CLASS} flex flex-col justify-between`}>
            <p className="text-[14px] opacity-60">Travel status</p>
            <div className="flex flex-col gap-5 mt-4">
              <div
                className="group/row flex flex-col gap-[6px] cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => { setTravelFilter('sorted'); setFilters(new Set()); setPanelOpen(true) }}
              >
                <p className="text-[32px] group-hover/row:underline">{travelSorted}</p>
                <p className="text-[14px] opacity-60">Sorted</p>
              </div>
              <div
                className="group/row flex flex-col gap-[6px] cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => { setTravelFilter('arranging'); setFilters(new Set()); setPanelOpen(true) }}
              >
                <p className="text-[32px] group-hover/row:underline">{stillArranging}</p>
                <p className="text-[14px] opacity-60">Still arranging</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Participants Panel Overlay */}
      {panelOpen && (
        <div className="fixed inset-0 z-50" onClick={() => { setPanelOpen(false); setCityDropdownOpen(false) }}>
          <div className="absolute inset-0 backdrop-blur-[5px] bg-[rgba(0,0,0,0.1)]" />
        </div>
      )}

      {/* Participants Slide-over */}
      <div
        className={`fixed top-0 right-0 h-full w-[618px] max-lg:w-full bg-white z-50 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          panelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-5 p-6 overflow-hidden flex-1">
          {/* Header + Search + Filters */}
          <div className="flex flex-col gap-[18px] shrink-0">
            <div className="flex items-center justify-between">
              <h2 className="text-[24px] font-medium text-black">All Participants ({filteredRegistrations.length})</h2>
              <button onClick={() => { setPanelOpen(false); setCityDropdownOpen(false) }} className="cursor-pointer p-1">
                <Image src="/icons/close.svg" alt="Close" width={24} height={24} />
              </button>
            </div>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name"
              className="w-full h-[49px] bg-[#f2f2f2] rounded-[10px] px-3 text-[16px] text-black outline-none placeholder:text-black/40"
            />

            <div className="flex gap-[10px] items-center flex-wrap">
              <button
                onClick={() => { setFilters(new Set()); setCityFilter(''); setCityDropdownOpen(false) }}
                className={`px-3 py-2 rounded-[10px] text-[14px] cursor-pointer transition-colors border ${
                  filters.size === 0 && !cityFilter
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-[#efefef] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]'
                }`}
              >
                All
              </button>
              {checkboxPills.map((p) => (
                <button
                  key={p.key}
                  onClick={() => toggleFilter(p.key)}
                  className={`flex gap-[6px] items-center px-3 py-2 rounded-[10px] text-[14px] cursor-pointer transition-colors border ${
                    filters.has(p.key)
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-[#efefef] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]'
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="0.5" y="0.5" width="15" height="15" rx="3" stroke={filters.has(p.key) ? 'white' : '#ccc'} />
                    {filters.has(p.key) && <path d="M4 8l2.5 2.5L12 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
                  </svg>
                  {p.label}
                </button>
              ))}
              <div className="relative">
                <button
                  onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                  className={`flex gap-[10px] items-center px-3 py-2 rounded-[10px] text-[14px] cursor-pointer transition-colors border ${
                    cityFilter
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-[#efefef] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]'
                  }`}
                >
                  {cityFilter || 'Location'}
                  <Image src="/icons/filter.svg" alt="" width={16} height={16} className={cityFilter ? 'invert' : ''} />
                </button>
                {cityDropdownOpen && (
                  <div className="absolute top-full mt-1 left-0 bg-white border border-[#efefef] rounded-[10px] shadow-lg z-10 max-h-[200px] overflow-y-auto w-[160px]">
                    <button
                      onClick={() => { setCityFilter(''); setCityDropdownOpen(false) }}
                      className={`w-full text-left px-3 py-2 text-[14px] text-black hover:bg-[#f2f2f2] cursor-pointer ${!cityFilter ? 'font-medium' : ''}`}
                    >
                      All cities
                    </button>
                    {uniqueCities.sort().map(c => (
                      <button
                        key={c}
                        onClick={() => { setCityFilter(c); setCityDropdownOpen(false) }}
                        className={`w-full text-left px-3 py-2 text-[14px] text-black hover:bg-[#f2f2f2] cursor-pointer ${cityFilter === c ? 'font-medium' : ''}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Participant List */}
          <div className="flex flex-col overflow-y-auto flex-1 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {filteredRegistrations.map((s) => (
              <div key={s.id} className="flex items-start justify-between py-5 border-b border-[#f3f3f3]">
                <div className="flex gap-3 items-center">
                  <div className="flex items-center justify-center w-[56px] h-[56px] max-lg:w-[44px] max-lg:h-[44px] rounded-full bg-[#f7f7f7] shrink-0">
                    <span className="text-[24px] max-lg:text-[18px] font-light text-black">{getInitials(s.name)}</span>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[16px] max-lg:text-[14px] text-black">{s.name}</p>
                    <p className="text-[14px] max-lg:text-[12px] text-black opacity-40">{s.city}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center max-lg:flex-col max-lg:items-end">
                  <div className="flex gap-1 items-center bg-[#e6eff3] px-[10px] py-2 rounded-[40px]">
                    <Image
                      src={s.accommodation === 'own' ? '/icons/own-accomodation.svg' : '/icons/shared-accomodation.svg'}
                      alt="" width={16} height={16}
                    />
                    <span className="text-[14px] max-lg:text-[12px] text-black whitespace-nowrap">
                      {s.accommodation === 'own' ? 'Own accommodation' : 'Shared accommodation'}
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/91${s.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-1 items-center bg-[#c6ffd3] px-[10px] py-2 rounded-[40px] no-underline"
                  >
                    <Image src="/icons/whatsapp.svg" alt="" width={16} height={16} />
                    <span className="text-[14px] max-lg:text-[12px] text-black whitespace-nowrap">{s.whatsapp}</span>
                  </a>
                </div>
              </div>
            ))}
            {filteredRegistrations.length === 0 && (
              <p className="text-center text-[16px] text-black/40 py-10">No participants found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
