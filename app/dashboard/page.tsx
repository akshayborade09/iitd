'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const students = [
  { name: 'Sneha Mehta', whatsapp: '8382828282', city: 'Pune', duration: 'sprint', travelDone: false, accommodation: 'own' },
  { name: 'Amit Gupta', whatsapp: '8282828282', city: 'Mumbai', duration: 'full', travelDone: true, accommodation: 'group' },
  { name: 'Riya Nair', whatsapp: '8181818181', city: 'Bengaluru', duration: 'full', travelDone: true, accommodation: 'group' },
  { name: 'Vikram Kumar', whatsapp: '8080808080', city: 'Delhi', duration: 'full', travelDone: false, accommodation: 'own' },
  { name: 'Priya Tiwari', whatsapp: '7979797979', city: 'Hyderabad', duration: 'sprint', travelDone: true, accommodation: 'group' },
  { name: 'Sanjay Rao', whatsapp: '7878787878', city: 'Chennai', duration: 'full', travelDone: true, accommodation: 'group' },
  { name: 'Kajal Joshi', whatsapp: '7777777777', city: 'Ahmedabad', duration: 'full', travelDone: false, accommodation: 'own' },
  { name: 'Neha Sharma', whatsapp: '7676767676', city: 'Jaipur', duration: 'sprint', travelDone: true, accommodation: 'group' },
  { name: 'Rohit Verma', whatsapp: '7575757575', city: 'Bengaluru', duration: 'full', travelDone: true, accommodation: 'own' },
  { name: 'Ananya Das', whatsapp: '7474747474', city: 'Kolkata', duration: 'full', travelDone: false, accommodation: 'group' },
  { name: 'Karan Singh', whatsapp: '7373737373', city: 'Mumbai', duration: 'sprint', travelDone: true, accommodation: 'own' },
  { name: 'Divya Pillai', whatsapp: '7272727272', city: 'Kochi', duration: 'full', travelDone: true, accommodation: 'group' },
  { name: 'Arjun Reddy', whatsapp: '7171717171', city: 'Hyderabad', duration: 'full', travelDone: false, accommodation: 'own' },
  { name: 'Meera Iyer', whatsapp: '7070707070', city: 'Bengaluru', duration: 'sprint', travelDone: true, accommodation: 'group' },
  { name: 'Suresh Patil', whatsapp: '6969696969', city: 'Pune', duration: 'full', travelDone: true, accommodation: 'group' },
  { name: 'Pooja Menon', whatsapp: '6868686868', city: 'Delhi', duration: 'full', travelDone: true, accommodation: 'own' },
  { name: 'Rahul Banerjee', whatsapp: '6767676767', city: 'Kolkata', duration: 'sprint', travelDone: false, accommodation: 'group' },
  { name: 'Tanya Kapoor', whatsapp: '6666666666', city: 'Jaipur', duration: 'full', travelDone: true, accommodation: 'own' },
  { name: 'Aditya Nath', whatsapp: '6565656565', city: 'Lucknow', duration: 'full', travelDone: true, accommodation: 'group' },
  { name: 'Simran Kaur', whatsapp: '6464646464', city: 'Chandigarh', duration: 'sprint', travelDone: false, accommodation: 'own' },
  { name: 'Vivek Mishra', whatsapp: '6363636363', city: 'Lucknow', duration: 'full', travelDone: true, accommodation: 'group' },
  { name: 'Ishita Agarwal', whatsapp: '6262626262', city: 'Delhi', duration: 'full', travelDone: true, accommodation: 'own' },
  { name: 'Manish Dubey', whatsapp: '6161616161', city: 'Mumbai', duration: 'sprint', travelDone: false, accommodation: 'group' },
  { name: 'Swati Deshmukh', whatsapp: '6060606060', city: 'Pune', duration: 'full', travelDone: true, accommodation: 'group' },
]

