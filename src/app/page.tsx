"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, ShoppingCart, User, ChevronDown } from 'lucide-react'

export default function Homepage() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className=" text-black text-2xl font-bold">YourBrand</Link>
            <nav className="hidden md:flex items-center space-x-8 relative">
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('women')}
                  className="flex items-center text-gray-600 hover:text-gray-900 py-4"
                >
                  Women <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === 'women' && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-4 w-48">
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
                >
                  Men <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === 'men' && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-4 w-48">
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
                >
                  Accessories <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === 'accessories' && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-4 w-48">
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
                >
                  Sale <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === 'sale' && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-4 w-48">
                    <ul className="space-y-2">
                      <li><Link href="/sale/clearance" className="text-gray-600 hover:text-gray-900">Clearance</Link></li>
                      <li><Link href="/sale/last-chance" className="text-gray-600 hover:text-gray-900">Last Chance</Link></li>
                      <li><Link href="/sale/special-offers" className="text-gray-600 hover:text-gray-900">Special Offers</Link></li>
                    </ul>
                  </div>
                )}
              </div>
            </nav>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition duration-200"
              >
                <Search className="h-6 w-6" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition duration-200">
                <ShoppingCart className="h-6 w-6" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition duration-200">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed top-16 left-0 right-0 bg-white shadow-lg z-50 p-4">
          <div className="container mx-auto max-w-4xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <div className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add margin-top to account for fixed header */}
      <div className="pt-16">
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Discover Your Style</h1>
              <p className="text-xl md:text-2xl mb-8">Explore our curated collection of fashion essentials</p>
              <Link href="/shop" className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
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
                    <h3 className="text-white text-2xl font-bold">
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
                  <h2 className="text-4xl font-bold mb-4">New Collection</h2>
                  <p className="text-xl mb-8">Explore our latest arrivals</p>
                  <Link href="/new-arrivals" className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 pointer-events-auto">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Scrolling Banner */}
          <section className="mb-12 overflow-hidden banner-container">
            <h2 className="text-3xl font-bold mb-8 text-left pl-4 text-red-700">Flash Deals</h2>
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
                      <p className="text-white font-semibold">Limited Time Offer</p>
                      <div className="flex items-center gap-2">
                        <span className="text-red-500 font-bold text-xl">$99.99</span>
                        <span className="text-gray-300 line-through text-sm">$199.99</span>
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
                      <p className="text-white font-semibold">Limited Time Offer</p>
                      <div className="flex items-center gap-2">
                        <span className="text-red-500 font-bold text-xl">$99.99</span>
                        <span className="text-gray-300 line-through text-sm">$199.99</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-black">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((product) => (
                <div key={product} className="border rounded-lg overflow-hidden flex flex-col">
                  <div className="relative h-[300px] w-full flex items-center justify-center">
                    <Image 
                      src={[
                        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
                        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",
                        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80",
                        "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=500&q=80"
                      ][product - 1]} 
                      alt={`Product ${product}`} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold mb-2">Product {product}</h3>
                    <p className="text-gray-600 mb-4">$99.99</p>
                    <div className="mt-auto">
                      <button className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition duration-300">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About Us</h3>
                <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">FAQs</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Shipping & Returns</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white">Shop</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">About</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
                <form className="flex">
                  <input type="email" placeholder="Your email" className="flex-grow px-4 py-2 rounded-l-lg" />
                  <button type="submit" className="bg-white text-gray-800 px-4 py-2 rounded-r-lg font-semibold hover:bg-gray-100 transition duration-300">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}