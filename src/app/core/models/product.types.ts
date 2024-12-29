export interface ProductPrice {
  id: number;
  product_id: number;
  region_id: number;
  display_price: string;
  display_currency: string;
  sar_price: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductCategory {
  id: number;
  name: string;
}

export interface ProductListItem {
  id: number;
  category_id: number;
  uuid: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  discount: number | null;
  additional_prices: any | null;
  regions: any | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  prices: ProductPrice[];
  thumbnail?: string;
}

export interface PaginationInfo {
  current_page: number;
  total_pages: number;
  total_items: number;
  per_page: number;
}

export interface ProductListResponse {
  status: boolean;
  message: string;
  data: {
    products: ProductListItem[];
    pagination: PaginationInfo;
  };
}

export interface RegionInfo {
  id: number;
  code: string;
  name: string;
  currency_code: string;
  currency_symbol: string;
}

export interface RegionPrice {
  display_price: string;
  display_currency: string;
  sar_price: string;
  is_active: boolean;
}

export interface RegionWithPrices {
  region: RegionInfo;
  prices: RegionPrice[];
}

export interface ProductDetails {
  uuid: string;
  name: string;
  image: string;
  description: string;
  features: any | null;
  discount: number | null;
}

export interface ProductDetailsResponse {
  product: ProductDetails;
  regions: RegionWithPrices[];
}

export interface Product {
  uuid: string;
  name: string;
  image: string;
  description: string;
  category: ProductCategory;
  regions: RegionWithPrices[];
} 