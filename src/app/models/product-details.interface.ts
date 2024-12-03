export interface ProductDetails {
  id: number;
  name: string;
  price: number;
  features: string[];
  description: string;
  image: string;
  currency: string;
  variants: {
    name: string;
    price: number;
  }[];
}