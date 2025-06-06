'use client';

import Multiselect from "multiselect-react-dropdown";
import Tree from "rc-tree";
import { Key } from "rc-tree/lib/interface";
import { ReactElement, Dispatch, SetStateAction } from "react"; // Import Dispatch and SetStateAction

//internal import
import useAsync from "@/hooks/useAsync";
import { notifySuccess } from "@/utils/toast";
import CategoryServices from "@/services/CategoryServices";
import useUtilsFunction from "@/hooks/useUtilsFunction";

// Assuming Localised is defined somewhere, if not, add it.
type Localised = { [lang: string]: string | undefined };

interface Category {
  _id: string;
  name: string | Localised; // Corrected: name can be a Localised object for i18n
  description?: string | Localised; // Added: description can also be localised
  children?: Category[];
  // Add other properties if they exist
}

interface SelectedCategory {
  _id: string;
  name: string; // This should be string as it's the displayed value
}

interface ParentCategoryProps {
  selectedCategory: SelectedCategory[];
  // Corrected type for React state setters
  setSelectedCategory: Dispatch<SetStateAction<SelectedCategory[]>>;
  setDefaultCategory: Dispatch<SetStateAction<SelectedCategory[]>>;
}

const ParentCategory = ({
  selectedCategory,
  setSelectedCategory,
  setDefaultCategory,
}: ParentCategoryProps): ReactElement => {
  // Ensure useAsync handles the correct return type for data
  const { data, loading } = useAsync<Category[]>(CategoryServices?.getAllCategory);
  const { showingTranslateValue } = useUtilsFunction();

  const STYLE = `
    .rc-tree-child-tree {
      display: block;
    }
    .node-motion {
      transition: all .3s;
      overflow-y: hidden;
    }
  `;

  const motion = {
    motionName: "slide-up",
    motionAppear: false,
    onAppearStart: (node: HTMLElement) => ({ height: 0 }),
    onAppearActive: (node: HTMLElement) => ({ height: node.scrollHeight }),
    onLeaveStart: (node: HTMLElement) => ({ height: node.offsetHeight }),
    onLeaveActive: () => ({ height: 0 }),
  };

  const renderCategories = (categories: Category[]): any[] => {
    return categories.map((category) => ({
      title: showingTranslateValue(category.name),
      key: category._id,
      children: category?.children?.length > 0
        ? renderCategories(category.children)
        : undefined,
    }));
  };

  const findObject = (obj: Category, target: string): Category | undefined => {
    return obj._id === target
      ? obj
      : obj?.children?.reduce<Category | undefined>(
        (acc, obj) => acc ?? findObject(obj, target),
        undefined
      );
  };

  const handleSelect = (key: Key) => {
    if (!data || data.length === 0) return;

    // The data from useAsync for categories should be an array of Category,
    // so we should iterate over it to find the object, not assume data[0] is the only object.
    // Assuming 'data' is an array of top-level categories:
    let result: Category | undefined;
    for (const topCategory of data) {
      result = findObject(topCategory, key.toString());
      if (result) break;
    }

    if (result !== undefined) {
      const getCategory = selectedCategory.filter(
        (value) => value._id === result._id
      );

      if (getCategory.length !== 0) {
        return notifySuccess("This category already selected!");
      }

      const newSelectedCategoryItem: SelectedCategory = {
        _id: result._id,
        name: showingTranslateValue(result.name), // Ensure this returns a string
      };

      setSelectedCategory((prev: SelectedCategory[]) => [ // Explicitly type prev here
        ...prev,
        newSelectedCategoryItem,
      ]);
      setDefaultCategory((prev: SelectedCategory[]) => [ // Explicitly type prev here
        ...prev,
        newSelectedCategoryItem,
      ]);
    }
  };

  const handleRemove = (v: SelectedCategory[]) => {
    setSelectedCategory(v); // This is fine as it directly sets the new array
  };

  return (
    <>
      <div className="mb-2">
        <Multiselect
          displayValue="name"
          groupBy="name" // This might be problematic if 'name' is Localised; ensure it's a string for grouping
          isObject={true}
          hidePlaceholder={true}
          onKeyPressFn={() => { }}
          onRemove={handleRemove}
          onSearch={() => { }}
          onSelect={handleSelect}
          selectedValues={selectedCategory}
          placeholder="Select Category"
        />
      </div>

      {!loading && data !== undefined && (
        <div className="draggable-demo capitalize">
          <style dangerouslySetInnerHTML={{ __html: STYLE }} />
          <Tree
            expandAction="click"
            treeData={renderCategories(data)}
            onSelect={(v) => handleSelect(v[0])} // v is Key[] so v[0] is Key
            motion={motion}
          />
        </div>
      )}
    </>
  );
};

export default ParentCategory;