type FilterType = 'all' | 'full' | 'sprint' | 'group' | 'own'

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

function DonutChart({ full, sprint }: { full: number; sprint: number }) {
  const total = full + sprint
  const fullPct = total > 0 ? (full / total) * 100 : 0
  const r = 70
  const fill = 22
  const border = 1
  const circ = 2 * Math.PI * r
  const fullLen = (fullPct / 100) * circ
  const sprintLen = circ - fullLen

  return (
    <svg width="176" height="176" viewBox="0 0 176 176">
      {/* Black segment (Full 5 days) — fill + border */}
      <circle cx="88" cy="88" r={r} fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth={fill}
        strokeDasharray={`${fullLen} ${circ - fullLen}`}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '88px 88px' }} />
      <circle cx="88" cy="88" r={r + fill / 2 - border / 2} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={border}
        strokeDasharray={`${fullLen * ((r + fill / 2 - border / 2) / r)} ${circ * ((r + fill / 2 - border / 2) / r) - fullLen * ((r + fill / 2 - border / 2) / r)}`}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '88px 88px' }} />
      <circle cx="88" cy="88" r={r - fill / 2 + border / 2} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={border}
        strokeDasharray={`${fullLen * ((r - fill / 2 + border / 2) / r)} ${circ * ((r - fill / 2 + border / 2) / r) - fullLen * ((r - fill / 2 + border / 2) / r)}`}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '88px 88px' }} />
      {/* White segment (Weekend sprint) — fill + border */}
      <circle cx="88" cy="88" r={r} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={fill}
        strokeDasharray={`${sprintLen} ${circ - sprintLen}`}
        strokeDashoffset={-fullLen}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '88px 88px' }} />
      <circle cx="88" cy="88" r={r + fill / 2 - border / 2} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={border}
        strokeDasharray={`${sprintLen * ((r + fill / 2 - border / 2) / r)} ${circ * ((r + fill / 2 - border / 2) / r) - sprintLen * ((r + fill / 2 - border / 2) / r)}`}
        strokeDashoffset={-fullLen * ((r + fill / 2 - border / 2) / r)}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '88px 88px' }} />
      <circle cx="88" cy="88" r={r - fill / 2 + border / 2} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={border}
        strokeDasharray={`${sprintLen * ((r - fill / 2 + border / 2) / r)} ${circ * ((r - fill / 2 + border / 2) / r) - sprintLen * ((r - fill / 2 + border / 2) / r)}`}
        strokeDashoffset={-fullLen * ((r - fill / 2 + border / 2) / r)}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '88px 88px' }} />
    </svg>
  )
}

const CARD_CLASS = 'backdrop-blur-[35px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-[16px] p-4 overflow-hidden'

