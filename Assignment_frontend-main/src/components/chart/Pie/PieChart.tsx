'use client';

import { FC, useMemo } from 'react';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

/* ------------------------------------------------------------------ */
/*                         Domain interfaces                          */
/* ------------------------------------------------------------------ */

interface BestSellingItem {
  _id: string;          // product ID or name
  count: number;        // units sold
}

interface PieChartData {
  bestSellingProduct: BestSellingItem[];
}

/* ------------------------------------------------------------------ */
/*                              Props                                 */
/* ------------------------------------------------------------------ */

interface PieChartProps {
  data?: PieChartData;   // component is resilient to data not yet loaded
}

/* ------------------------------------------------------------------ */
/*                           Component                                */
/* ------------------------------------------------------------------ */

const PieChart: FC<PieChartProps> = ({ data }) => {
  /* Build chart config only when `data` changes */
  const { pieData, pieOptions } = useMemo(() => {
    const items = data?.bestSellingProduct ?? [];

    const pieData: ChartData<'pie', number[], string> = {
      labels: items.map(i => i._id),
      datasets: [
        {
          data: items.map(i => i.count),
          backgroundColor: ['#10B981', '#3B82F6', '#F97316', '#0EA5E9'],
          label: 'Units Sold',
        },
      ],
    };

    const pieOptions: ChartOptions<'pie'> = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '80%',            // doughnut look
      plugins: {
        legend: { display: false },
      },
    };

    return { pieData, pieOptions };
  }, [data]);

  return (
    <div className="h-[400px]">
      <Pie data={pieData} options={pieOptions} className="chart" />
    </div>
  );
};

export default PieChart;
