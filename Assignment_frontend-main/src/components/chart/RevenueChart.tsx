'use client';

import { FC, useMemo } from 'react';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

import useAsync from '@/hooks/useAsync';
import OrderServices from '@/services/OrderServices';

/* ------------------------------------------------------------------ */
/*                        Domain interfaces                           */
/* ------------------------------------------------------------------ */

interface BestSellingItem {
  _id: string;     // product id or name
  count: number;   // units sold
}

interface BestSellingResponse {
  bestSellingProduct: BestSellingItem[];
}

/* ------------------------------------------------------------------ */
/*                           Component                                */
/* ------------------------------------------------------------------ */

const RevenueChart: FC = () => {
  /* fetch data ---------------------------------------------------------------- */
  const { data } = useAsync<BestSellingResponse>(
    OrderServices.getBestSellerProductChart,
  );

  /* memoise chart config ------------------------------------------------------ */
  const { pieData, pieOptions } = useMemo(() => {
    const items = data?.bestSellingProduct ?? [];

    const chartData: ChartData<'pie', number[], string> = {
      labels: items.map(item => item._id),
      datasets: [
        {
          data: items.map(item => item.count),
          backgroundColor: ['#10B981', '#3B82F6', '#F97316', '#0EA5E9'],
          label: 'Units Sold',
        },
      ],
    };

    const chartOptions: ChartOptions<'pie'> = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '80%',           // pie becomes doughnut when cutout > 0
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    return { pieData: chartData, pieOptions: chartOptions };
  }, [data]);

  /* render -------------------------------------------------------------------- */
  return (
    <div className="h-[400px]">
      <Pie data={pieData} options={pieOptions} className="chart" />
    </div>
  );
};

export default RevenueChart;
