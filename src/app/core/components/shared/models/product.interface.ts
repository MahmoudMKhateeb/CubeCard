export interface Product {
  uuid: string;
  name: string;
  image: string;
  description: string;
  features: string[];
  targetAudience: string;
  discount?: number;
  categorySlug: string;
  prices: Price[];
  additionalPrices?: Price[];
  regions?: Region[];
}

export interface Price {
  amount: string;
  currency: string;
}

export interface Region {
  name: string;
  flag: string;
}