"use client";

import { useState, useEffect } from 'react'
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from 'next/navigation';

// ask the user for their address first then ask for products then direct to dashboard map page. The products page is the same one if the user wants to update their preferences later.
interface Product {
  id: number
  name: string
  price: number
  image: string
}
// products from rite aid
const products: Product[] = [

  { id: 1, name: "Crystal Geyser Natural Alpine Spring Water Bottle (1 gal)", price: 1.99, image: "/images/water.png"},
  { id: 2, name: "Campbell's Canned Soup (Chicken Noodle)", price: 3.50, image: "/images/campbellsoup.jpeg"},
  { id: 3, name: "Jif Peanut Butter", price: 2.89, image: "/images/jif.webp"},
  { id: 4, name: "Kraft Original Macaroni & Cheese Cups Easy Microwavable Dinner (4 ct)", price: 5.17, image: "/images/kraft.webp"},
  { id: 5, name: "Nature Valley Crunchy Granola Bars, Oats 'n Honey, 12 Bars (6 Pouches)", price: 4.19, image: "/images/bars.jpg"},
  { id: 6, name: "Duracell Coppertop AA Batteries (20 ct)", price: 17.76, image: "/images/aabattery.jpg"},
  { id: 7, name: "Energizer MAX D Batteries (8-Pack)", price: 14.52, image: "/images/dbattery.png"},
  { id: 8, name: "Purell Advanced Refreshing Gel Hand Sanitizer (4-pack)", price: 34.99, image: "/images/handsanditizer.jpeg"},
  { id: 9, name: "Scott 1-Ply Toilet Paper 1000 Sheets per Roll (18 ct)", price: 24.59, image: "/images/toiletpaper.png"},
  { id: 10, name: "Johnson & Johnson All-Purpose First Aid Kit", price: 18.36, image: "/images/firstaidkit.webp"},
  { id: 11, name: "Neosporin Antibiotic Ointment", price: 6.39, image: "/images/neosporin.webp"},
  { id: 12, name: "Tampax Pearl Light Absorbency Unscented Tampons (36 ct)", price: 14.49, image: "/images/tampax.jpeg"},
  
]

export default function Home() {

  const router = useRouter();
  const addCityMutation = useMutation(api.users.addCity);

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    country: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const newTotal = Object.entries(cart).reduce((sum, [productId, quantity]) => {
      const product = products.find(p => p.id === Number(productId))
      return sum + (product ? product.price * quantity : 0)
    }, 0)
    setTotal(newTotal)
  }, [cart])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    console.log('Cart:', cart)

    addCityMutation({ city: formData.city })
      .then(() => {
        // Navigate to /dashboard after successful mutation
        router.push('/dashboard');
      })
      .catch((error) => {
        console.error('Error adding city:', error);
      });
  }

  const updateCart = (productId: number, increment: boolean) => {
    setCart(prevCart => {
      const newCart = { ...prevCart }
      if (increment) {
        newCart[productId] = (newCart[productId] || 0) + 1
      } else {
        newCart[productId] = Math.max((newCart[productId] || 0) - 1, 0)
        if (newCart[productId] === 0) {
          delete newCart[productId]
        }
      }
      return newCart
    })
  }

  return (
    <main>
      {/* if first time on dashboard aka just arrived from . hit with address input and ordering options */}
      <div className="min-h-screen bg-gray-100 py-8 pt-28">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Pre-order Supplies</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Your Recommended Items</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* make outline blue if product is > than 0 */}
                  {products.map(product => (
                    <div key={product.id} className={`border rounded-lg p-4 flex flex-col items-center justify-between ${cart[product.id] > 0 ? 'border-blue-500 border-2 shadow-md shadow-blue-200' : ''}`}>
                      <div className='flex flex-col items-center'>
                      <img src={product.image} alt={product.name} className="w-24 h-24 object-cover mb-2" />
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-gray-600 pt-3">${product.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateCart(product.id, false)}
                          className="bg-gray-200 rounded-full p-1 hover:bg-blue-400 transition-colors"
                        >
                          <div className="mx-2">-</div>
                        </button>
                        <span className="mx-2 w-8 text-center">{cart[product.id] || 0}</span>
                        <button
                          onClick={() => updateCart(product.id, true)}
                          className="bg-gray-200 rounded-full p-1 transition-colors hover:bg-blue-400"
                        >
                          <div className="mx-2">+</div>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-4">Payment Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1234 5678 9012 3456"
                      />
                  
                    </div>
                  </div>
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="123"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-8 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                >
                  Save Order
                </button>
              </form>
            </div>
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-32">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  {Object.entries(cart).map(([productId, quantity]) => {
                    const product = products.find(p => p.id === Number(productId))
                    if (!product) return null
                    return (
                      <div key={productId} className="flex justify-between">
                        <span>{product.name} x {quantity}</span>
                        <span>${(product.price * quantity).toFixed(2)}</span>
                      </div>
                    )
                  })}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                 
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
