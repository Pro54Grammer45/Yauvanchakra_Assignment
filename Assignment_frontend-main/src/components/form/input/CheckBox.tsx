'use client';

interface CheckBoxProps {
  id: string;
  name: string;
  type: "checkbox" | "radio";
  handleClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({ id, name, type, handleClick, isChecked }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      onChange={handleClick}
      checked={isChecked}
    />
  );
};

export default CheckBox;