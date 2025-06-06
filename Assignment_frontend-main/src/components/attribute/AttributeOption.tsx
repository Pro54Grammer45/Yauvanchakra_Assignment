import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState, useRef, RefObject } from "react";
import useUtilsFunction from "@/hooks/useUtilsFunction";

interface Variant {
  _id: string;
  name: string;
  // Add other properties if they exist
}

interface Attribute {
  _id: string;
  title: string;
  variants: Variant[];
  // Add other properties if they exist
}

interface AttributeOptionProps {
  id: string;
  attributes: Attribute;
  values: Record<string, string[]>;
  setValues: (values: Record<string, string[]>) => void;
  resetRef: RefObject<Record<string, Multiselect | null>>;
}

const AttributeOption: React.FC<AttributeOptionProps> = ({
  id,
  attributes,
  values,
  setValues,
  resetRef,
}) => {
  const [attributeOptions, setAttributeOptions] = useState<Variant[]>([]);
  const [selectionLimit, setSelectionLimit] = useState<number | null>(null);

  const { showingTranslateValue } = useUtilsFunction();

  const handleSelectValue = (v: Variant[], el: Variant) => {
    if (el?.name === "All") {
      const result = attributes?.variants.filter((att) => att._id !== "1");

      setValues({
        ...values,
        [attributes._id]: result?.map((el) => el._id),
      });

      setSelectionLimit(1);
    } else {
      setSelectionLimit(null);
      const dd = attributes?.variants.map((val) => {
        return {
          ...val,
          name: showingTranslateValue(val?.name),
        };
      });
      setAttributeOptions(dd);

      const exceptAllData = v.filter((el) => el._id !== "1");
      setValues({
        ...values,
        [attributes._id]: exceptAllData.map((el) => el._id),
      });
    }
  };

  const handleRemoveValue = (v: Variant[], el: Variant, id: string) => {
    if (el._id === "1") {
      setSelectionLimit(1);
      let dd = attributes?.variants?.map((val) => {
        return {
          ...val,
          name: showingTranslateValue(val?.name),
        };
      });

      setAttributeOptions([]);
      setAttributeOptions(dd);
    } else {
      setSelectionLimit(null);
      const exceptAllData = v.filter((el) => el._id !== "1");

      setValues({
        ...values,
        [attributes._id]: exceptAllData.map((el) => el._id),
      });
    }
  };

  useEffect(() => {
    const dd = attributes?.variants?.map((val) => {
      return {
        ...val,
        name: showingTranslateValue(val?.name),
      };
    });
    setAttributeOptions(dd);
  }, [attributes?.variants]);

  return (
    <>
      <Multiselect
        key={id}
        displayValue="name"
        hidePlaceholder={true}
        options={attributeOptions}
        selectionLimit={selectionLimit}
        onSearch={function noRefCheck() {}}
        onKeyPressFn={function noRefCheck() {}}
        ref={(e) => {
          if (resetRef.current) {
            resetRef.current[id] = e;
          }
        }}
        onSelect={(v: Variant[], el: Variant) => handleSelectValue(v, el)}
        onRemove={(v: Variant[], el: Variant) => handleRemoveValue(v, el, id)}
        placeholder={showingTranslateValue(attributes.title)}
      />
    </>
  );
};

export default AttributeOption;