export default function Dashboard() {
  const router = useRouter()
  const [panelOpen, setPanelOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const [cityFilter, setCityFilter] = useState('')
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false)

  const totalRegistered = students.length
  const uniqueCities = useMemo(() => [...new Set(students.map(s => s.city))], [])
  const citiesCount = uniqueCities.length
  const travelSorted = students.filter(s => s.travelDone).length
  const travelPct = Math.round((travelSorted / totalRegistered) * 100)
  const groupStay = students.filter(s => s.accommodation === 'group').length
  const fullCount = students.filter(s => s.duration === 'full').length
  const sprintCount = students.filter(s => s.duration === 'sprint').length
  const ownCount = students.filter(s => s.accommodation === 'own').length
  const stillArranging = totalRegistered - travelSorted

  const cityDistribution = useMemo(() => {
    const map: Record<string, number> = {}
    students.forEach(s => { map[s.city] = (map[s.city] || 0) + 1 })
    return Object.entries(map).sort((a, b) => b[1] - a[1])
  }, [])

  const maxCityCount = cityDistribution.length > 0 ? cityDistribution[0][1] : 1
  const BAR_MAX_H = 130

  const filteredStudents = useMemo(() => {
    let list = students
    if (search) list = list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
    if (filter === 'full') list = list.filter(s => s.duration === 'full')
    if (filter === 'sprint') list = list.filter(s => s.duration === 'sprint')
    if (filter === 'group') list = list.filter(s => s.accommodation === 'group')
    if (filter === 'own') list = list.filter(s => s.accommodation === 'own')
    if (cityFilter) list = list.filter(s => s.city === cityFilter)
    return list
  }, [search, filter, cityFilter])

  const filterPills: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'full', label: 'Full 5 days' },
    { key: 'sprint', label: 'Weekend' },
    { key: 'group', label: 'Group stay' },
    { key: 'own', label: 'Own stay' },
  ]

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0">
        <Image src="/assets/dashboard-bg.png" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 backdrop-blur-[100px] bg-[rgba(0,0,0,0.2)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-[30px] max-lg:p-4 flex flex-col gap-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] max-lg:text-[18px] font-normal text-white">Campus Visit IIT-D AIUX 2025</h1>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => router.push('/')}
              className="flex gap-[10px] items-center px-[14px] py-[9px] rounded-[60px] border border-[rgba(255,255,255,0.15)] cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.05)]"
            >
              <Image src="/icons/home.svg" alt="" width={24} height={24} />
              <span className="text-[16px] max-lg:hidden text-white opacity-50">Home</span>
            </button>
            <button
              onClick={() => setPanelOpen(true)}
              className="flex gap-[10px] items-center px-[14px] py-[9px] rounded-[60px] border border-[rgba(255,255,255,0.15)] cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.05)]"
            >
              <Image src="/icons/participants.svg" alt="" width={24} height={24} />
              <span className="text-[16px] max-lg:hidden text-white opacity-50">Participants</span>
            </button>
          </div>
        </div>

        {/* Row 1: Stat cards */}
        <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-[17px] max-lg:gap-3 text-white">
          <div className={CARD_CLASS}>
            <p className="text-[14px] max-lg:text-[14px] opacity-60">Total registered</p>
            <div className="flex flex-col gap-[6px] opacity-80 mt-4">
              <p className="text-[32px] max-lg:text-[24px] font-medium">{totalRegistered}</p>
              <p className="text-[16px] max-lg:text-[13px] opacity-60">confirmed seats</p>
            </div>
          </div>
          <div className={CARD_CLASS}>
            <p className="text-[14px] max-lg:text-[14px] opacity-60">Cities Represented</p>
            <div className="flex flex-col gap-[6px] opacity-80 mt-4">
              <p className="text-[32px] max-lg:text-[24px] font-medium">{citiesCount}</p>
              <p className="text-[16px] max-lg:text-[13px] opacity-60">across India</p>
            </div>
          </div>
          <div className={CARD_CLASS}>
            <p className="text-[14px] max-lg:text-[14px] opacity-60">Travel sorted</p>
            <div className="flex flex-col gap-[6px] opacity-80 mt-4">
              <p className="text-[32px] max-lg:text-[24px] font-medium">{travelSorted}</p>
              <p className="text-[16px] max-lg:text-[13px] opacity-60">{travelPct}% sorted</p>
            </div>
          </div>
          <div className={CARD_CLASS}>
            <p className="text-[14px] max-lg:text-[14px] opacity-60">Group Stay</p>
            <div className="flex flex-col gap-[6px] opacity-80 mt-4">
              <p className="text-[32px] max-lg:text-[24px] font-medium">{groupStay}</p>
              <p className="text-[16px] max-lg:text-[13px] opacity-60">in common booking</p>
            </div>
          </div>
        </div>

        {/* Row 2: City Distribution */}
        <div className={`${CARD_CLASS} flex flex-col gap-4 text-white`}>
          <p className="text-[16px] opacity-60">City Distribution</p>
          <div className="flex gap-5 max-lg:gap-2 items-end overflow-x-auto pb-2">
            {cityDistribution.map(([city, count]) => (
              <div key={city} className="flex flex-col gap-[10px] items-center flex-1 min-w-[60px] max-lg:min-w-[50px]">
                <p className="text-[20px] max-lg:text-[14px]">{count}</p>
                <div
                  className="w-full rounded-[16px] max-lg:rounded-[10px] backdrop-blur-[30px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)]"
                  style={{ height: `${Math.max(30, (count / maxCityCount) * BAR_MAX_H)}px` }}
                />
                <p className="text-[16px] max-lg:text-[11px] opacity-60 whitespace-nowrap">{city}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Duration / Accommodation / Travel */}
        <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5 text-white">
          {/* Visit Duration */}
          <div className={`${CARD_CLASS} flex flex-col gap-4`}>
            <p className="text-[16px] opacity-60">Visit Duration</p>
            <div className="flex gap-5 items-center">
              <div className="shrink-0">
                <DonutChart full={fullCount} sprint={sprintCount} />
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex gap-3 items-center justify-between">
                  <div className="flex gap-2 items-center flex-1">
                    <div className="w-5 h-5 bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.3)] shrink-0" />
                    <p className="text-[15px] opacity-60">Full 5 days</p>
                  </div>
                  <p className="text-[28px]">{fullCount}</p>
                </div>
                <div className="flex gap-3 items-center justify-between">
                  <div className="flex gap-2 items-center flex-1">
                    <div className="w-5 h-5 bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.5)] shrink-0" />
                    <p className="text-[15px] opacity-60">Weekend sprint</p>
                  </div>
                  <p className="text-[28px]">{sprintCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Accommodation */}
          <div className={`${CARD_CLASS} flex flex-col justify-between`}>
            <p className="text-[16px] opacity-60">Accommodation</p>
            <div className="flex flex-col gap-5 mt-4">
              <div className="flex flex-col gap-[6px]">
                <p className="text-[32px]">{ownCount}</p>
                <p className="text-[16px] opacity-60">Own Arrangement</p>
              </div>
              <div className="flex flex-col gap-[6px]">
                <p className="text-[32px]">{groupStay}</p>
                <p className="text-[16px] opacity-60">Group booking</p>
              </div>
            </div>
          </div>

          {/* Travel Status */}
          <div className={`${CARD_CLASS} flex flex-col justify-between`}>
            <p className="text-[16px] opacity-60">Travel status</p>
            <div className="flex flex-col gap-5 mt-4">
              <div className="flex flex-col gap-[6px]">
                <p className="text-[32px]">{travelSorted}</p>
                <p className="text-[16px] opacity-60">Sorted</p>
              </div>
              <div className="flex flex-col gap-[6px]">
                <p className="text-[32px]">{stillArranging}</p>
                <p className="text-[16px] opacity-60">Still arranging</p>
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
              <h2 className="text-[24px] font-medium text-black">All Participants</h2>
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
              {filterPills.map((p) => (
                <button
                  key={p.key}
                  onClick={() => { setFilter(p.key); setCityFilter(''); setCityDropdownOpen(false) }}
                  className={`px-3 py-2 rounded-[10px] text-[14px] cursor-pointer transition-colors border ${
                    filter === p.key && !cityFilter
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-[#efefef] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]'
                  }`}
                >
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
                        onClick={() => { setCityFilter(c); setFilter('all'); setCityDropdownOpen(false) }}
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
          <div className="flex flex-col overflow-y-auto flex-1">
            {filteredStudents.map((s) => (
              <div key={s.whatsapp} className="flex items-startfo justify-between py-5 border-b border-[#f3f3f3]">
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
                      {s.accommodation === 'own' ? 'Own accomodation' : 'Shared accomodation'}
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
            {filteredStudents.length === 0 && (
              <p className="text-center text-[16px] text-black/40 py-10">No participants found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
