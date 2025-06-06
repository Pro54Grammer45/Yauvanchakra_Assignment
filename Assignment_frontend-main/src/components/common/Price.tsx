'use client';

import { FC } from 'react';

interface ProductPrice {
  originalPriceWithTax: number;
}

interface Product {
  prices?: ProductPrice;
}

interface PriceProps {
  product?: Product;
  price?: number;
  currency?: string; // e.g. "$"
}

const Price: FC<PriceProps> = ({
  product,
  price,
  currency = '$',
}) => {
  const value =
    price ??
    Number(product?.prices?.originalPriceWithTax ?? 0);

  return (
    <div className="font-serif product-price font-bold dark:text-gray-400">
      {currency}
      {value.toFixed(2)}
    </div>
  );
};

export default Price;
