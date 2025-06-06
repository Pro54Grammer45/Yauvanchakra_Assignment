'use client';

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { FiEdit, FiTrash2, FiZoomIn } from "react-icons/fi";
import { ReactNode } from "react";
import Tooltip from "@/components/tooltip/Tooltip";

interface EditDeleteButtonProps {
  id: string;
  title: string;
  handleUpdate: (id: string) => void;
  handleModalOpen: (id: string, title: string, product?: any) => void;
  isCheck?: string[] | any[]; // Adjust the type based on your actual usage
  product?: any; // Replace 'any' with a proper type for your product
  parent?: {
    _id: string;
    [key: string]: any; // Add other properties if needed
  };
  children?: ReactNode[] | any[]; // More specific type if possible
  setIsCheck?: (ids: string[]) => void; // Optional, if you need to set checked items
}

const EditDeleteButton: React.FC<EditDeleteButtonProps> = ({
  id,
  title,
  handleUpdate,
  handleModalOpen,
  isCheck = [],
  product,
  parent,
  children,
  setIsCheck
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-end text-right">
      {children?.length > 0 ? (
        <>
          <Link
            href={`/categories/${parent?._id}`}
            className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
          >
            <Tooltip
              id="view"
              Icon={FiZoomIn}
              title={t("View")}
              bgColor="#10B981"
            />
          </Link>

          <button
            disabled={isCheck.length > 0}
            onClick={() => handleUpdate(id)}
            className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
          >
            <Tooltip
              id="edit"
              Icon={FiEdit}
              title={t("Edit")}
              bgColor="#10B981"
            />
          </button>
        </>
      ) : (
        <button
          disabled={isCheck.length > 0}
          onClick={() => handleUpdate(id)}
          className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
        >
          <Tooltip
            id="edit"
            Icon={FiEdit}
            title={t("Edit")}
            bgColor="#10B981"
          />
        </button>
      )}

      <button
        disabled={isCheck.length > 0}
        onClick={() => handleModalOpen(id, title, product)}
        className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
      >
        <Tooltip
          id="delete"
          Icon={FiTrash2}
          title={t("Delete")}
          bgColor="#EF4444"
        />
      </button>
    </div>
  );
};

export default EditDeleteButton;