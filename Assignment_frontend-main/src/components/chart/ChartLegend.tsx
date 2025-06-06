'use client';

import { FC } from 'react';

interface LegendItem {
  /** Text label shown next to the dot */
  title: string;
  /** Tailwind colour class, e.g. `bg-blue-500` or `bg-green-400` */
  color: string;
}

interface ChartLegendProps {
  legends: LegendItem[];
}

const ChartLegend: FC<ChartLegendProps> = ({ legends }) => (
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

export default ChartLegend;
