export interface TelecomProduct {
  id: number;
  name: string;
  image: string;
  prices: {
    amount: string;
    label: string;
  }[];
  additionalPrices?: {
    amount: string;
    label: string;
  }[];
  logos?: string[];
}