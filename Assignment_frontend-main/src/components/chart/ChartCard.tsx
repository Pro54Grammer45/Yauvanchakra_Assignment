'use client';

import { FC, ReactNode } from 'react';
import Skeleton from 'react-loading-skeleton';

interface ChartProps {
  /** Section heading displayed above the chart */
  title: string;
  /** Show skeleton loaders instead of children */
  loading?: boolean;
  /** “light” or “dark” mode colours for Skeleton */
  mode?: 'light' | 'dark';
  /** Bar / line / pie component to render once data is loaded */
  children: ReactNode;
}

const Chart: FC<ChartProps> = ({
  title,
  loading = false,
  mode = 'light',
  children,
}) => {
  /* colour helpers -------------------------------------------------- */
  const baseColor = mode === 'dark' ? '#010101' : '#f9f9f9';
  const highlightColor = mode === 'dark' ? '#1a1c23' : '#f8f8f8';

  /* ----------------------------------------------------------------- */
  return (
    <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      {/* Title (or title skeleton) */}
      <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
        {loading ? (
          <Skeleton
            height={20}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        ) : (
          title
        )}
      </p>

      {/* Body */}
      {title === 'Best Selling Products' ? (
        loading ? (
          /* Image-style skeleton */
          <div className="flex justify-center">
            <Skeleton
              width={250}
              height={250}
              circle
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          </div>
        ) : (
          children
        )
      ) : loading ? (
        /* List-style skeleton */
        <Skeleton
          count={13}
          height={20}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      ) : (
        children
      )}
    </div>
  );
};

export default Chart;
