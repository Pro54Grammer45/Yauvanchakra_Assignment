'use client';

import { FC, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

import useUtilsFunction from '@/hooks/useUtilsFunction';

/* ------------------------------------------------------------------ */
/*                           Domain models                            */
/* ------------------------------------------------------------------ */

interface SalesReportItem {
  date: string;   // e.g. '2025-05-25'
  total: number;  // total sales revenue
  order: number;  // number of orders
}

interface SaleChartProps {
  salesReport: SalesReportItem[];
}

/* Local UI state for the tab bar */
type Tab = 'Sales' | 'Orders';

interface ActiveButton {
  title: Tab;
  color: string;   // Tailwind colour name (emerald / orange …)
}

/* Return type for the utils hook */
interface UtilsHook {
  getNumberTwo: (n: number) => number;   // rounds to 2 decimals
}

/* ------------------------------------------------------------------ */
/*                             Component                              */
/* ------------------------------------------------------------------ */

const SaleChart: FC<SaleChartProps> = ({ salesReport }) => {
  const { getNumberTwo } = useUtilsFunction() as UtilsHook;

  const [activeButton, setActiveButton] = useState<ActiveButton>({
    title: 'Sales',
    color: 'emerald',
  });

  /* --------------- tab click handler ---------------- */
  const handleClick = (tab: ActiveButton) => setActiveButton(tab);

  /* --------------- chart config (memoised) ----------- */
  const { chartData, chartOptions } = useMemo(() => {
    const labels = salesReport.map(item => item.date);

    const dataPoints: number[] =
      activeButton.title === 'Sales'
        ? salesReport.map(item => getNumberTwo(item.total))
        : salesReport.map(item => item.order);

    const chartData: ChartData<'line', number[], string> = {
      labels,
      datasets: [
        {
          label: activeButton.title,
          data: dataPoints,
          borderColor: activeButton.title === 'Sales' ? '#10B981' : '#F97316',
          backgroundColor:
            activeButton.title === 'Sales' ? '#10B981' : '#F97316',
          borderWidth: 3,
          yAxisID: 'y',
        },
      ],
    };

    const chartOptions: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
    };

    return { chartData, chartOptions };
  }, [salesReport, activeButton, getNumberTwo]);

  /* --------------------------- render ---------------------------- */
  return (
    <div className="h-[400px]">
      {/* ---- Tab bar ---- */}
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => handleClick({ title: 'Sales', color: 'emerald' })}
              type="button"
              className={`inline-block p-2 rounded-t-lg border-b-2 border-transparent ${
                activeButton.title === 'Sales'
                  ? 'text-emerald-600 border-emerald-600 dark:text-emerald-500 dark:border-emerald-500'
                  : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              } focus:outline-none`}
            >
              Sales
            </button>
          </li>

          <li className="mr-2">
            <button
              onClick={() => handleClick({ title: 'Orders', color: 'orange' })}
              type="button"
              className={`inline-block p-2 rounded-t-lg border-b-2 border-transparent ${
                activeButton.title === 'Orders'
                  ? 'text-orange-500 border-orange-500 dark:text-orange-500 dark:border-orange-500'
                  : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              } focus:outline-none`}
            >
              Orders
            </button>
          </li>
        </ul>
      </div>

      {/* ---- Line chart ---- */}
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default SaleChart;
