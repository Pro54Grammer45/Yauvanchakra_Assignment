'use client';

import { Select } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import useAsync from "@/hooks/useAsync";
import CategoryServices from "@/services/CategoryServices";
import useUtilsFunction from "@/hooks/useUtilsFunction";

interface Category {
  _id: string;
  name: string | { [key: string]: string };
}

interface SelectCategoryProps {
  setCategory: (value: string) => void;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ setCategory }) => {
  const { t } = useTranslation();
  const { data } = useAsync(CategoryServices.getAllCategories);
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <Select onChange={(e) => setCategory(e.target.value)} 
      placeholder="Select status"
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      css={undefined}
      defaultValue="All"
      >
      <option value="All" hidden>
        {t("Category")}
      </option>
      {data?.map((cat: Category) => (
        <option key={cat._id} value={cat._id}>
          {showingTranslateValue(cat?.name)}
        </option>
      ))}
    </Select>
  );
};

export default SelectCategory;