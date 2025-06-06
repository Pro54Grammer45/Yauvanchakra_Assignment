'use client';

import { FC } from 'react';

interface Variant {
  discount: number;
}

interface Product {
  variants: Variant[];
}

interface DiscountProps {
  /** Discount passed from caller (overrides variant) */
  discount?: number;
  product: Product;
  /** If shown inside a modal, badge is placed top-left */
  modal?: boolean;
}

const Discount: FC<DiscountProps> = ({ discount, product, modal = false }) => {
  const finalDiscount =
    discount ?? Number(product.variants[0]?.discount ?? 0);

  if (finalDiscount <= 1) return null;

  const className = modal
    ? 'absolute text-dark text-xs bg-orange-500 text-white p-1 rounded font-medium z-10 mt-1 ml-1 left-0 top-0'
    : 'absolute text-dark text-xs bg-orange-500 text-white p-1 rounded font-medium z-10 right-0 top-4';

  return <span className={className}>{finalDiscount.toFixed(0)}% Off</span>;
};

export default Discount;
