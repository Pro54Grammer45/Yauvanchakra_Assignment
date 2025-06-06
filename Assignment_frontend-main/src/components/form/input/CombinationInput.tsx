'use client';

import { Input } from "@windmill/react-ui";

interface CombinationInputProps {
  id: string;
  value: number;
  name: string;
  variant?: string;
  readOnly?: boolean;
  isBulkUpdate: boolean;
  placeholder?: string;
  handleQuantityPrice: (
    value: string | number,
    name?: string,
    id?: string,
    variant?: string
  ) => void;
}

const CombinationInput: React.FC<CombinationInputProps> = ({
  id,
  value,
  name,
  variant,
  readOnly = false,
  isBulkUpdate,
  placeholder = "",
  handleQuantityPrice,
}) => {
  return (
    <>
      {isBulkUpdate && (
        <Input
          onChange={(e) => handleQuantityPrice(e.target.value, name, id, variant)}
          disabled={readOnly}
          value={value || 0}
          type="number"
          name={name}
          pattern="^[0-9]+$"
          placeholder={placeholder}
          className={`mx-1 h-8 w-18 md:w-20 lg:w-20 p-2`}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          css={undefined}
          crossOrigin={undefined}
        />
      )}
      {!isBulkUpdate && (
        <Input
          onBlur={(e) => handleQuantityPrice(e.target.value, name, id, variant)}
          disabled={readOnly}
          defaultValue={value}
          type="number"
          name={name}
          pattern="^[0-9]+$"
          placeholder={placeholder}
          className={`mx-1 h-8 w-18 md:w-20 lg:w-20 p-2`}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          css={undefined}
          crossOrigin={undefined}
        />
      )}
    </>
  );
};

export default CombinationInput;