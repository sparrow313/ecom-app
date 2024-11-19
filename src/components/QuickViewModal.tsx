'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { useCart } from '@/store/useCart'
import { toast } from 'react-hot-toast'
import { Product } from '@/types'

interface QuickViewModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  colorOptions: Record<string, string>
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  colorOptions,
}: QuickViewModalProps) {
  const { addItem } = useCart()
  const [selectedVariants, setSelectedVariants] = useState({
    size: product.availableSizes[0],
    color: product.availableColors[0],
  })

  const handleVariantSelect = (type: 'size' | 'color', value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const handleAddToCart = () => {
    addItem({
      ...product,
      size: selectedVariants.size,
      color: selectedVariants.color,
      quantity: 1
    })
    toast.success(`${product.name} (${selectedVariants.size}, ${selectedVariants.color}) added to cart!`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg max-w-4xl w-full mx-auto shadow-xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-700 hover:text-black"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="relative h-96">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => handleVariantSelect('size', size)}
                      className={`px-4 py-2 text-sm rounded-md border ${
                        selectedVariants.size === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-700 hover:border-gray-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.availableColors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => handleVariantSelect('color', color)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedVariants.color === color
                          ? 'ring-2 ring-black ring-offset-2'
                          : 'border-gray-700 hover:border-gray-800'
                      }`}
                      style={{ backgroundColor: colorOptions[color] }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
