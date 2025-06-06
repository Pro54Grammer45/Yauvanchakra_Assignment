'use client';

import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import { ReactElement } from "react";

//internal import
import Tooltip from "@/components/tooltip/Tooltip";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import MainDrawer from "@/components/drawer/MainDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import AttributeDrawer from "@/components/drawer/AttributeDrawer";

interface Attribute {
  _id: string;
  title: string;
  name: string;
  option: string;
  status: string;
  // Add other properties if they exist
}

interface AttributeTableProps {
  lang: string;
  isCheck: string[];
  setIsCheck: (ids: string[]) => void;
  attributes: Attribute[];
}

const AttributeTable = ({ isCheck, setIsCheck, attributes }: AttributeTableProps): ReactElement => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { showingTranslateValue } = useUtilsFunction();

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck.length < 2 && (
        <MainDrawer>
          <AttributeDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {attributes?.map((attribute) => (
          <TableRow key={attribute._id}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name="attribute"
                id={attribute._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(attribute._id)}
              />
            </TableCell>

            <TableCell className="font-semibold uppercase text-xs">
              {attribute?._id?.substring(20, 24)}
            </TableCell>

            <TableCell className="font-medium text-sm">
              {showingTranslateValue(attribute.title)}
            </TableCell>

            <TableCell className="font-medium text-sm">
              {showingTranslateValue(attribute.name)}
            </TableCell>

            <TableCell className="font-medium text-sm">
              {attribute.option}
            </TableCell>

            <TableCell className="text-center">
              <ShowHideButton id={attribute._id} status={attribute.status} category={attribute.option} />
            </TableCell>

            <TableCell className="flex justify-center">
              <Link
                href={`/attributes/${attribute._id}`}
                className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                passHref
              >
                <Tooltip
                  id="edit values"
                  Icon={FiEdit}
                  title="Edit Values"
                  bgColor="#10B981"
                />
              </Link>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={attribute._id}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(attribute.title)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default AttributeTable;