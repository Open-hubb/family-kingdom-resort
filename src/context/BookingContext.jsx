import { createContext, useContext, useReducer, useCallback } from 'react'

const BookingContext = createContext(null)

const ROOMS = [
  {
    id: 'budget',
    name: 'Budget Room',
    building: '4 Seasons Block',
    price: 80,
    image: '/images/budget-room/1.jpeg',
    gallery: ['/images/budget-room/1.jpeg', '/images/budget-room/2.jpeg', '/images/budget-room/3.jpeg'],
    features: ['Air Conditioning', 'Smart TV', 'Hot & Cold Shower'],
    description: 'A comfortable, no-frills room in the 4 Seasons Block. Ideal for solo travellers and short stays with all the essentials you need.',
    maxGuests: 2,
    bedType: 'Double Bed',
    size: '18 m²',
  },
  {
    id: 'standard-empire',
    name: 'Standard Single',
    building: 'Empire Building',
    price: 90,
    image: '/images/standard-empire/2.jpeg',
    gallery: ['/images/standard-empire/2.jpeg', '/images/standard-empire/1.jpeg'],
    features: ['Air Conditioning', 'Smart TV', 'Hot & Cold Shower'],
    description: 'A well-appointed single room in the Empire Building with modern amenities and a warm, inviting atmosphere.',
    maxGuests: 2,
    bedType: 'Double Bed',
    size: '22 m²',
  },
  {
    id: 'standard-mansion',
    name: 'Standard Room',
    building: 'Mansion Building',
    price: 100,
    image: '/images/standard-mansion/1.jpeg',
    gallery: ['/images/standard-mansion/1.jpeg', '/images/standard-mansion/2.jpeg'],
    features: ['Air Conditioning', 'Smart TV', 'Hot & Cold Shower', 'Wi-Fi 24/7', 'Kitchenette'],
    description: 'Spacious room in the Mansion Building featuring a kitchenette and 24/7 Wi-Fi. Perfect for extended stays.',
    maxGuests: 3,
    bedType: 'Queen Bed',
    size: '28 m²',
  },
  {
    id: 'plaza-deluxe',
    name: 'Plaza Deluxe',
    building: 'Deluxe Room',
    price: 140,
    image: '/images/plaza-deluxe/2.jpeg',
    gallery: ['/images/plaza-deluxe/2.jpeg', '/images/plaza-deluxe/1.jpeg'],
    features: ['Air Conditioning', 'Smart TV', 'Hot & Cold Shower', 'Wi-Fi 24/7'],
    description: 'A deluxe room with premium furnishings, offering comfort and style with round-the-clock Wi-Fi connectivity.',
    maxGuests: 2,
    bedType: 'King Bed',
    size: '30 m²',
  },
  {
    id: 'deluxe-single',
    name: 'Deluxe Single',
    building: 'Princess — Palace Building',
    price: 150,
    image: '/images/deluxe-single/1.jpeg',
    gallery: ['/images/deluxe-single/1.jpeg', '/images/deluxe-single/2.jpeg', '/images/deluxe-single/3.jpeg'],
    features: ['Air Conditioning', 'Smart TV', 'Hot & Cold Shower', 'Water Kettle', 'Electricity 24/7'],
    description: 'An elegant room in the Palace Building with ambient LED lighting, 24/7 electricity, and premium amenities.',
    maxGuests: 2,
    bedType: 'King Bed',
    size: '32 m²',
  },
  {
    id: 'suite',
    name: 'Suite',
    building: 'Queen — Palace Building',
    price: 175,
    image: '/images/standard-suite-empire/1.jpeg',
    gallery: ['/images/standard-suite-empire/1.jpeg', '/images/standard-suite-empire/2.jpeg'],
    features: ['Air Conditioning', 'Smart TV', 'Hot & Cold Shower', 'Water Kettle', 'Electricity 24/7', 'Wi-Fi 24/7', 'Kitchenette'],
    description: 'Our finest accommodation in the Palace Building. A full suite with separate living area, kitchenette, and every premium amenity.',
    maxGuests: 4,
    bedType: 'King Bed + Sofa Bed',
    size: '45 m²',
  },
]

const DEPOSIT_PERCENTAGE = 30

const initialState = {
  step: null, // null = closed, 'room' | 'dates' | 'guests' | 'summary' | 'payment'
  selectedRoom: null,
  checkIn: '',
  checkOut: '',
  guests: 1,
  guestName: '',
  guestEmail: '',
  guestPhone: '',
  specialRequests: '',
  paymentOption: null, // 'now' | 'later'
  bookingConfirmed: false,
}

function bookingReducer(state, action) {
  switch (action.type) {
    case 'SELECT_ROOM':
      return { ...state, step: 'room', selectedRoom: action.payload }
    case 'SET_STEP':
      return { ...state, step: action.payload }
    case 'SET_DATES':
      return { ...state, checkIn: action.payload.checkIn, checkOut: action.payload.checkOut }
    case 'SET_GUESTS':
      return { ...state, guests: action.payload }
    case 'SET_GUEST_INFO':
      return { ...state, ...action.payload }
    case 'SET_PAYMENT':
      return { ...state, paymentOption: action.payload }
    case 'CONFIRM_BOOKING':
      return { ...state, bookingConfirmed: true, step: 'confirmed' }
    case 'CLOSE':
      return { ...initialState }
    default:
      return state
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  const selectRoom = useCallback((roomId) => {
    const room = ROOMS.find(r => r.id === roomId)
    if (room) dispatch({ type: 'SELECT_ROOM', payload: room })
  }, [])

  const setStep = useCallback((step) => {
    dispatch({ type: 'SET_STEP', payload: step })
  }, [])

  const setDates = useCallback((checkIn, checkOut) => {
    dispatch({ type: 'SET_DATES', payload: { checkIn, checkOut } })
  }, [])

  const setGuests = useCallback((guests) => {
    dispatch({ type: 'SET_GUESTS', payload: guests })
  }, [])

  const setGuestInfo = useCallback((info) => {
    dispatch({ type: 'SET_GUEST_INFO', payload: info })
  }, [])

  const setPayment = useCallback((option) => {
    dispatch({ type: 'SET_PAYMENT', payload: option })
  }, [])

  const confirmBooking = useCallback(() => {
    dispatch({ type: 'CONFIRM_BOOKING' })
  }, [])

  const close = useCallback(() => {
    dispatch({ type: 'CLOSE' })
  }, [])

  const getNights = useCallback(() => {
    if (!state.checkIn || !state.checkOut) return 0
    const diff = new Date(state.checkOut) - new Date(state.checkIn)
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }, [state.checkIn, state.checkOut])

  const getTotalPrice = useCallback(() => {
    if (!state.selectedRoom) return 0
    return state.selectedRoom.price * getNights()
  }, [state.selectedRoom, getNights])

  const getDepositAmount = useCallback(() => {
    return Math.ceil(getTotalPrice() * (DEPOSIT_PERCENTAGE / 100))
  }, [getTotalPrice])

  return (
    <BookingContext.Provider value={{
      ...state,
      rooms: ROOMS,
      depositPercentage: DEPOSIT_PERCENTAGE,
      selectRoom,
      setStep,
      setDates,
      setGuests,
      setGuestInfo,
      setPayment,
      confirmBooking,
      close,
      getNights,
      getTotalPrice,
      getDepositAmount,
    }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
