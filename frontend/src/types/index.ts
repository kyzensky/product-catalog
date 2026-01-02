export interface ShopDTO {
  name: string;
}

export interface AvailabilityDTO {
  shop: ShopDTO;
  count: number;
}

export interface ProductDTO {
  uuid: string;
  name: string;
  images: string[];
  description: string;
  price: number;
  availability?: AvailabilityDTO[];
}

export interface ShoppingCartItem {
  id: string;
  amount: number;
}

export interface CartProduct extends ProductDTO {
  amount: number;
}

export interface CartItem {
  id: string;
  image: string;
  name: string;
  amount: number;
  price: number;
}

