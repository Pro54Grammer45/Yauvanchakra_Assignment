'use client';

import { FC } from 'react';

interface StockProps {
  stock: number;
  card?: boolean;
}

const Stock: FC<StockProps> = ({ stock, card = false }) => {
  if (stock <= 0) {
    return (
      <span className="bg-red-100 dark:bg-gray-600 text-red-500 dark:text-red-400 rounded-full inline-flex items-center justify-center px-2 py-0 text-xs font-medium font-serif">
        Stock Out
      </span>
    );
  }

  const wrapperClass = card
    ? 'bg-gray-100 dark:bg-gray-600 text-emerald-500 rounded-full text-xs px-2 py-0 font-medium'
    : 'bg-emerald-100 dark:bg-gray-600 text-emerald-500 rounded-full inline-flex items-center justify-center px-2 py-0 text-xs font-semibold font-serif';

  return (
    <span className={wrapperClass}>
      Stock :
      <span className="text-red-500 dark:text-red-400 pl-1 font-bold">
        {stock}
      </span>
    </span>
  );
};

export default Stock;
