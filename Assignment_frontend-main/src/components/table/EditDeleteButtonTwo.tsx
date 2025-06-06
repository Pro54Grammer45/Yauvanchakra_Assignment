'use client';

import { FiEdit, FiTrash2 } from "react-icons/fi";
//internal import
import Tooltip from "@/components/tooltip/Tooltip";
import { Variant } from "src/components/attribute/AttributeListTable";

interface EditDeleteButtonTwoProps {
  extra: any;
  variant: any;
  handleRemoveVariant: (variant: any, extra: any) => void;
  attribute: any;
  setTapValue: (value: number) => void;
  deleteModalShow: (variant: Variant) => void;
  handleEditVariant: () => void;
}

const EditDeleteButtonTwo: React.FC<EditDeleteButtonTwoProps> = ({
  extra,
  variant,
  setTapValue,
  deleteModalShow,
  handleEditVariant,
  handleRemoveVariant,
  attribute,
}) => {
  return (
    <>
      <button onClick={() => setTapValue(1)}>Change Tab</button>
      <div className="flex justify-end text-right">
        {!attribute && (
          <div
            // onClick={() => handleEditVariant(variant)}
            className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600"
          >
            <Tooltip id="edit" Icon={FiEdit} title="Edit" bgColor="#14b8a6" />
          </div>
        )}

        <div
          onClick={() => handleRemoveVariant(variant, extra)}
          className="p-2 cursor-pointer text-gray-400 hover:text-red-600"
        >
          <Tooltip
            id="delete"
            Icon={FiTrash2}
            title="Delete"
            bgColor="#EF4444"
          />
        </div>
      </div>
    </>
  );
};

export default EditDeleteButtonTwo;
