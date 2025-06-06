'use client';

import { FC } from 'react';
import { TableCell, TableBody, TableRow } from '@windmill/react-ui';

import Status from '@/components/table/Status';
import SelectStatus from '@/components/form/selectOption/SelectStatus';
import useUtilsFunction from '@/hooks/useUtilsFunction';

/* ------------------------------------------------------------------ */
/*                       Domain / Shared Interfaces                   */
/* ------------------------------------------------------------------ */

interface OrderUserInfo {
  address?: string;
  contact?: string;
}

interface OrderItem {
  _id: string;
  createdAt: string | Date;
  user_info: OrderUserInfo;
  paymentMethod: string;
  total: number;
  status: "Delivered" | "Pending" | "Processing" | "Cancel";
}

interface CustomerOrderTableProps {
  orders: OrderItem[];
}

/* Return type of utils hook (simplified) */
interface UtilsHook {
  showDateTimeFormat: (d: string | Date) => string;
  getNumberTwo: (n: number) => string | number;
  currency: string;
}

/* ------------------------------------------------------------------ */
/*                             Component                              */
/* ------------------------------------------------------------------ */

const CustomerOrderTable: FC<CustomerOrderTableProps> = ({ orders }) => {
  const {
    showDateTimeFormat,
    getNumberTwo,
    currency,
  } = useUtilsFunction() as UtilsHook;

  return (
    <TableBody>
      {orders.map(order => (
        <TableRow key={order._id}>
          {/* Order ID (short) */}
          <TableCell>
            <span className="font-semibold uppercase text-xs">
              {order._id.substring(20, 24)}
            </span>
          </TableCell>

          {/* Date */}
          <TableCell>
            <span className="text-sm">{showDateTimeFormat(order.createdAt)}</span>
          </TableCell>

          {/* Address */}
          <TableCell>
            <span className="text-sm">{order.user_info.address}</span>
          </TableCell>

          {/* Contact */}
          <TableCell>
            <span className="text-sm">{order.user_info.contact}</span>
          </TableCell>

          {/* Payment method */}
          <TableCell>
            <span className="text-sm font-semibold">{order.paymentMethod}</span>
          </TableCell>

          {/* Total */}
          <TableCell>
            <span className="text-sm font-semibold">
              {currency}
              {getNumberTwo(order.total)}
            </span>
          </TableCell>

          {/* Status badge */}
          <TableCell className="text-center">
            <Status status={order.status} />
          </TableCell>

          {/* Status selector */}
          <TableCell className="text-right">
            <SelectStatus id={order._id} order={order} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CustomerOrderTable;
