'use client';

import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import useUtilsFunction from "@/hooks/useUtilsFunction";

interface Variant {
  _id: string;
  name: string;
  // Add other properties if they exist
}

interface Attribute {
  _id: string;
  variants: Variant[];
  // Add other properties if they exist
}

interface Option {
  _id: string;
  name: string;
  label: string;
  value: string;
  // Add other properties if they exist
}

interface AttributeOptionTwoProps {
  attributes: Attribute;
  values: Record<string, string[]>;
  setValues: (values: Record<string, string[]>) => void;
  selectedValueClear: boolean;
}

const AttributeOptionTwo: React.FC<AttributeOptionTwoProps> = ({
  attributes,
  values,
  setValues,
  selectedValueClear,
}) => {
  const [attributeOptions, setAttributeOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<Option[]>([]);

  const { showingTranslateValue } = useUtilsFunction();

  const handleSelectValue = (items: Option[]) => {
    setSelected(items);
    setValues({
      ...values,
      [attributes._id]: items?.map((el) => el._id),
    });
  };

  useEffect(() => {
    const options = attributes?.variants?.map((val) => ({
      ...val,
      label: showingTranslateValue(val?.name),
      value: val?._id,
    }));
    setAttributeOptions(options || []);
  }, [attributes?.variants, showingTranslateValue]);

  useEffect(() => {
    if (selectedValueClear) {
      setSelected([]);
    }
  }, [selectedValueClear]);

  return (
    <div>
      <MultiSelect
        options={attributeOptions}
        value={selected}
        onChange={handleSelectValue}
        labelledBy="Select"
      />
    </div>
  );
};

export default AttributeOptionTwo;