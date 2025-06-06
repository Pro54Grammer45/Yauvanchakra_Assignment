'use client';

import { Select } from "@windmill/react-ui";
import { UseFormRegister } from "react-hook-form";
import useAsync from "@/hooks/useAsync";
import CurrencyServices from "@/services/CurrencyServices";

interface Currency {
  _id: string;
  symbol: string;
  name: string;
}

interface SelectCurrencyProps {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  required?: boolean;
}

const SelectCurrency: React.FC<SelectCurrencyProps> = ({
  register,
  name,
  label,
  required = false,
}) => {
  const { data, loading } = useAsync(CurrencyServices.getShowingCurrency);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <Select
          name={name}
          {...register(name, {
            required: required ? `${label} is required!` : false,
          })}
            placeholder="Select status"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            css={undefined}
        >
          {data?.map((currency: Currency) => (
            <option key={currency._id} value={currency.symbol}>
              {currency?.name}
            </option>
          ))}
        </Select>
      )}
    </>
  );
};

export default SelectCurrency;