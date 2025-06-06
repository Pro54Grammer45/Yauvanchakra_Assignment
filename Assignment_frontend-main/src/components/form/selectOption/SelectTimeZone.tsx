'use client';
import { Select } from "@windmill/react-ui";
//internal import
import { timeZones } from "@/utils/timezones";

// Type definitions
interface TimeZone {
  tzCode: string;
  label: string;
  // Add other timezone properties as needed
}

interface SelectTimeZoneProps {
  register: any; // You might want to type this more specifically based on your form library (e.g., UseFormRegister from react-hook-form)
  name: string;
  label: string;
  required?: boolean;
}

const SelectTimeZone: React.FC<SelectTimeZoneProps> = ({ 
  register, 
  name, 
  label, 
  required = false 
}) => {
  return (
    <Select
      name={name}
      {...register(`${name}`, {
        required: required ? `${label} is required!` : false,
      })}
      defaultValue=""
    >
      <option value=""  hidden>
        Default Time Zone
      </option>
      {timeZones.map((timeZone: TimeZone, i: number) => (
        <option
          key={i + 1}
          value={timeZone.tzCode}
          className="py-12 hover:bg-white"
        >
          {timeZone.label}
        </option>
      ))}
    </Select>
  );
};

export default SelectTimeZone;