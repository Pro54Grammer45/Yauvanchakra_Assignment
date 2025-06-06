'use client';

import { Select } from "@windmill/react-ui";
import { UseFormRegister } from "react-hook-form";

interface SelectProductLimitProps {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  required?: boolean;
}

const SelectProductLimit: React.FC<SelectProductLimitProps> = ({
  register,
  name,
  label,
  required = false,
}) => {
  return (
    <Select
      name={name}
      {...register(name, {
        required: required ? `${label} is required!` : false,
      })}
      placeholder="Select status"
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      css={undefined}
      defaultValue= ""
    >
      <option value="" hidden>
        Select Products Limit
      </option>
      <option value="6">6</option>
      <option value="12">12</option>
      <option value="18">18</option>
    </Select>
  );
};

export default SelectProductLimit;