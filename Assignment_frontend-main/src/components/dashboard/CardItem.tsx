'use client';

import { FC, ReactElement } from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import Skeleton from 'react-loading-skeleton';
import useUtilsFunction from '@/hooks/useUtilsFunction';

interface CardItemProps {
  title: string;
  /** React icon component (already imported) */
  Icon: () => ReactElement;
  /** Main quantity figure */
  quantity: number | string;
  /** Optional amount shown next to the title  */
  amount?: number;
  /** Colour classes for the icon circle */
  className?: string;
  /** Show skeleton when true */
  loading?: boolean;
  /** 'light' | 'dark' runtime mode */
  mode?: 'light' | 'dark';
  /** Show pending-today / pending-older breakdown */
  pending?: boolean;
  todayPending?: number;
  olderPending?: number;
}

const CardItem: FC<CardItemProps> = ({
  title,
  Icon,
  quantity,
  amount,
  className = '',
  loading = false,
  mode = 'light',
  pending = false,
  todayPending = 0,
  olderPending = 0,
}) => {
  const { getNumberTwo } = useUtilsFunction();

  /* skeleton colours */
  const base = mode === 'dark' ? '#010101' : '#f9f9f9';
  const highlight = mode === 'dark' ? '#1a1c23' : '#f8f8f8';

  if (loading) {
    return (
      <Skeleton
        count={2}
        height={40}
        className="dark:bg-gray-800 bg-gray-200"
        baseColor={base}
        highlightColor={highlight}
      />
    );
  }

  return (
    <Card className="flex h-full">
      <CardBody className="flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
        <div
          className={`flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg ${className}`}
        >
          <Icon />
        </div>

        <div>
          <h6 className="text-sm mb-1 font-medium text-gray-600 dark:text-gray-400">
            {title}{' '}
            {amount !== undefined && (
              <span className="text-red-500 text-sm font-semibold">
                ({getNumberTwo(amount)})
              </span>
            )}
          </h6>

          {pending && (
            <div className="grid grid-cols-2 gap-4 mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
              <div>
                <span className="font-semibold">Today</span>{' '}
                <span className="text-emerald-600 font-semibold">
                  ({getNumberTwo(todayPending)})
                </span>
              </div>
              <div>
                <span className="font-semibold">Older</span>{' '}
                <span className="text-orange-400 font-semibold">
                  ({getNumberTwo(olderPending)})
                </span>
              </div>
            </div>
          )}

          <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">
            {quantity}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardItem;
