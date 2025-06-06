'use client';

import { Textarea } from "@windmill/react-ui";
import { UseFormRegister } from "react-hook-form";

interface TextAreaComProps {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value?: string;
}

const TextAreaCom: React.FC<TextAreaComProps> = ({
  register,
  name,
  label,
  placeholder = "",
  required = false,
  type = "text",
  value = "",
}) => {
  return (
    <Textarea
      className="border text-sm border-gray-200 focus:border-gray-300 block w-full bg-gray-100"
      {...register(name, {
        required: required ? `${label} is required!` : false,
      })}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      rows={4}
      spellCheck="false"
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      css={undefined}
    />
  );
};

export default TextAreaCom;