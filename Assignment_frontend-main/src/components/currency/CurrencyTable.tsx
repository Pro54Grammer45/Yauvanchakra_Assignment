'use client';

import { FC, ChangeEvent } from 'react';
import { TableBody, TableCell, TableRow } from '@windmill/react-ui';

import CheckBox from '@/components/form/others/CheckBox';
import useToggleDrawer from '@/hooks/useToggleDrawer';
import DeleteModal from '@/components/modal/DeleteModal';
import MainDrawer from '@/components/drawer/MainDrawer';
import CurrencyDrawer from '@/components/drawer/CurrencyDrawer';
import EditDeleteButton from '@/components/table/EditDeleteButton';
import ShowHideButton from '@/components/table/ShowHideButton';

/* ------------------------------------------------------------------ */
/*                            Domain types                            */
/* ------------------------------------------------------------------ */

interface CurrencyItem {
  _id: string;
  name: string;
  symbol: string;
  status: 'active' | 'inactive' | boolean; // adjust to your API
}

interface CurrencyTableProps {
  currency: CurrencyItem[];
  isCheck: string[];
  setIsCheck: (ids: string[]) => void;
}

/* hook return typing (simplified) */
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

const CurrencyTable: FC<CurrencyTableProps> = ({
  currency,
  isCheck,
  setIsCheck,
}) => {
  const { title, serviceId, handleModalOpen, handleUpdate } =
    useToggleDrawer() as ToggleDrawerHook;

  /* checkbox handler */
  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    if (checked) {
      if (!isCheck.includes(id)) setIsCheck([...isCheck, id]);
    } else {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  /* ------------------------------------------------------------------ */
  return (
    <>
      {/* show modal only when single-select */}
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      <MainDrawer>
        <CurrencyDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {currency.map(item => (
          <TableRow key={item._id}>
            {/* checkbox */}
            <TableCell>
              <CheckBox
                type="checkbox"
                name={item.symbol}
                id={item._id}
                handleClick={handleClick}
                isChecked={isCheck.includes(item._id)}
              />
            </TableCell>

            {/* name */}
            <TableCell className="text-center">
              <span className="font-medium text-sm">{item.name}</span>
            </TableCell>

            {/* symbol */}
            <TableCell className="text-center">
              <span className="font-medium text-sm">{item.symbol}</span>
            </TableCell>

            {/* status toggle */}
            <TableCell className="text-center">
              <ShowHideButton
                id={item._id}
                status={item.status}
                currencyStatusName="status"
                category={undefined}
              />
            </TableCell>

            {/* edit / delete */}
            <TableCell>
              <EditDeleteButton
                title={item.name}
                id={item._id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CurrencyTable;
