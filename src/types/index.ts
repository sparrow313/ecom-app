export interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  availableSizes: string[]
  availableColors: string[]
}

export interface CartItem extends Product {
  quantity: number
  size: string
  color: string
}
