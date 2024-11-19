import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
  shipping: number
  tax: number
  total: number
}

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  return { subtotal, shipping, tax, total }
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.id === item.id && i.size === item.size && i.color === item.color
          )

          const newItems = existingItem
            ? state.items.map((i) =>
                i.id === item.id && i.size === item.size && i.color === item.color
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              )
            : [...state.items, item]

          return {
            items: newItems,
            ...calculateTotals(newItems)
          }
        })
      },
      removeItem: (itemId) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== itemId)
          return {
            items: newItems,
            ...calculateTotals(newItems)
          }
        }),
      updateQuantity: (itemId, quantity) =>
        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          )
          return {
            items: newItems,
            ...calculateTotals(newItems)
          }
        }),
      clearCart: () =>
        set({
          items: [],
          subtotal: 0,
          shipping: 0,
          tax: 0,
          total: 0
        }),
      ...calculateTotals([]) // Initialize with empty cart
    }),
    {
      name: 'cart-storage',
    }
  )
)
