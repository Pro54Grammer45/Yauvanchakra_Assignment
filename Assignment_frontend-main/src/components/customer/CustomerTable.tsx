'use client';

import { FC } from 'react';
import { TableBody, TableCell, TableRow } from '@windmill/react-ui';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { FiZoomIn } from 'react-icons/fi';
import Link from 'next/link';

import MainDrawer from '@/components/drawer/MainDrawer';
import DeleteModal from '@/components/modal/DeleteModal';
import useToggleDrawer from '@/hooks/useToggleDrawer';
import Tooltip from '@/components/tooltip/Tooltip';
import CustomerDrawer from '@/components/drawer/CustomerDrawer';
import EditDeleteButton from '@/components/table/EditDeleteButton';

/* ------------------------------------------------------------------ */
/*                            Domain types                            */
/* ------------------------------------------------------------------ */

interface Customer {
  _id: string;
  createdAt: string | Date;
  name: string;
  email: string;
  phone: string;
}

interface CustomerTableProps {
  customers: Customer[];
}

interface ToggleDrawerHook {
  title: string;
  allId: string[];
  serviceId: string;
  handleUpdate: (id: string) => void;
  setServiceId: React.Dispatch<React.SetStateAction<string>>;
  handleModalOpen: (id: string, title: string) => void; // Add title param
  handleDeleteMany: (ids: string[], products?: any) => void;
  handleUpdateMany: (ids: string[]) => void;
}

/* ------------------------------------------------------------------ */
/*                             Component                              */
/* ------------------------------------------------------------------ */

const CustomerTable: FC<CustomerTableProps> = ({ customers }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } =
    useToggleDrawer() as ToggleDrawerHook;

  return (
    <>
      <DeleteModal id={serviceId} title={title} />

      <MainDrawer>
        <CustomerDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {customers.map(user => (
          <TableRow key={user._id}>
            {/* Short ID */}
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {user._id.substring(20, 24)}
              </span>
            </TableCell>

            {/* Created date */}
            <TableCell>
              <span className="text-sm">
                {dayjs(user.createdAt).format('MMM D, YYYY')}
              </span>
            </TableCell>

            {/* Name */}
            <TableCell>
              <span className="text-sm">{user.name}</span>
            </TableCell>

            {/* Email */}
            <TableCell>
              <span className="text-sm">{user.email}</span>
            </TableCell>

            {/* Phone */}
            <TableCell>
              <span className="text-sm font-medium">{user.phone}</span>
            </TableCell>

            {/* Actions */}
            <TableCell>
              <div className="flex justify-end text-right">
                <div className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600">
                  <Link href={`/customer-order/${user._id}`}>
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title={t('ViewOrder')}
                      bgColor="#34D399"
                    />
                  </Link>
                </div>

                <EditDeleteButton
                  title={user.name}
                  id={user._id}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CustomerTable;
