"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, User, ChevronDown, Eye } from 'lucide-react'
import { useCart } from '@/store/useCart'
import { toast } from 'react-hot-toast'
import QuickViewModal from '@/components/QuickViewModal'
import { Product } from '@/types'

// Product variations
const colorOptions = {
  'White': '#FFFFFF',
  'Black': '#000000',
  'Navy': '#000080',
  'Gray': '#424242',
  'Brown': '#8B4513',
  'Beige': '#F5F5DC',
}

// Sample product data
const products: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['White', 'Black', 'Navy', 'Gray'],
    description: 'Premium cotton basic tee, perfect for everyday wear.'
  },
  {
    id: '2',
    name: 'Denim Jacket',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80',
    availableSizes: ['S', 'M', 'L'],
    availableColors: ['Blue', 'Black'],
    description: 'Classic denim jacket with a modern fit.'
  },
  {
    id: '3',
    name: 'Leather Boots',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&q=80',
    availableSizes: ['40', '41', '42', '43', '44'],
    availableColors: ['Brown', 'Black'],
    description: 'Handcrafted leather boots for lasting comfort.'
  },
  {
    id: '4',
    name: 'Summer Dress',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80',
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: ['Beige', 'White'],
    description: 'Light and breezy summer dress for any occasion.'
  }
]

