'use client';

import { Select } from "@windmill/react-ui";
import { UseFormRegister } from "react-hook-form";

interface SelectReceiptSizeProps {
  setPosCustomer: (value: string) => void;
  register: UseFormRegister<any>;
  name: string;
  label: string;
  pos?: boolean;
  required?: boolean;
}

const SelectReceiptSize: React.FC<SelectReceiptSizeProps> = ({
  setPosCustomer,
  register,
  name,
  label,
  pos = false,
  required = false,
}) => {
  return (
    <Select
      onChange={(e) => setPosCustomer(e.target.value)}
      className={`${pos ? "h-10" : "h-12"}`}
      name={name}
      {...register(name, {
        required: required ? `${label} is required!` : false,
      })}
      placeholder="Select status"
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      css={undefined}
      defaultValue="57-mm"
    >
      <option value="57-mm">
        57 mm
      </option>
      <option value="80-mm">80 mm</option>
      <option value="3-1/8">3 1/8"</option>
      <option value="2-1/4">2 1/4"</option>
      <option value="A4">A4</option>
    </Select>
  );
};

export default SelectReceiptSize;