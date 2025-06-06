'use client';

import { FC, ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TableBody, TableCell, TableRow } from '@windmill/react-ui';
import { IoRemoveSharp } from 'react-icons/io5';

/* -------------- internal imports -------------- */
import CheckBox from '@/components/form/others/CheckBox';
import useToggleDrawer from '@/hooks/useToggleDrawer';
import DeleteModal from '@/components/modal/DeleteModal';
import MainDrawer from '@/components/drawer/MainDrawer';
import CategoryDrawer from '@/components/drawer/CategoryDrawer';
import ShowHideButton from '@/components/table/ShowHideButton';
import EditDeleteButton from '@/components/table/EditDeleteButton';
import useUtilsFunction from '@/hooks/useUtilsFunction';

/* ------------------------------------------------------------------ */
/*                       Domain / Shared Interfaces                   */
/* ------------------------------------------------------------------ */

type Localised = { [lang: string]: string | undefined };

export interface Category {
  _id: string;
  name: string | Localised;
  description?: string | Localised;
  icon?: string;
  status: 'active' | 'inactive' | boolean;        // adjust as needed
  children: Category[];                           // one-level deep
}

interface UtilsHook {
  showingTranslateValue: (v: string | Localised | undefined) => string;
}

interface ToggleDrawerHook {
  title: string;
  allId: string[];
  serviceId: string;
  setServiceId: React.Dispatch<React.SetStateAction<string>>;
  handleModalOpen: (id: string, title: string) => void; // Add title param
  handleDeleteMany: (ids: string[], products?: any) => void;
  handleUpdateMany: (ids: string[]) => void;
  handleUpdate: (id: string) => void;
}

/* ------------------------------------------------------------------ */
/*                              Props                                 */
/* ------------------------------------------------------------------ */

interface CategoryTableProps {
  // Removed 'data: unknown' as it was causing the type mismatch and isn't used as an array here
  lang: string;                      // current i18n locale
  isCheck: string[];                 // selected ids
  setIsCheck: (ids: string[]) => void;
  categories: Category[];
  useParamId: string;                // param for DeleteModal
  showChild?: boolean;               // toggle nested display
}

/* ------------------------------------------------------------------ */
/*                             Component                              */
/* ------------------------------------------------------------------ */

const CategoryTable: FC<CategoryTableProps> = ({
  // Removed 'data' from destructuring here
  lang,
  isCheck,
  categories,
  setIsCheck,
  useParamId,
  showChild = false,
}) => {
  const { title, serviceId, handleModalOpen, handleUpdate } =
    useToggleDrawer() as ToggleDrawerHook;

  const { showingTranslateValue } = useUtilsFunction() as UtilsHook;

  /* ---- checkbox handler ---- */
  const handleClick = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, checked } = e.target;

    if (checked) {
      if (!isCheck.includes(id)) setIsCheck([...isCheck, id]);
    } else {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  // Find the selected category object based on serviceId
  const selectedCategory = categories.find(cat => cat._id === serviceId);

  /* ---------------- render ---------------- */
  return (
    <>
      {/* only when nothing is selected yet */}
      {isCheck.length < 1 && (
        <DeleteModal useParamId={useParamId} id={serviceId} title={title} />
      )}

      <MainDrawer>
        {/* Pass the specific selectedCategory object as 'data' */}
        <CategoryDrawer id={serviceId} data={selectedCategory} lang={lang} />
      </MainDrawer>

      <TableBody>
        {categories.map(category => (
          <TableRow key={category._id}>
            {/* ---- Select checkbox ---- */}
            <TableCell>
              <CheckBox
                type="checkbox"
                name="category"
                id={category._id}
                handleClick={handleClick}
                isChecked={isCheck.includes(category._id)}
              />
            </TableCell>

            {/* ---- Short ID ---- */}
            <TableCell className="font-semibold uppercase text-xs">
              {category._id.substring(20, 24)}
            </TableCell>

            {/* ---- Icon ---- */}
            <TableCell>
              <div className="hidden mr-3 md:block bg-gray-50 p-1">
                <Image
                  src={
                    category.icon ??
                    'https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png'
                  }
                  alt={showingTranslateValue(category.name)}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            </TableCell>

            {/* ---- Name (and optional children) ---- */}
            <TableCell className="font-medium text-sm">
              {category.children.length > 0 ? (
                <Link
                  href={`/categories/${category._id}`}
                  className="text-blue-700"
                >
                  {showingTranslateValue(category.name)}

                  {showChild && (
                    <div className="pl-2">
                      {category.children.map(child => (
                        <div key={child._id}>
                          <Link
                            href={`/categories/${child._id}`}
                            className="text-blue-700"
                          >
                            <div className="flex text-xs items-center text-blue-800">
                              <span className="text-xs text-gray-500 pr-1">
                                <IoRemoveSharp />
                              </span>
                              <span className="text-gray-500">
                                {showingTranslateValue(child.name)}
                              </span>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </Link>
              ) : (
                <span>{showingTranslateValue(category.name)}</span>
              )}
            </TableCell>

            {/* ---- Description ---- */}
            <TableCell className="text-sm">
              {showingTranslateValue(category.description)}
            </TableCell>

            {/* ---- Status toggle ---- */}
            <TableCell className="text-center">
              <ShowHideButton
                id={category._id}
                category
                status={category.status}
              />
            </TableCell>

            {/* ---- Edit / Delete ---- */}
            <TableCell>
              <EditDeleteButton
                id={category._id}
                parent={category}
                isCheck={isCheck}
                children={category.children}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(category.name)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CategoryTable;