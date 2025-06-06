'use client';

import { FC, ChangeEvent } from 'react';
import { TableBody, TableCell, TableRow } from '@windmill/react-ui';

import useToggleDrawer from '@/hooks/useToggleDrawer';
import useUtilsFunction from '@/hooks/useUtilsFunction';
import MainDrawer from '@/components/drawer/MainDrawer';
import CheckBox from '@/components/form/others/CheckBox';
import DeleteModal from '@/components/modal/DeleteModal';
import EditDeleteButton from '@/components/table/EditDeleteButton';
import ShowHideButton from '@/components/table/ShowHideButton';
import AttributeChildDrawer from '@/components/drawer/AttributeChildDrawer';

/* ------------------------------------------------------------------ */
/*                       Domain / Shared Interfaces                   */
/* ------------------------------------------------------------------ */

type Localised = { [lang: string]: string | undefined };

export interface ChildAttribute {
  _id: string;
  name: string | Localised;
  status: 'active' | 'inactive' | boolean; // adjust to your API
}

export interface ParentAttributeMeta {
  option?: string;
}

interface UtilsHook {
  showingTranslateValue: (v: string | Localised | undefined) => string;
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
/*                              Props                                 */
/* ------------------------------------------------------------------ */

interface ChildAttributeTableProps {
  att: ParentAttributeMeta;
  loading?: boolean;
  isCheck: string[];
  setIsCheck: (ids: string[]) => void;
  childAttributes: ChildAttribute[];
}

/* ------------------------------------------------------------------ */
/*                             Component                              */
/* ------------------------------------------------------------------ */

const ChildAttributeTable: FC<ChildAttributeTableProps> = ({
  att,
  loading,
  isCheck,
  setIsCheck,
  childAttributes,
}) => {
  const {
    title,
    serviceId,
    handleModalOpen,
    handleUpdate,
  } = useToggleDrawer() as ToggleDrawerHook;

  const { showingTranslateValue } = useUtilsFunction() as UtilsHook;

  /* -------------------------- handlers --------------------------- */
  const handleClick = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, checked } = e.target;

    if (checked) {
      // add if not already present
      if (!isCheck.includes(id)) setIsCheck([...isCheck, id]);
    } else {
      // remove
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  /* --------------------------- render ---------------------------- */
  return (
    <>
      {/* drawers & modals show only when single-select */}
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck.length < 2 && (
        <MainDrawer>
          <AttributeChildDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {childAttributes.map((attribute, index) => (
          <TableRow key={attribute._id}>
            {/* checkbox */}
            <TableCell>
              <CheckBox
                type="checkbox"
                name="child-attribute"
                id={attribute._id}
                handleClick={handleClick}
                isChecked={isCheck.includes(attribute._id)}
              />
            </TableCell>

            {/* short id */}
            <TableCell className="font-semibold uppercase text-xs">
              {attribute._id.substring(20, 24)}
            </TableCell>

            {/* attribute name */}
            <TableCell className="font-medium text-sm">
              {showingTranslateValue(attribute.name)}
            </TableCell>

            {/* parent option */}
            <TableCell className="font-medium text-sm">
              {att.option}
            </TableCell>

            {/* status toggle */}
            <TableCell className="text-center">
              <ShowHideButton id={attribute._id} status={attribute.status} category={attribute.name} />
            </TableCell>

            {/* edit / delete */}
            <TableCell>
              <EditDeleteButton
                id={attribute._id}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(attribute.name)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ChildAttributeTable;
