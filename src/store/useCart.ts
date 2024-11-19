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

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.id === item.id && i.size === item.size && i.color === item.color
          )

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.size === item.size && i.color === item.color
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }

          return { items: [...state.items, item] }
        })
      },
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      get subtotal() {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      get shipping() {
        const subtotal = get().subtotal
        return subtotal > 100 ? 0 : 10 // Free shipping over $100
      },
      get tax() {
        return get().subtotal * 0.1 // 10% tax
      },
      get total() {
        return get().subtotal + get().shipping + get().tax
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
