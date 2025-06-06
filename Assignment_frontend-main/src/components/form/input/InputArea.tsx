'use client';

import { Input } from "@windmill/react-ui";
import { UseFormRegister } from "react-hook-form";

interface InputAreaProps {
  register: UseFormRegister<any>;
  defaultValue?: string | number;
  required?: boolean;
  name: string;
  label: string;
  type: string;
  autoComplete?: string;
  placeholder?: string;
}

const InputArea: React.FC<InputAreaProps> = ({
  register,
  defaultValue = "",
  required = false,
  name,
  label,
  type,
  autoComplete = "off",
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
      autoComplete={autoComplete}
      className="mr-2 h-12 p-2"
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      css={undefined}
      crossOrigin={undefined}
    />
  );
};

export default InputArea;