export default function Homepage() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { addItem, items } = useCart()
  const [selectedVariants, setSelectedVariants] = useState<Record<string, { size: string; color: string }>>({})
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu)
  }

  const handleVariantSelect = (productId: string, type: 'size' | 'color', value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId] || { size: '', color: '' },
        [type]: value
      }
    }))
  }

  const handleAddToCart = (product: Product) => {
    const variants = selectedVariants[product.id] || { size: product.availableSizes[0], color: product.availableColors[0] }
    
    if (!variants.size || !variants.color) {
      toast.error('Please select size and color')
      return
    }

    addItem({
      ...product,
      size: variants.size,
      color: variants.color,
      quantity: 1
    })
    toast.success(`${product.name} (${variants.size}, ${variants.color}) added to cart!`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-black text-2xl font-bold">YourBrand</Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 relative">
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('women')}
                  className="flex items-center text-gray-600 hover:text-gray-900 py-4"
                  suppressHydrationWarning
                >
                  Women <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === 'women' && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-4 w-48 z-50">
                    <ul className="space-y-2">
                      <li><Link href="/women/dresses" className="text-gray-600 hover:text-gray-900">Dresses</Link></li>
                      <li><Link href="/women/tops" className="text-gray-600 hover:text-gray-900">Tops</Link></li>
                      <li><Link href="/women/bottoms" className="text-gray-600 hover:text-gray-900">Bottoms</Link></li>
                      <li><Link href="/women/accessories" className="text-gray-600 hover:text-gray-900">Accessories</Link></li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('men')}
                  className="flex items-center text-gray-600 hover:text-gray-900 py-4"
                  suppressHydrationWarning
                >
                  Men <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === 'men' && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-4 w-48 z-50">
                    <ul className="space-y-2">
                      <li><Link href="/men/shirts" className="text-gray-600 hover:text-gray-900">Shirts</Link></li>
                      <li><Link href="/men/pants" className="text-gray-600 hover:text-gray-900">Pants</Link></li>
                      <li><Link href="/men/outerwear" className="text-gray-600 hover:text-gray-900">Outerwear</Link></li>
                      <li><Link href="/men/accessories" className="text-gray-600 hover:text-gray-900">Accessories</Link></li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('accessories')}
                  className="flex items-center text-gray-600 hover:text-gray-900 py-4"
                  suppressHydrationWarning
                >
                  Accessories <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === 'accessories' && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-4 w-48 z-50">
                    <ul className="space-y-2">
                      <li><Link href="/accessories/bags" className="text-gray-600 hover:text-gray-900">Bags</Link></li>
                      <li><Link href="/accessories/jewelry" className="text-gray-600 hover:text-gray-900">Jewelry</Link></li>
                      <li><Link href="/accessories/shoes" className="text-gray-600 hover:text-gray-900">Shoes</Link></li>
                      <li><Link href="/accessories/watches" className="text-gray-600 hover:text-gray-900">Watches</Link></li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('sale')}
                  className="flex items-center text-gray-600 hover:text-gray-900 py-4"
                  suppressHydrationWarning
                >
                  Sale <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === 'sale' && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-4 w-48 z-50">
                    <ul className="space-y-2">
                      <li><Link href="/sale/clearance" className="text-gray-600 hover:text-gray-900">Clearance</Link></li>
                      <li><Link href="/sale/last-chance" className="text-gray-600 hover:text-gray-900">Last Chance</Link></li>
                      <li><Link href="/sale/special-offers" className="text-gray-600 hover:text-gray-900">Special Offers</Link></li>
                    </ul>
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/cart"
                className="relative p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>
              <button className="text-gray-700 hover:text-black" suppressHydrationWarning>
                <User className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile hamburger button */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:text-black"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4">
              <button 
                className="absolute top-4 right-4 text-gray-700 hover:text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <nav className="mt-8">
                <div className="space-y-4">
                  {/* Mobile Icons */}
                  <div className="space-y-4 pb-4 border-b border-gray-200">
                    <div className="flex justify-around">
                      <Link
                        href="/cart"
                        className="relative p-2 hover:bg-gray-700 rounded-full transition-colors"
                      >
                        <ShoppingCart className="h-6 w-6" />
                        {items.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {items.length}
                          </span>
                        )}
                      </Link>
                      <button className="text-black hover:text-gray-700">
                        <User className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  {/* Women */}
                  <div>
                    <button 
                      onClick={() => toggleDropdown('women')}
                      className="flex items-center justify-between w-full text-gray-700 hover:text-black py-2"
                      suppressHydrationWarning
                    >
                      Women <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === 'women' && (
                      <div className="pl-4 pt-2 space-y-2">
                        <Link href="/women/dresses" className="block text-gray-700 hover:text-black">Dresses</Link>
                        <Link href="/women/tops" className="block text-gray-700 hover:text-black">Tops</Link>
                        <Link href="/women/bottoms" className="block text-gray-700 hover:text-black">Bottoms</Link>
                        <Link href="/women/accessories" className="block text-gray-700 hover:text-black">Accessories</Link>
                      </div>
                    )}
                  </div>

                  {/* Men */}
                  <div>
                    <button 
                      onClick={() => toggleDropdown('men')}
                      className="flex items-center justify-between w-full text-gray-700 hover:text-black py-2"
                      suppressHydrationWarning
                    >
                      Men <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === 'men' && (
                      <div className="pl-4 pt-2 space-y-2">
                        <Link href="/men/shirts" className="block text-gray-700 hover:text-black">Shirts</Link>
                        <Link href="/men/pants" className="block text-gray-700 hover:text-black">Pants</Link>
                        <Link href="/men/outerwear" className="block text-gray-700 hover:text-black">Outerwear</Link>
                        <Link href="/men/accessories" className="block text-gray-700 hover:text-black">Accessories</Link>
                      </div>
                    )}
                  </div>

                  {/* Accessories */}
                  <div>
                    <button 
                      onClick={() => toggleDropdown('accessories')}
                      className="flex items-center justify-between w-full text-gray-700 hover:text-black py-2"
                      suppressHydrationWarning
                    >
                      Accessories <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === 'accessories' && (
                      <div className="pl-4 pt-2 space-y-2">
                        <Link href="/accessories/bags" className="block text-gray-700 hover:text-black">Bags</Link>
                        <Link href="/accessories/jewelry" className="block text-gray-700 hover:text-black">Jewelry</Link>
                        <Link href="/accessories/shoes" className="block text-gray-700 hover:text-black">Shoes</Link>
                        <Link href="/accessories/watches" className="block text-gray-700 hover:text-black">Watches</Link>
                      </div>
                    )}
                  </div>

                  {/* Sale */}
                  <div>
                    <button 
                      onClick={() => toggleDropdown('sale')}
                      className="flex items-center justify-between w-full text-gray-700 hover:text-black py-2"
                      suppressHydrationWarning
                    >
                      Sale <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === 'sale' && (
                      <div className="pl-4 pt-2 space-y-2">
                        <Link href="/sale/clearance" className="block text-gray-700 hover:text-black">Clearance</Link>
                        <Link href="/sale/last-chance" className="block text-gray-700 hover:text-black">Last Chance</Link>
                        <Link href="/sale/special-offers" className="block text-gray-700 hover:text-black">Special Offers</Link>
                      </div>
                    )}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Permanent Search Bar */}
      <div className="fixed top-16 left-0 right-0 bg-white shadow-sm z-40 p-4">
        <div className="container mx-auto max-w-4xl">
          <form className="relative" suppressHydrationWarning>
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-3 text-black border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              suppressHydrationWarning
            />
          </form>
        </div>
      </div>

      {/* Add margin-top to account for fixed header and search bar */}
      <div className="pt-32">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80"
            alt="Hero Image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">Discover Your Style</h1>
              <p className="text-xl md:text-2xl mb-8 text-black">Explore our curated collection of fashion essentials</p>
              <Link href="/shop" className="bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
                Shop Now
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          {/* Featured Categories */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-black">Featured Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              {[1, 2, 3, 4].map((category) => (
                <div key={category} className="relative h-64 w-full max-w-sm rounded-lg overflow-hidden group">
                  <Image 
                    src={[
                      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
                      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
                      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=80",
                      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&q=80"
                    ][category - 1]} 
                    alt={`Category ${category}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold ">
                      {[
                        "Women's Fashion",
                        "Men's Collection",
                        "Accessories",
                        "Footwear"
                      ][category - 1]}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <style jsx global>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            
            .animate-scroll {
              animation: scroll 20s linear infinite;
            }
            
            .banner-container:hover .animate-scroll {
              animation-play-state: paused;
            }
          `}</style>

          {/* Video Banner */}
          <section className="mb-12">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/pYFM1r3spVU?autoplay=1&mute=1&controls=0&loop=1&playlist=pYFM1r3spVU&showinfo=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full object-cover"
                style={{ border: 'none' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center pointer-events-none">
                <div className="text-center text-white">
                  <h2 className="text-4xl font-bold mb-4 text-black">New Collection</h2>
                  <p className="text-xl mb-8 text-black">Explore our latest arrivals</p>
                  <Link href="/new-arrivals" className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 pointer-events-auto">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Scrolling Banner */}
          <section className="mb-12 overflow-hidden banner-container">
            <h2 className="text-3xl font-bold mb-8 text-left pl-4 text-red-700 ">Flash Deals</h2>
            <div className="relative flex w-[200%]">
              <div className="flex animate-scroll">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex-shrink-0 w-64 mx-4 relative group">
                    <Image 
                      src={[
                        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&q=80",
                        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80",
                        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80",
                        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80",
                        "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=500&q=80"
                      ][item - 1]} 
                      alt={`Banner ${item}`} 
                      width={256} 
                      height={100}
                      className="object-cover rounded-lg hover:scale-105 transition-transform duration-300 h-40" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 rounded-lg opacity-100 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-semibold ">Limited Time Offer</p>
                      <div className="flex items-center gap-2">
                        <span className="text-red-500 font-bold text-xl ">$99.99</span>
                        <span className="text-gray-300 line-through text-sm ">$199.99</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex animate-scroll">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex-shrink-0 w-64 mx-4 relative group">
                    <Image 
                      src={[
                        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&q=80",
                        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80",
                        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80",
                        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80",
                        "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=500&q=80"
                      ][item - 1]} 
                      alt={`Banner ${item}`} 
                      width={256} 
                      height={100}
                      className="object-cover rounded-lg hover:scale-105 transition-transform duration-300 h-40" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 rounded-lg opacity-100 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-semibold ">Limited Time Offer</p>
                      <div className="flex items-center gap-2">
                        <span className="text-red-500 font-bold text-xl ">$99.99</span>
                        <span className="text-gray-300 line-through text-sm ">$199.99</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-black">Featured Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="relative h-64 group">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="bg-white text-black px-4 py-2 rounded-lg font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                        >
                          <Eye className="h-4 w-4" />
                          Quick View
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col h-[420px]">
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-black">{product.name}</h3>
                        <p className="text-gray-700 mb-2 ">${product.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-700 mb-4  line-clamp-2">{product.description}</p>
                      
                        {/* Size Selection */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2 ">Size</label>
                          <div className="flex flex-wrap gap-2">
                            {product.availableSizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => handleVariantSelect(product.id, 'size', size)}
                                className={`px-3 py-1 text-sm rounded-md border ${
                                  selectedVariants[product.id]?.size === size
                                    ? 'border-black bg-black text-white'
                                    : 'border-gray-700 hover:border-gray-800 '
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Color Selection */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2 ">Color</label>
                          <div className="flex flex-wrap gap-2">
                            {product.availableColors.map((color) => (
                              <button
                                key={color}
                                onClick={() => handleVariantSelect(product.id, 'color', color)}
                                className={`w-8 h-8 rounded-full border-2 ${
                                  selectedVariants[product.id]?.color === color
                                    ? 'ring-2 ring-black ring-offset-2'
                                    : 'border-gray-700 hover:border-gray-800'
                                }`}
                                style={{ backgroundColor: colorOptions[color as keyof typeof colorOptions] }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 mt-auto"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Help</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white">Customer Service</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Track Order</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Return & Exchanges</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Shipping</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white">Shop</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">About</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Blog</Link></li>
                </ul>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
                <p className="text-gray-400 mb-4 max-w-md ">Subscribe to our newsletter for the latest updates and offers.</p>
                <form className="flex flex-col sm:flex-row gap-2 sm:gap-0 max-w-md" suppressHydrationWarning>
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="flex-grow px-4 py-2 rounded-lg sm:rounded-r-none border border-gray-300 focus:outline-none focus:border-gray-500 text-black"
                    suppressHydrationWarning
                  />
                  <button 
                    type="submit" 
                    className="bg-white px-6 py-2 rounded-lg sm:rounded-l-none border border-gray-300 font-semibold hover:bg-gray-100 transition duration-300 text-black"
                    suppressHydrationWarning
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </footer>
        </main>
      </div>
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          colorOptions={colorOptions}
        />
      )}
    </div>
  )
}