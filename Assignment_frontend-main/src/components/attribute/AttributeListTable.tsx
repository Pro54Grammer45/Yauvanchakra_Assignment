'use client';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { TableBody, TableCell, TableRow } from '@windmill/react-ui';

import useUtilsFunction from '@/hooks/useUtilsFunction';
import CombinationInput from '@/components/form/input/CombinationInput';
import SkuBarcodeInput from '@/components/form/selectOption/SkuBarcodeInput';
import EditDeleteButtonTwo from '@/components/table/EditDeleteButtonTwo';

/* ------------------------------------------------------------------ */
/*                       Domain / Shared Interfaces                   */
/* ------------------------------------------------------------------ */

type Localised = { [lang: string]: string | undefined };

export interface AttributeVariant {
  _id: string;
  name: string | Localised;          // union ⇒ can be “Red” or { en: "Red", fr: "Rouge" }
}

export interface AttributeGroup {
  _id: string;
  variants?: AttributeVariant[];
}

export interface Variant {
  _id?: string;                      // optional DB id (used for React key if present)
  image?: string;
  productId?: string;
  sku: string;
  barcode: string;
  originalPrice: number;
  price: number;
  quantity: number;
  /*   dynamic attribute slots – e.g. { "colorId": "attrValueId" }   */
  [attributeId: string]: unknown;
}

/* Hook return type (update when you type the hook itself) */
interface UtilsHook {
  showingTranslateValue: (v: string | Localised | undefined) => string;
}

/* ------------------------------------------------------------------ */
/*                              Props                                 */
/* ------------------------------------------------------------------ */

interface AttributeListTableProps {
  variants: Variant[];
  variantTitle: AttributeGroup[];

  /* UI & state handlers */
  setTapValue: (value: number) => void;
  deleteModalShow: (variant: Variant) => void;
  isBulkUpdate: boolean;

  /* field-level callbacks */
  handleSkuBarcode: (
    index: number,
    name: 'sku' | 'barcode',
    value: string,
  ) => void;
  handleEditVariant: (index: number) => void;
  handleRemoveVariant: (index: number) => void;
  handleQuantityPrice: (
    index: number,
    name: 'originalPrice' | 'price' | 'quantity',
    value: number | string,
  ) => void;
  handleSelectInlineImage: (index: number) => void;
}

/* ------------------------------------------------------------------ */
/*                           Component                                */
/* ------------------------------------------------------------------ */

const AttributeListTable: FC<AttributeListTableProps> = ({
  variants,
  setTapValue,
  variantTitle,
  deleteModalShow,
  isBulkUpdate,
  handleSkuBarcode,
  handleEditVariant,
  handleRemoveVariant,
  handleQuantityPrice,
  handleSelectInlineImage,
}) => {
  const { t } = useTranslation();
  const { showingTranslateValue } = useUtilsFunction() as UtilsHook;

  /* ------------- helpers ------------- */
  const resolveAttributeName = (
    att: AttributeGroup,
    variant: Variant,
  ): string | undefined => {
    const attributeData =
      att.variants?.filter(v =>
        typeof v.name === 'string'
          ? v.name !== 'All'
          : v.name.en !== 'All',
      ) ?? [];

    const raw = attributeData.find(v => v._id === variant[att._id])?.name;

    return typeof raw === 'string'
      ? showingTranslateValue(raw)
      : showingTranslateValue(raw);
  };

  /* ------------- render ------------- */
  return (
    <TableBody>
      {variants.map((variant, i) => (
        <TableRow key={variant._id ?? i}>
          {/* ----- Thumbnail + Change button ----- */}
          <TableCell>
            <div className="flex items-center">
              <span>
                <div className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none">
                  <Image
                    src={
                      variant.image ??
                      'https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png'
                    }
                    alt="product"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <p
                  className="text-xs cursor-pointer"
                  onClick={() => handleSelectInlineImage(i)}
                >
                  {t('Change')}
                </p>
              </span>
            </div>
          </TableCell>

          {/* ----- Attribute combination ----- */}
          <TableCell>
            <div className="flex flex-col text-sm">
              {variantTitle.length > 0 && (
                <span>
                  {variantTitle
                    .map(att => resolveAttributeName(att, variant))
                    .filter(Boolean)
                    .join(' ')}
                </span>
              )}

              {variant.productId && (
                <span className="text-xs text-gray-500">
                  ({variant.productId})
                </span>
              )}
            </div>
          </TableCell>

          {/* ----- SKU / barcode ----- */}
          <TableCell>
            <SkuBarcodeInput
              id={i}
              name="sku"
              placeholder="Sku"
              value={variant.sku}
              handleSkuBarcode={handleSkuBarcode}
            />
          </TableCell>
          <TableCell>
            <SkuBarcodeInput
              id={i}
              name="barcode"
              placeholder="Barcode"
              value={variant.barcode}
              handleSkuBarcode={handleSkuBarcode}
            />
          </TableCell>

          {/* ----- Price / quantity ----- */}
          <TableCell className="font-medium text-sm">
            <CombinationInput
              id={i.toString()}
              name="originalPrice"
              placeholder="Original Price"
              variant={variant.toString()}
              readOnly={isBulkUpdate} 
              isBulkUpdate={isBulkUpdate}
              value={variant.originalPrice ?? 0}
              handleQuantityPrice={handleQuantityPrice}
            />
          </TableCell>
          <TableCell className="font-medium text-sm">
            <CombinationInput
              id={i.toString()}
              name="price"
              placeholder="Sale price"
              variant={variant.toString()}
              readOnly={isBulkUpdate} 
              isBulkUpdate={isBulkUpdate}
              value={variant.price ?? 0}
              handleQuantityPrice={handleQuantityPrice}
            />
          </TableCell>
          <TableCell className="font-medium text-sm">
            <CombinationInput
              id={i.toString()}
              name="quantity"
              placeholder="Quantity"
              variant={variant.toString()}
              readOnly={isBulkUpdate} 
              isBulkUpdate={isBulkUpdate}
              value={variant.quantity ?? 0}
              handleQuantityPrice={handleQuantityPrice}
            />
          </TableCell>

          {/* ----- Action buttons ----- */}
          <TableCell>
            <EditDeleteButtonTwo
              extra={undefined}
              attribute
              variant={variant}
              setTapValue={setTapValue}
              deleteModalShow={deleteModalShow}
              handleEditVariant={() => handleEditVariant(i)}
              handleRemoveVariant={() => handleRemoveVariant(i)}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default AttributeListTable;
