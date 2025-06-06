"use client";
import { Input } from "@windmill/react-ui";
import React from "react";

// Type definitions
interface SkuBarcodeInputProps {
  id: string | number;
  value?: string;
  name: 'sku' | 'barcode';
  placeholder?: string;
  handleSkuBarcode: (
    index: number,
    name: 'sku' | 'barcode',
    value: string
  ) => void;
}

const SkuBarcodeInput: React.FC<SkuBarcodeInputProps> = ({
  id,
  value,
  name,
  placeholder,
  handleSkuBarcode,
}) => {
  return (
    <>
      <Input
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => 
          handleSkuBarcode(Number(id), name, e.target.value)
        }
        defaultValue={value}
        type="text"
        name={name}
        placeholder={placeholder}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        css={undefined}
        crossOrigin={undefined}
        className={`mx-1 h-8 w-18 md:w-20 lg:w-20 p-2`}
      />
    </>
  );
};

export default SkuBarcodeInput;