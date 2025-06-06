'use client';

import { Input } from "@windmill/react-ui";
import { UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputValueFiveProps {
  name: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  register: UseFormRegister<any>;
  required?: boolean;
  maxValue?: number;
  minValue?: number;
  defaultValue?: string | number;
  placeholder?: string;
}

const InputValueFive: React.FC<InputValueFiveProps> = ({
  name,
  label,
  type,
  disabled = false,
  register,
  required = false,
  maxValue,
  minValue,
  defaultValue = "",
  placeholder = "",
}) => {
  const validationOptions: RegisterOptions = {
    required: required ? `${label} is required!` : false,
    ...(maxValue !== undefined && {
      max: {
        value: maxValue,
        message: `Maximum value ${maxValue}!`,
      },
    }),
    ...(minValue !== undefined && {
      min: {
        value: minValue,
        message: `Minimum value ${minValue}!`,
      },
    }),
    // This is the crucial part: Conditionally include validation rules
    ...(type === 'number'
      ? // If the input type is 'number', use valueAsNumber: true
      // AND OMIT THE PATTERN
      {
        valueAsNumber: true,
      }
      : // If the input type is NOT 'number' (e.g., 'text'),
      // you might want to apply a pattern, and valueAsNumber should not be true.
      // For the specific pattern /^[0-9]*$/, it's generally for numeric input.
      // If you want to enforce digits for a text input, you can put the pattern here.
      {
        // If you want this specific pattern for non-number inputs:
        pattern: {
          value: /^[0-9]*$/, // This pattern ensures digits for text inputs
          message: `Invalid ${label}!`,
        },
        // valueAsNumber is not true here, so it doesn't conflict
      }),
  };

  return (
    <div className="flex flex-row">
      <Input
        {...register(name, validationOptions)}
        name={name}
        type={type}
        step={type === 'number' ? 'any' : undefined} // 'any' allows decimals for number type
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mr-2 p-2"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        css={undefined}
        crossOrigin={undefined}
      />
    </div>
  );
};

export default InputValueFive;