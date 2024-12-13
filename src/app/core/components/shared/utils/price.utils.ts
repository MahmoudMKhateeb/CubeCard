export interface Price {
    amount: string;
    currency: string;
}

export function getFormattedPrice(prices: Price[]): string {
    if (!prices || prices.length === 0) {
        return 'غير متوفر';
    }

    const price = prices[0];
    return `${price.amount} ${price.currency}`;
}