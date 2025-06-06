'use client';

import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import { t } from "i18next";
import { FiZoomIn } from "react-icons/fi";
import Link from "next/link";
import { ChangeEvent } from "react";

//internal import
import MainDrawer from "@/components/drawer/MainDrawer";
import ProductDrawer from "@/components/drawer/ProductDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import Tooltip from "@/components/tooltip/Tooltip";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useUtilsFunction from "@/hooks/useUtilsFunction";

// Type definitions
interface ProductTitle {
  en: string;
  [key: string]: string;
}

interface ProductCategory {
  name: ProductTitle;
}

interface ProductVariant {
  originalPrice: number;
  price: number;
}

interface ProductPrices {
  originalPrice: number;
  price: number;
}

interface Product {
  _id: string;
  title: ProductTitle;
  image: string[];
  category?: ProductCategory;
  isCombination: boolean;
  variants?: ProductVariant[];
  prices?: ProductPrices;
  stock: number;
  status: string;
}

interface ProductTableProps {
  products: Product[];
  isCheck: string[];
  setIsCheck: (ids: string[]) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, isCheck, setIsCheck }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { currency, showingTranslateValue, getNumberTwo } = useUtilsFunction();

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    
    if (checked) {
      setIsCheck([...isCheck, id]);
    } else {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
    <>
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <ProductDrawer currency={currency} id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {products?.map((product, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={product?.title?.en}
                id={product._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(product._id)}
              />
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                {product?.image[0] ? (
                  <Avatar
                    className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                    src={product?.image[0]}
                    alt="product"
                  />
                ) : (
                  <Avatar
                    src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                    alt="product"
                  />
                )}
                <div>
                  <h2
                    className={`text-sm font-medium ${
                      product?.title.en.length > 30 ? "wrap-long-title" : ""
                    }`}
                  >
                    {showingTranslateValue(product?.title)?.substring(0, 28)}
                  </h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {showingTranslateValue(product?.category?.name)}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {currency}
                {product?.isCombination
                  ? getNumberTwo(product?.variants?.[0]?.originalPrice || 0)
                  : getNumberTwo(product?.prices?.originalPrice || 0)}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {currency}
                {product?.isCombination
                  ? getNumberTwo(product?.variants?.[0]?.price || 0)
                  : getNumberTwo(product?.prices?.price || 0)}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{product.stock}</span>
            </TableCell>
            <TableCell>
              {product.stock > 0 ? (
                <Badge type="success">{t("Selling")}</Badge>
              ) : (
                <Badge type="danger">{t("SoldOut")}</Badge>
              )}
            </TableCell>
            <TableCell>
              <Link
                href={`/product/${product._id}`}
                className="flex justify-center text-gray-400 hover:text-emerald-600"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={t("DetailsTbl")}
                  bgColor="#10B981"
                />
              </Link>
            </TableCell>
            <TableCell className="text-center">
              <ShowHideButton id={product._id} status={product.status} category={undefined}/>
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={product._id}
                product={product}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(product?.title)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ProductTable;