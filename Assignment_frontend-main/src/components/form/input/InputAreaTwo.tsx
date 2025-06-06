'use client';

import { Input } from "@windmill/react-ui";
import { UseFormRegister } from "react-hook-form";

interface InputAreaTwoProps {
  register: UseFormRegister<any>;
  defaultValue?: string | number;
  required?: boolean;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
}

const InputAreaTwo: React.FC<InputAreaTwoProps> = ({
  register,
  defaultValue = "",
  required = false,
  name,
  label,
  type,
  placeholder = "",
}) => {
  return (
    <Input
      {...register(`${name}`, {
        required: required ? `${label} is required!` : false,
      })}
      defaultValue={defaultValue}
      type={type}
      placeholder={placeholder}
      name={name}
      autoComplete="new-password"
      className="mr-2 p-2"
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      css={undefined}
      crossOrigin={undefined}
    />
  );
};

export default InputAreaTwo;