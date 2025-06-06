'use client';

import { useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { ChartOptions, ChartData } from "chart.js";
import { useTranslation } from "react-i18next";

interface SalesReportItem {
  date: string;
  total: number;
  order: number;
}

interface ButtonState {
  title: "Sales" | "Orders";
  color: string;
}

interface LineChartProps {
  salesReport?: SalesReportItem[];
}

const LineChart = ({ salesReport }: LineChartProps) => {
  const uniqueDates = new Set<string>();
  
  const updatedSalesReport = salesReport?.filter((item) => {
    const isUnique = !uniqueDates.has(item.date);
    uniqueDates.add(item.date);
    return isUnique;
  });

  const [activeButton, setActiveButton] = useState<ButtonState>({
    title: "Sales",
    color: "emerald",
  });

  const handleClick = ({ title, color }: ButtonState) => {
    setActiveButton({ title, color });
  };

  const { t } = useTranslation();

  const chartData: ChartData<"line"> = {
    labels: updatedSalesReport
      ?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      ?.map((or) => or.date),
    datasets: [
      activeButton.title === "Sales"
        ? {
            label: "Sales",
            data: updatedSalesReport
              ?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              ?.map((or) => or.total),
            borderColor: "#10B981",
            backgroundColor: "#10B981",
            borderWidth: 3,
            yAxisID: "y",
          }
        : {
            label: "Order",
            data: updatedSalesReport
              ?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              ?.map((or) => or.order),
            borderColor: "#F97316",
            backgroundColor: "#F97316",
            borderWidth: 3,
            yAxisID: "y",
          },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="h-[400px]">
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => handleClick({ title: "Sales", color: "emerald" })}
              type="button"
              className={`inline-block p-2 rounded-t-lg border-b-2 border-transparent ${
                activeButton.title === "Sales"
                  ? "text-emerald-600 border-emerald-600 dark:text-emerald-500 dark:border-emerald-500"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }  focus:outline-none`}
            >
              {t("Sales")}
            </button>
          </li>

          <li className="mr-2">
            <button
              onClick={() => handleClick({ title: "Orders", color: "orange" })}
              type="button"
              className={`inline-block p-2 rounded-t-lg border-b-2 border-transparent ${
                activeButton.title === "Orders"
                  ? "text-orange-500 border-orange-500 dark:text-orange-500 dark:border-orange-500"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }  focus:outline-none`}
            >
              {t("Orders")}
            </button>
          </li>
        </ul>
      </div>

      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;