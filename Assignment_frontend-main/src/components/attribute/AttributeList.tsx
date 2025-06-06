'use client';

import Image from 'next/image';
import { TableBody, TableCell, TableRow } from '@windmill/react-ui';
import useUtilsFunction from '@/hooks/useUtilsFunction';
import { FC } from 'react';

/* ---------- Domain models ---------- */

type Localised = { [lang: string]: string | undefined };

interface AttributeVariant {
  _id: string;
  name: string | Localised;
}

interface AttributeGroup {
  _id: string;
  variants?: AttributeVariant[];
}

interface Variant {
  _id?: string;          // if present, nicer React key
  image?: string;
  productId?: string;
  sku: string;
  barcode: string;
  originalPrice: number;
  price: number;
  quantity: number;
  /* Dynamically-named attribute IDs, e.g. { 'colorId': 'redId' } */
  [attributeId: string]: unknown;
}

interface UtilsHook {
  showingTranslateValue: (v?: string | { [lang: string]: string }) => string;
  currency: string;
  getNumberTwo: (n: number) => string;
}

/* ---------- Props ---------- */

interface AttributeListProps {
  variants: Variant[];
  variantTitle: AttributeGroup[];
}

/* ---------- Component ---------- */

const AttributeList: FC<AttributeListProps> = ({ variants, variantTitle }) => {
  const {
    showingTranslateValue,
    currency,
    getNumberTwo,
  } = useUtilsFunction() as UtilsHook;           // ← cast if the hook isn’t yet typed

  return (
    <TableBody>
      {variants.map((variant, i) => (
        <TableRow key={variant._id ?? i}>       {/* prefer stable key */}
          <TableCell className="font-semibold uppercase text-xs">
            {i + 1}
          </TableCell>

          <TableCell>
            <div className="flex items-center">
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
            </div>
          </TableCell>

          <TableCell>
            <div className="flex flex-col text-sm">
              <span>
                  {variantTitle
                    .map(att => {
                      const attributeData =
  att.variants?.filter(
    v => !(typeof v.name === 'string' && v.name === 'All')   // skip “All” only when name is plain string
  ) ?? [];

                      const attributeName = attributeData.find(
                        v => v._id === variant[att._id],
                      )?.name;

                    return attributeName === undefined
                      ? undefined
                      : showingTranslateValue(attributeName);
                  })
                  .filter(Boolean)
                  .join(' ')}
              </span>
              {variant.productId && (
                <span className="text-xs text-gray-500">
                  ({variant.productId})
                </span>
              )}
            </div>
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {variant.sku}
          </TableCell>
          <TableCell className="font-semibold uppercase text-xs">
            {variant.barcode}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {currency}
            {getNumberTwo(variant.originalPrice)}
          </TableCell>
          <TableCell className="font-semibold uppercase text-xs">
            {currency}
            {getNumberTwo(variant.price)}
          </TableCell>

          <TableCell className="font-semibold uppercase text-xs">
            {variant.quantity}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default AttributeList;
