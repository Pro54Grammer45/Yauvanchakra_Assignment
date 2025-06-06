'use client';

import { Select } from "@windmill/react-ui";
import { UseFormRegister } from "react-hook-form";

interface SelectRoleProps {
  setRole: (value: string) => void;
  register: UseFormRegister<any>;
  name: string;
  label: string;
}

const SelectRole: React.FC<SelectRoleProps> = ({ setRole, register, name, label }) => {
  return (
    <Select
      onChange={(e) => setRole(e.target.value)}
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
      <option value="Staff role"  hidden>
        Staff role
      </option>
      <option value="Super Admin">Super Admin</option>
    </Select>
  );
};

export default SelectRole;