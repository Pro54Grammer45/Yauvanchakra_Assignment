"use client";
import { Textarea } from "@windmill/react-ui";
import React from "react";
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