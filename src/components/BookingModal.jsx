import { useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight, Users, Bed, Maximize, Star, Calendar, CreditCard, Clock, Check, Shield, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { useBooking } from '../context/BookingContext'

function StepIndicator({ current, steps }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-semibold transition-all duration-300"
              style={{
                backgroundColor: i <= current ? 'var(--color-accent)' : 'rgba(12,35,64,0.08)',
                color: i <= current ? 'var(--color-dark)' : 'rgba(12,35,64,0.3)',
              }}
            >
              {i < current ? <Check size={14} /> : i + 1}
            </div>
            <span
              className="font-body text-[11px] tracking-wide uppercase hidden sm:block"
              style={{ color: i <= current ? 'var(--color-dark)' : 'rgba(12,35,64,0.3)' }}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className="w-8 h-px"
              style={{ backgroundColor: i < current ? 'var(--color-accent)' : 'rgba(12,35,64,0.1)' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function RoomDetailStep() {
  const { selectedRoom, setStep, close } = useBooking()
  const [activeImg, setActiveImg] = useState(0)

  if (!selectedRoom) return null

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/2">
        <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3">
          <img
            src={selectedRoom.gallery[activeImg]}
            alt={selectedRoom.name}
            className="w-full h-full object-cover"
          />
          {selectedRoom.gallery.length > 1 && (
            <>
              <button
                onClick={() => setActiveImg(i => (i - 1 + selectedRoom.gallery.length) % selectedRoom.gallery.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white/80 hover:bg-black/60 transition-colors cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setActiveImg(i => (i + 1) % selectedRoom.gallery.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white/80 hover:bg-black/60 transition-colors cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>
        <div className="flex gap-2">
          {selectedRoom.gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className="rounded-lg overflow-hidden cursor-pointer transition-opacity"
              style={{
                width: '72px', height: '52px',
                opacity: i === activeImg ? 1 : 0.5,
                border: i === activeImg ? '2px solid var(--color-accent)' : '2px solid transparent',
              }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="lg:w-1/2">
        <p className="font-body text-[11px] tracking-[0.15em] uppercase mb-1" style={{ color: 'var(--color-accent-dark)' }}>
          {selectedRoom.building}
        </p>
        <h3 className="font-display text-3xl font-semibold mb-3" style={{ color: 'var(--color-dark)' }}>
          {selectedRoom.name}
        </h3>
        <p className="font-body text-sm leading-relaxed mb-6" style={{ color: 'var(--color-dark)', opacity: 0.65 }}>
          {selectedRoom.description}
        </p>

        <div className="flex gap-6 mb-6">
          <div className="flex items-center gap-2">
            <Users size={16} style={{ color: 'var(--color-accent-dark)' }} />
            <span className="font-body text-sm" style={{ color: 'var(--color-dark)', opacity: 0.7 }}>
              Up to {selectedRoom.maxGuests} guests
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Bed size={16} style={{ color: 'var(--color-accent-dark)' }} />
            <span className="font-body text-sm" style={{ color: 'var(--color-dark)', opacity: 0.7 }}>
              {selectedRoom.bedType}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize size={16} style={{ color: 'var(--color-accent-dark)' }} />
            <span className="font-body text-sm" style={{ color: 'var(--color-dark)', opacity: 0.7 }}>
              {selectedRoom.size}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {selectedRoom.features.map((feat, i) => (
            <span
              key={i}
              className="font-body text-xs px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: 'rgba(200,169,110,0.1)',
                color: 'var(--color-accent-dark)',
                border: '1px solid rgba(200,169,110,0.15)',
              }}
            >
              {feat}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between p-5 rounded-xl mb-6" style={{ backgroundColor: 'rgba(12,35,64,0.03)' }}>
          <div>
            <p className="font-body text-[11px] tracking-wider uppercase mb-1" style={{ color: 'var(--color-accent-dark)' }}>
              Starting from
            </p>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl font-light" style={{ color: 'var(--color-dark)' }}>
                ${selectedRoom.price}
              </span>
              <span className="font-body text-sm" style={{ color: 'var(--color-dark)', opacity: 0.4 }}>
                / night
              </span>
            </div>
          </div>
          <p className="font-body text-xs" style={{ color: 'var(--color-dark)', opacity: 0.4 }}>
            Breakfast included
          </p>
        </div>

        <button
          onClick={() => setStep('dates')}
          className="w-full font-body text-sm tracking-[0.1em] uppercase py-4 rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-dark)' }}
        >
          Select Dates
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

function DateStep() {
  const { selectedRoom, checkIn, checkOut, setDates, setStep, getNights, getTotalPrice } = useBooking()
  const [localCheckIn, setLocalCheckIn] = useState(checkIn)
  const [localCheckOut, setLocalCheckOut] = useState(checkOut)
  const [error, setError] = useState('')

  const today = new Date().toISOString().split('T')[0]

  const handleContinue = () => {
    if (!localCheckIn || !localCheckOut) {
      setError('Please select both check-in and check-out dates.')
      return
    }
    if (new Date(localCheckOut) <= new Date(localCheckIn)) {
      setError('Check-out date must be after check-in date.')
      return
    }
    if (new Date(localCheckIn) < new Date(today)) {
      setError('Check-in date cannot be in the past.')
      return
    }
    setDates(localCheckIn, localCheckOut)
    setError('')
    setStep('guests')
  }

  const nights = localCheckIn && localCheckOut
    ? Math.max(0, Math.ceil((new Date(localCheckOut) - new Date(localCheckIn)) / (1000 * 60 * 60 * 24)))
    : 0

  const total = nights * (selectedRoom?.price || 0)

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <Calendar size={32} className="mx-auto mb-3" style={{ color: 'var(--color-accent-dark)' }} />
        <h3 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--color-dark)' }}>
          Select Your Dates
        </h3>
        <p className="font-body text-sm" style={{ color: 'var(--color-dark)', opacity: 0.5 }}>
          {selectedRoom?.name} — ${selectedRoom?.price}/night
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="font-body text-[11px] tracking-[0.15em] uppercase block mb-2" style={{ color: 'var(--color-accent-dark)' }}>
            Check-in
          </label>
          <input
            type="date"
            value={localCheckIn}
            min={today}
            onChange={(e) => { setLocalCheckIn(e.target.value); setError('') }}
            className="w-full font-body text-sm p-3.5 rounded-xl outline-none transition-all duration-200"
            style={{
              backgroundColor: 'rgba(12,35,64,0.03)',
              color: 'var(--color-dark)',
              border: '1px solid rgba(12,35,64,0.08)',
            }}
          />
        </div>
        <div>
          <label className="font-body text-[11px] tracking-[0.15em] uppercase block mb-2" style={{ color: 'var(--color-accent-dark)' }}>
            Check-out
          </label>
          <input
            type="date"
            value={localCheckOut}
            min={localCheckIn || today}
            onChange={(e) => { setLocalCheckOut(e.target.value); setError('') }}
            className="w-full font-body text-sm p-3.5 rounded-xl outline-none transition-all duration-200"
            style={{
              backgroundColor: 'rgba(12,35,64,0.03)',
              color: 'var(--color-dark)',
              border: '1px solid rgba(12,35,64,0.08)',
            }}
          />
        </div>
      </div>

      {error && (
        <p className="font-body text-sm text-red-600 mb-4 text-center">{error}</p>
      )}

      {nights > 0 && (
        <div className="p-5 rounded-xl mb-6" style={{ backgroundColor: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.12)' }}>
          <div className="flex justify-between items-center mb-2">
            <span className="font-body text-sm" style={{ color: 'var(--color-dark)', opacity: 0.6 }}>
              ${selectedRoom?.price} × {nights} night{nights > 1 ? 's' : ''}
            </span>
            <span className="font-display text-xl font-semibold" style={{ color: 'var(--color-dark)' }}>
              ${total}
            </span>
          </div>
          <p className="font-body text-xs" style={{ color: 'var(--color-accent-dark)' }}>
            Complimentary breakfast included
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => setStep('room')}
          className="font-body text-sm tracking-wider uppercase px-6 py-3.5 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100"
          style={{ color: 'var(--color-dark)', border: '1px solid rgba(12,35,64,0.15)' }}
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 font-body text-sm tracking-[0.1em] uppercase py-3.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-dark)' }}
        >
          Continue
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

function GuestInfoStep() {
  const { guestName, guestEmail, guestPhone, guests, specialRequests, selectedRoom, setGuestInfo, setGuests, setStep } = useBooking()
  const [localName, setLocalName] = useState(guestName)
  const [localEmail, setLocalEmail] = useState(guestEmail)
  const [localPhone, setLocalPhone] = useState(guestPhone)
  const [localGuests, setLocalGuests] = useState(guests)
  const [localRequests, setLocalRequests] = useState(specialRequests)
  const [error, setError] = useState('')

  const handleContinue = () => {
    if (!localName.trim()) { setError('Please enter your full name.'); return }
    if (!localEmail.trim() || !localEmail.includes('@')) { setError('Please enter a valid email address.'); return }
    if (!localPhone.trim()) { setError('Please enter your phone number.'); return }
    setGuestInfo({ guestName: localName, guestEmail: localEmail, guestPhone: localPhone, specialRequests: localRequests })
    setGuests(localGuests)
    setError('')
    setStep('summary')
  }

  const inputStyle = {
    backgroundColor: 'rgba(12,35,64,0.03)',
    color: 'var(--color-dark)',
    border: '1px solid rgba(12,35,64,0.08)',
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <Users size={32} className="mx-auto mb-3" style={{ color: 'var(--color-accent-dark)' }} />
        <h3 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--color-dark)' }}>
          Guest Details
        </h3>
        <p className="font-body text-sm" style={{ color: 'var(--color-dark)', opacity: 0.5 }}>
          Tell us who's checking in
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="font-body text-[11px] tracking-[0.15em] uppercase block mb-2" style={{ color: 'var(--color-accent-dark)' }}>
            Full Name *
          </label>
          <input
            type="text"
            value={localName}
            onChange={(e) => { setLocalName(e.target.value); setError('') }}
            placeholder="John Doe"
            className="w-full font-body text-sm p-3.5 rounded-xl outline-none"
            style={inputStyle}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-body text-[11px] tracking-[0.15em] uppercase block mb-2" style={{ color: 'var(--color-accent-dark)' }}>
              Email *
            </label>
            <input
              type="email"
              value={localEmail}
              onChange={(e) => { setLocalEmail(e.target.value); setError('') }}
              placeholder="you@example.com"
              className="w-full font-body text-sm p-3.5 rounded-xl outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="font-body text-[11px] tracking-[0.15em] uppercase block mb-2" style={{ color: 'var(--color-accent-dark)' }}>
              Phone *
            </label>
            <input
              type="tel"
              value={localPhone}
              onChange={(e) => { setLocalPhone(e.target.value); setError('') }}
              placeholder="+232 00 000 000"
              className="w-full font-body text-sm p-3.5 rounded-xl outline-none"
              style={inputStyle}
            />
          </div>
        </div>
        <div>
          <label className="font-body text-[11px] tracking-[0.15em] uppercase block mb-2" style={{ color: 'var(--color-accent-dark)' }}>
            Number of Guests
          </label>
          <select
            value={localGuests}
            onChange={(e) => setLocalGuests(Number(e.target.value))}
            className="w-full font-body text-sm p-3.5 rounded-xl outline-none cursor-pointer"
            style={inputStyle}
          >
            {Array.from({ length: selectedRoom?.maxGuests || 2 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-body text-[11px] tracking-[0.15em] uppercase block mb-2" style={{ color: 'var(--color-accent-dark)' }}>
            Special Requests
          </label>
          <textarea
            value={localRequests}
            onChange={(e) => setLocalRequests(e.target.value)}
            placeholder="Any special requirements..."
            rows={3}
            className="w-full font-body text-sm p-3.5 rounded-xl outline-none resize-none"
            style={inputStyle}
          />
        </div>
      </div>

      {error && (
        <p className="font-body text-sm text-red-600 mb-4 text-center">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => setStep('dates')}
          className="font-body text-sm tracking-wider uppercase px-6 py-3.5 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100"
          style={{ color: 'var(--color-dark)', border: '1px solid rgba(12,35,64,0.15)' }}
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 font-body text-sm tracking-[0.1em] uppercase py-3.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-dark)' }}
        >
          Review Booking
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

function SummaryStep() {
  const { selectedRoom, checkIn, checkOut, guests, guestName, guestEmail, guestPhone, specialRequests, getNights, getTotalPrice, setStep } = useBooking()

  const nights = getNights()
  const total = getTotalPrice()

  const formatDate = (str) => {
    if (!str) return ''
    return new Date(str + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-8">
        <Star size={32} className="mx-auto mb-3" style={{ color: 'var(--color-accent-dark)' }} />
        <h3 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--color-dark)' }}>
          Booking Summary
        </h3>
        <p className="font-body text-sm" style={{ color: 'var(--color-dark)', opacity: 0.5 }}>
          Please review your reservation details
        </p>
      </div>

      <div className="rounded-xl overflow-hidden mb-6" style={{ border: '1px solid rgba(12,35,64,0.08)' }}>
        <div className="flex gap-4 p-4" style={{ backgroundColor: 'rgba(12,35,64,0.02)' }}>
          <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img src={selectedRoom?.image} alt={selectedRoom?.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-body text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--color-accent-dark)' }}>
              {selectedRoom?.building}
            </p>
            <h4 className="font-display text-lg font-semibold" style={{ color: 'var(--color-dark)' }}>
              {selectedRoom?.name}
            </h4>
            <p className="font-body text-xs" style={{ color: 'var(--color-dark)', opacity: 0.5 }}>
              {selectedRoom?.bedType} · {selectedRoom?.size}
            </p>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex justify-between">
            <span className="font-body text-sm" style={{ color: 'var(--color-dark)', opacity: 0.6 }}>Check-in</span>
            <span className="font-body text-sm font-medium" style={{ color: 'var(--color-dark)' }}>{formatDate(checkIn)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-body text-sm" style={{ color: 'var(--color-dark)', opacity: 0.6 }}>Check-out</span>
            <span className="font-body text-sm font-medium" style={{ color: 'var(--color-dark)' }}>{formatDate(checkOut)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-body text-sm" style={{ color: 'var(--color-dark)', opacity: 0.6 }}>Duration</span>
            <span className="font-body text-sm font-medium" style={{ color: 'var(--color-dark)' }}>{nights} night{nights > 1 ? 's' : ''}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-body text-sm" style={{ color: 'var(--color-dark)', opacity: 0.6 }}>Guests</span>
            <span className="font-body text-sm font-medium" style={{ color: 'var(--color-dark)' }}>{guests}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-body text-sm" style={{ color: 'var(--color-dark)', opacity: 0.6 }}>Guest</span>
            <span className="font-body text-sm font-medium" style={{ color: 'var(--color-dark)' }}>{guestName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-body text-sm" style={{ color: 'var(--color-dark)', opacity: 0.6 }}>Email</span>
            <span className="font-body text-sm font-medium" style={{ color: 'var(--color-dark)' }}>{guestEmail}</span>
          </div>
          {specialRequests && (
            <div>
              <span className="font-body text-sm block mb-1" style={{ color: 'var(--color-dark)', opacity: 0.6 }}>Special Requests</span>
              <p className="font-body text-sm italic" style={{ color: 'var(--color-dark)', opacity: 0.8 }}>{specialRequests}</p>
            </div>
          )}
        </div>

        <div className="p-4" style={{ backgroundColor: 'rgba(200,169,110,0.06)', borderTop: '1px solid rgba(12,35,64,0.06)' }}>
          <div className="flex justify-between items-center mb-1">
            <span className="font-body text-sm" style={{ color: 'var(--color-dark)', opacity: 0.6 }}>
              ${selectedRoom?.price} × {nights} night{nights > 1 ? 's' : ''}
            </span>
            <span className="font-display text-2xl font-semibold" style={{ color: 'var(--color-dark)' }}>
              ${total}
            </span>
          </div>
          <p className="font-body text-xs" style={{ color: 'var(--color-accent-dark)' }}>
            Includes complimentary breakfast & Wi-Fi
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep('guests')}
          className="font-body text-sm tracking-wider uppercase px-6 py-3.5 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100"
          style={{ color: 'var(--color-dark)', border: '1px solid rgba(12,35,64,0.15)' }}
        >
          Back
        </button>
        <button
          onClick={() => setStep('payment')}
          className="flex-1 font-body text-sm tracking-[0.1em] uppercase py-3.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-dark)' }}
        >
          Choose Payment
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

function PaymentStep() {
  const { selectedRoom, getTotalPrice, getDepositAmount, getNights, depositPercentage, setPayment, confirmBooking, setStep, paymentOption } = useBooking()
  const [selected, setSelected] = useState(paymentOption)
  const total = getTotalPrice()
  const deposit = getDepositAmount()
  const nights = getNights()

  const handleConfirm = () => {
    if (!selected) return
    setPayment(selected)
    confirmBooking()
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <CreditCard size={32} className="mx-auto mb-3" style={{ color: 'var(--color-accent-dark)' }} />
        <h3 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--color-dark)' }}>
          How Would You Like to Pay?
        </h3>
        <p className="font-body text-sm" style={{ color: 'var(--color-dark)', opacity: 0.5 }}>
          {selectedRoom?.name} · {nights} night{nights > 1 ? 's' : ''} · ${total} total
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <button
          onClick={() => setSelected('now')}
          className="w-full text-left p-5 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.01]"
          style={{
            border: selected === 'now' ? '2px solid var(--color-accent)' : '2px solid rgba(12,35,64,0.08)',
            backgroundColor: selected === 'now' ? 'rgba(200,169,110,0.06)' : 'white',
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: selected === 'now' ? 'var(--color-accent)' : 'rgba(12,35,64,0.05)' }}
            >
              <CreditCard size={18} style={{ color: selected === 'now' ? 'var(--color-dark)' : 'var(--color-accent-dark)' }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-display text-lg font-semibold" style={{ color: 'var(--color-dark)' }}>
                  Reserve & Pay Now
                </h4>
                <span className="font-display text-xl font-semibold" style={{ color: 'var(--color-dark)' }}>
                  ${total}
                </span>
              </div>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-dark)', opacity: 0.55 }}>
                Pay the full amount now to secure your reservation. Free cancellation up to 48 hours before check-in.
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <Shield size={13} style={{ color: 'var(--color-accent-dark)' }} />
                <span className="font-body text-xs" style={{ color: 'var(--color-accent-dark)' }}>
                  Full refund if cancelled 48h+ before arrival
                </span>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelected('later')}
          className="w-full text-left p-5 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.01]"
          style={{
            border: selected === 'later' ? '2px solid var(--color-accent)' : '2px solid rgba(12,35,64,0.08)',
            backgroundColor: selected === 'later' ? 'rgba(200,169,110,0.06)' : 'white',
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: selected === 'later' ? 'var(--color-accent)' : 'rgba(12,35,64,0.05)' }}
            >
              <Clock size={18} style={{ color: selected === 'later' ? 'var(--color-dark)' : 'var(--color-accent-dark)' }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-display text-lg font-semibold" style={{ color: 'var(--color-dark)' }}>
                  Reserve & Pay Later
                </h4>
                <div className="text-right">
                  <span className="font-display text-xl font-semibold" style={{ color: 'var(--color-dark)' }}>
                    ${deposit}
                  </span>
                  <span className="font-body text-xs block" style={{ color: 'var(--color-dark)', opacity: 0.4 }}>
                    deposit now
                  </span>
                </div>
              </div>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-dark)', opacity: 0.55 }}>
                Pay a {depositPercentage}% non-refundable deposit (${deposit}) now to hold your room. The remaining ${total - deposit} is due at check-in.
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <Shield size={13} className="text-red-400" />
                <span className="font-body text-xs text-red-400">
                  Deposit of ${deposit} is non-refundable
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep('summary')}
          className="font-body text-sm tracking-wider uppercase px-6 py-3.5 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100"
          style={{ color: 'var(--color-dark)', border: '1px solid rgba(12,35,64,0.15)' }}
        >
          Back
        </button>
        <button
          onClick={handleConfirm}
          disabled={!selected}
          className="flex-1 font-body text-sm tracking-[0.1em] uppercase py-3.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-dark)' }}
        >
          {selected === 'now' ? `Pay $${total} Now` : selected === 'later' ? `Pay $${deposit} Deposit` : 'Select an Option'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

function ConfirmedStep() {
  const { selectedRoom, checkIn, checkOut, guestName, guestEmail, getNights, getTotalPrice, getDepositAmount, paymentOption, close } = useBooking()
  const ref = useRef(null)
  const total = getTotalPrice()
  const deposit = getDepositAmount()
  const nights = getNights()

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' })
    }
  }, [])

  const formatDate = (str) => {
    if (!str) return ''
    return new Date(str + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="max-w-md mx-auto text-center" ref={ref}>
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: 'rgba(34,197,94,0.1)' }}
      >
        <Check size={36} className="text-green-500" />
      </div>

      <h3 className="font-display text-3xl font-semibold mb-2" style={{ color: 'var(--color-dark)' }}>
        Reservation Confirmed!
      </h3>
      <p className="font-body text-sm mb-8" style={{ color: 'var(--color-dark)', opacity: 0.55 }}>
        A confirmation email has been sent to {guestEmail}
      </p>

      <div className="p-5 rounded-xl mb-6 text-left" style={{ backgroundColor: 'rgba(12,35,64,0.03)', border: '1px solid rgba(12,35,64,0.06)' }}>
        <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: '1px solid rgba(12,35,64,0.06)' }}>
          <div className="w-14 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <img src={selectedRoom?.image} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-display text-base font-semibold" style={{ color: 'var(--color-dark)' }}>{selectedRoom?.name}</h4>
            <p className="font-body text-xs" style={{ color: 'var(--color-dark)', opacity: 0.5 }}>{selectedRoom?.building}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-body" style={{ color: 'var(--color-dark)', opacity: 0.5 }}>Guest</span>
            <span className="font-body font-medium" style={{ color: 'var(--color-dark)' }}>{guestName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-body" style={{ color: 'var(--color-dark)', opacity: 0.5 }}>Check-in</span>
            <span className="font-body font-medium" style={{ color: 'var(--color-dark)' }}>{formatDate(checkIn)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-body" style={{ color: 'var(--color-dark)', opacity: 0.5 }}>Check-out</span>
            <span className="font-body font-medium" style={{ color: 'var(--color-dark)' }}>{formatDate(checkOut)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-body" style={{ color: 'var(--color-dark)', opacity: 0.5 }}>Duration</span>
            <span className="font-body font-medium" style={{ color: 'var(--color-dark)' }}>{nights} night{nights > 1 ? 's' : ''}</span>
          </div>
          <div className="flex justify-between pt-2" style={{ borderTop: '1px solid rgba(12,35,64,0.06)' }}>
            <span className="font-body" style={{ color: 'var(--color-dark)', opacity: 0.5 }}>Total</span>
            <span className="font-display text-lg font-semibold" style={{ color: 'var(--color-dark)' }}>${total}</span>
          </div>
          {paymentOption === 'later' && (
            <>
              <div className="flex justify-between">
                <span className="font-body" style={{ color: 'var(--color-dark)', opacity: 0.5 }}>Deposit paid</span>
                <span className="font-body font-medium text-green-600">${deposit}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body" style={{ color: 'var(--color-dark)', opacity: 0.5 }}>Due at check-in</span>
                <span className="font-body font-medium" style={{ color: 'var(--color-accent-dark)' }}>${total - deposit}</span>
              </div>
            </>
          )}
          {paymentOption === 'now' && (
            <div className="flex justify-between">
              <span className="font-body" style={{ color: 'var(--color-dark)', opacity: 0.5 }}>Status</span>
              <span className="font-body font-medium text-green-600">Fully Paid</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={close}
        className="w-full font-body text-sm tracking-[0.1em] uppercase py-4 rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        style={{ backgroundColor: 'var(--color-dark)', color: 'white' }}
      >
        Done
      </button>
    </div>
  )
}

export default function BookingModal() {
  const { step, close } = useBooking()
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (step) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo(contentRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.1 })
    }
    return () => { document.body.style.overflow = '' }
  }, [step])

  if (!step) return null

  const stepIndex = { room: 0, dates: 1, guests: 2, summary: 3, payment: 4, confirmed: 5 }
  const showSteps = step !== 'confirmed'

  return (
    <div className="fixed inset-0 z-[100]" style={{ height: '100dvh' }}>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
      />
      <div
        className="absolute inset-0 overflow-y-auto overscroll-contain"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-6">
          <div
            ref={contentRef}
            className="relative w-full max-w-3xl rounded-2xl p-5 sm:p-7 md:p-8 my-2 sm:my-6"
            style={{
              backgroundColor: 'var(--color-offwhite)',
              boxShadow: '0 25px 80px rgba(12,35,64,0.25)',
            }}
          >
            <button
              onClick={close}
              aria-label="Close booking"
              className="sticky top-0 ml-auto mb-2 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-black/5 z-10"
              style={{ color: 'var(--color-dark)', backgroundColor: 'rgba(236,236,236,0.7)' }}
            >
              <X size={20} />
            </button>

            {showSteps && (
              <StepIndicator
                current={stepIndex[step] || 0}
                steps={['Room', 'Dates', 'Details', 'Review', 'Payment']}
              />
            )}

            {step === 'room' && <RoomDetailStep />}
            {step === 'dates' && <DateStep />}
            {step === 'guests' && <GuestInfoStep />}
            {step === 'summary' && <SummaryStep />}
            {step === 'payment' && <PaymentStep />}
            {step === 'confirmed' && <ConfirmedStep />}
          </div>
        </div>
      </div>
    </div>
  )
}
