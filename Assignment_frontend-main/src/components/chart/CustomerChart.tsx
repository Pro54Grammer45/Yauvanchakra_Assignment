'use client';

import { FC } from 'react';

/* ----------------------------- Types ----------------------------- */

interface LegendItem {
  /** Tailwind colour class, e.g. `bg-indigo-500` */
  color: string;
  /** Label shown next to the dot */
  title: string;
}

interface CustomerChartProps {
  legends: LegendItem[];
}

/* --------------------------- Component --------------------------- */

const CustomerChart: FC<CustomerChartProps> = ({ legends }) => (
  <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
    {legends.map(({ title, color }) => (
      <div className="flex items-center" key={title}>
        <span
          className={`inline-block w-3 h-3 mr-1 ${color} rounded-full`}
          aria-hidden="true"
        />
        <span>{title}</span>
      </div>
    ))}
  </div>
);

export default CustomerChart;
