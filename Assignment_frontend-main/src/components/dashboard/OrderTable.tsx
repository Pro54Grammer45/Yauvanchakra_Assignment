'use client';

import { FC } from 'react';
import { TableCell, TableBody, TableRow } from '@windmill/react-ui';

import Status from '@/components/table/Status';
import useUtilsFunction from '@/hooks/useUtilsFunction';

interface OrderUserInfo {
  name?: string;
  email?: string;
}

interface OrderRow {
  _id: string;
  createdAt: string | Date;
  user_info: OrderUserInfo;
  paymentMethod: string;
  total: number;
  status: string;
}

interface OrderTableProps {
  orders: OrderRow[];
}

interface UtilsHook {
  currency: string;
  showDateTimeFormat: (d: string | Date) => string;
  getNumberTwo: (n: number) => string | number;
}

const OrderTable: FC<OrderTableProps> = ({ orders }) => {
  const { currency, showDateTimeFormat, getNumberTwo } =
    useUtilsFunction() as UtilsHook;

  return (
    <TableBody>
      {orders.map(order => (
        <TableRow key={order._id}>
          <TableCell>
            <span className="text-sm">
              {showDateTimeFormat(order.createdAt)}
            </span>
          </TableCell>

          <TableCell>
            <span className="text-sm">{order.user_info.name}</span>
          </TableCell>

          <TableCell>
            <span className="text-sm font-semibold">{order.paymentMethod}</span>
          </TableCell>

          <TableCell>
            <span className="text-sm font-semibold">
              {currency}
              {getNumberTwo(order.total)}
            </span>
          </TableCell>

          <TableCell>
            <span className="text-sm">{order.user_info.email}</span>
          </TableCell>

          <TableCell>
            <Status status={order.status} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default OrderTable;
