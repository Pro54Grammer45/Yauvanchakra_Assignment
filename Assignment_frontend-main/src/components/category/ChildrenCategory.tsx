'use client';

import { useEffect, useState, ReactElement } from "react";

//internal import
import useAsync from "@/hooks/useAsync";
import CategoryServices from "@/services/CategoryServices";

interface Category {
  parentName: string;
  // Add other properties if they exist
}

interface ChildrenCategoryProps {
  value: string;
}

const ChildrenCategory = ({ value }: ChildrenCategoryProps): ReactElement => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { data } = useAsync<Category[]>(CategoryServices.getAllCategory);

  useEffect(() => {
    if (value) {
      const result = data?.filter((parent) =>
        parent.parentName.toLowerCase().includes(value.toLowerCase())
      ) || [];
      setCategories(result);
    } else {
      setCategories(data || []);
    }
  }, [data, value]);

  return (
    <>
      {categories?.map((category) => (
        <option key={category.parentName} value={category.parentName}>
          {category.parentName}
        </option>
      ))}
    </>
  );
};

export default ChildrenCategory;