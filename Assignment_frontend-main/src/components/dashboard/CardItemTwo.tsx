'use client';

import { FC, ReactElement } from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import Skeleton from 'react-loading-skeleton';
import { useTranslation } from 'react-i18next';
import useUtilsFunction from '@/hooks/useUtilsFunction';

interface CardItemTwoProps {
  mode?: 'light' | 'dark';
  /** Section title: e.g. "Today Order" or "Total Sales" */
  title: string;
  /** React icon component (already imported) */
  Icon: () => ReactElement;
  /** Extra tailwind classes for border / colours */
  className?: string;
  /** Main price figure */
  price: number;
  cash?: number;
  card?: number;
  credit?: number;
  loading?: boolean;
  /** Translation key for secondary title */
  title2: string;
}

const CardItemTwo: FC<CardItemTwoProps> = ({
  mode = 'light',
  title,
  Icon,
  className = '',
  price,
  cash = 0,
  card = 0,
  credit = 0,
  loading = false,
  title2,
}) => {
  const { t } = useTranslation();
  const { currency, getNumberTwo } = useUtilsFunction();

  /* skeleton colours */
  const base = mode === 'dark' ? '#010101' : '#f9f9f9';
  const highlight = mode === 'dark' ? '#1a1c23' : '#f8f8f8';

  if (loading) {
    return (
      <Skeleton
        count={4}
        height={40}
        className="dark:bg-gray-800 bg-gray-200"
        baseColor={base}
        highlightColor={highlight}
      />
    );
  }

  const isOrderBlock = title === 'Today Order' || title === 'Yesterday Order';

  return isOrderBlock ? (
    <Card className="flex justify-center h-full">
      <CardBody
        className={`border border-gray-200 dark:border-gray-800 w-full p-6 rounded-lg ${className}`}
      >
        <div className="text-center">
          <div className={`inline-block text-3xl ${className}`}>
            <Icon />
          </div>

          <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">
            {title2 ? t(title2) : <Skeleton count={1} height={20} />}
          </p>

          <p className="text-2xl font-bold leading-none text-gray-50">
            {currency}
            {getNumberTwo(price)}
          </p>

          <div className="flex justify-center text-xs font-normal text-gray-50 dark:text-gray-100">
            <div className="px-1 mt-3">
              {t('Cash')}: {currency}
              {getNumberTwo(cash)}
            </div>
            <div className="px-1 mt-3">
              {t('Card')}: {currency}
              {getNumberTwo(card)}
            </div>
            <div className="px-1 mt-3">
              {t('Credit')}: {currency}
              {getNumberTwo(credit)}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  ) : (
    <Card className="flex justify-center text-center h-full">
      <CardBody
        className={`border border-gray-200 dark:border-gray-800 w-full p-6 rounded-lg ${className}`}
      >
        <div className={`inline-block text-3xl ${className}`}>
          <Icon />
        </div>

        <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">
          {t(title2)}
        </p>

        <p className="text-2xl font-bold leading-none text-gray-50">
          {currency}
          {getNumberTwo(price)}
        </p>
      </CardBody>
    </Card>
  );
};

export default CardItemTwo;
