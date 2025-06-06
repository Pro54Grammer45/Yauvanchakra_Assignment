'use client';

import { Select } from "@windmill/react-ui";
import { UseFormRegister } from "react-hook-form";

interface SelectOptionProps {
  register: UseFormRegister<any>;
  name: string;
  label: string;
}

const SelectOption: React.FC<SelectOptionProps> = ({ register, name, label }) => {
  return (
    <Select
      name={name}
      {...register(name, {
        required: `${label} is required!`,
      })}
      placeholder="Select status"
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      css={undefined}
      defaultValue=""
    >
      <option value=""  hidden>
        Select type
      </option>
      <option value="Fish & Meat">Fish & Meat</option>
      <option value="Household Tools">Household Tools</option>
      <option value="Cloths">Cloths</option>
      <option value="Health Care">Health Care</option>
      <option value="Grocery">Grocery</option>
      <option value="Books">Books</option>
      <option value="Bags">Bags</option>
      <option value="Sports & Fitness">Sports & Fitness</option>
      <option value="Home Accessories">Home Accessories</option>
      <option value="Furniture">Furniture</option>
      <option value="Electronics">Electronics</option>
    </Select>
  );
};

export default SelectOption;