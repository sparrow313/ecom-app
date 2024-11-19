'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Minus, Plus } from 'lucide-react'
import { useCart } from '@/store/useCart'

export default function CartPage() {
  const [promoCode, setPromoCode] = useState('')
  const { items, removeItem, updateQuantity, subtotal, shipping, tax, total } = useCart()

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-black">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4 text-black">Your cart is empty</h2>
            <p className="text-gray-700 mb-8">Add some items to your cart to continue shopping.</p>
            <Link
              href="/"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex items-start space-x-4 p-6 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-black">{item.name}</h3>
                          <p className="text-gray-700 text-sm">
                            Size: {item.size} | Color: {item.color}
                          </p>
                        </div>
                        <p className="text-lg font-semibold text-black">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1 rounded-md hover:bg-gray-700 text-black"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center text-black">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 rounded-md hover:bg-gray-700 text-black"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 text-black">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-semibold text-black">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-700">Shipping</span>
                    <span className="font-semibold text-black">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-700">Tax</span>
                    <span className="font-semibold text-black">${tax.toFixed(2)}</span>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="font-semibold text-black">Total</span>
                      <span className="font-semibold text-black">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Promo Code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-gray-700 hover:text-black">
                        Apply
                      </button>
                    </div>
                  </div>

                  <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300">
                    Proceed to Checkout
                  </button>

                  <Link
                    href="/"
                    className="block text-center text-gray-700 hover:text-black"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
