'use client';

import { Select } from "@windmill/react-ui";
import { useEffect } from "react";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import useUtilsFunction from "@/hooks/useUtilsFunction";

interface Language {
  iso_code: string;
  name: string;
  _id: string;
}

interface SelectLanguageThreeProps {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  required?: boolean;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

const SelectLanguageThree: React.FC<SelectLanguageThreeProps> = ({
  register,
  name,
  label,
  required = false,
  setValue,
  watch,
}) => {
  const { languages } = useUtilsFunction();
  const selectedLanguage = watch(name);

  useEffect(() => {
    if (!selectedLanguage && languages?.length) {
      setValue(name, languages[0]?.iso_code);
    }
  }, [languages, selectedLanguage, name, setValue]);

  return (
    <Select
      name={name}
      value={selectedLanguage || ""}
      {...register(name, {
        required: required ? `${label} is required!` : false,
      })}
      onChange={(e) => {
        setValue(name, e.target.value);
      }}
      placeholder="Select status"
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      css={undefined}
    >
      <option value="" hidden>
        Select Language
      </option>
      {languages?.map((language: Language, i) => (
        <option key={i + 1} value={language.iso_code}>
          {language.name}
        </option>
      ))}
    </Select>
  );
};

export default SelectLanguageThree;