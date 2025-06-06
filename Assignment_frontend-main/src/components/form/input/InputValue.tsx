//InputValue.tsx
'use client';
import { Input } from "@windmill/react-ui";
import { UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputValueProps {
  name: string;
  label: string;
  type: 'number' | 'text';
  disabled?: boolean;
  register: UseFormRegister<any>;
  required?: boolean;
  maxValue?: number;
  minValue?: number;
  currency?: string;
  product?: boolean;
  defaultValue?: string | number;
  placeholder?: string;
}

const InputValue: React.FC<InputValueProps> = ({
  name,
  label,
  type,
  disabled = false,
  register,
  required = false,
  maxValue,
  minValue,
  currency = "$",
  product = false,
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
    // Conditionally include valueAsNumber and pattern based on the input type
    ...(type === 'number'
      ? {
        valueAsNumber: true, // Only include when type is 'number'
        // Removed pattern for type='number' to satisfy RegisterOptions union
        // The browser's type="number" and valueAsNumber handle numeric input
      }
      : {
        // This block is for type === 'text' or other types where a pattern might be needed
        // If you need a pattern for text inputs, define it here.
        // For now, no pattern is applied for text inputs unless explicitly added.
      }),
  };

  // If you specifically need a pattern for text inputs, you would add it here:
  if (type === 'text') {
    // Example: Add a pattern for text inputs if desired
    // (validationOptions as any).pattern = {
    //   value: /^[a-zA-Z\s]*$/,
    //   message: 'Only letters and spaces are allowed!',
    // };
  }


  return (
    <div className="flex flex-row">
      {product && (
        <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:border-emerald-300 dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
          {currency}
        </span>
      )}
      <Input
        {...register(name, validationOptions)}
        type={type}
        name={name}
        // Only apply step for number inputs
        step={type === 'number' ? 0.01 : undefined}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`mr-2 p-2 ${product ? "rounded-l-none" : ""}`}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        css={undefined}
        crossOrigin={undefined}
      />
    </div>
  );
};

export default InputValue;