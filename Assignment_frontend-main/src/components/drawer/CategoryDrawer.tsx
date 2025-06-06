'use client';

import { Input } from "@windmill/react-ui";
import { FC } from "react";

import Tree from "rc-tree";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import { notifyError } from "@/utils/toast";
import Error from "@/components/form/others/Error";
import Title from "@/components/form/others/Title";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import TextAreaCom from "@/components/form/input/TextAreaCom";
import Uploader from "@/components/image-uploader/Uploader";
import useCategorySubmit from "@/hooks/useCategorySubmit";
import CategoryServices from "@/services/CategoryServices";
import DrawerButton from "@/components/form/button/DrawerButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";

export interface Category {
  _id: string;
  name: string | { [lang: string]: string | undefined };
  description?: string | { [lang: string]: string | undefined };
  icon?: string;
  status: 'active' | 'inactive' | boolean;
  children: Category[];
}

// Add type definitions for props
interface CategoryDrawerProps {
  id?: string;
  data: Category | undefined; 
  lang?: string; 
}

const CategoryDrawer: FC<CategoryDrawerProps> = ({ id, data }) => {
  const { t } = useTranslation();

  const {
    checked,
    register,
    onSubmit,
    handleSubmit,
    errors,
    imageUrl,
    setImageUrl,
    published,
    setPublished,
    setChecked,
    selectCategoryName,
    setSelectCategoryName,
    handleSelectLanguage,
    isSubmitting,
  } = useCategorySubmit(id, data);

  const { showingTranslateValue } = useUtilsFunction();

  const STYLE = `
  .rc-tree-child-tree {
    display: hidden;
  }
  .node-motion {
    transition: all .3s;
    overflow-y: hidden;
  }
`;

  const motion = {
    motionName: "node-motion",
    motionAppear: false,
    onAppearStart: (node) => {
      return { height: 0 };
    },
    onAppearActive: (node) => ({ height: node.scrollHeight }),
    onLeaveStart: (node) => ({ height: node.offsetHeight }),
    onLeaveActive: () => ({ height: 0 }),
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        title: showingTranslateValue(category.name),
        key: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  const findObject = (obj, target) => {
    return obj._id === target
      ? obj
      : obj?.children?.reduce(
          (acc, obj) => acc ?? findObject(obj, target),
          undefined
        );
  };

  const handleSelect = async (key) => {
    // console.log('key', key, 'id', id);
    if (key === undefined) return;
    if (id) {
      const parentCategoryId = await CategoryServices.getCategoryById(key);

      if (id === key) {
        return notifyError("This can't be select as a parent category!");
      } else if (id === parentCategoryId.parentId) {
        return notifyError("This can't be select as a parent category!");
      } else {
        if (key === undefined) return;
        setChecked(key);

        const obj = data[0];
        const result = findObject(obj, key);

        setSelectCategoryName(showingTranslateValue(result?.name));
      }
    } else {
      if (key === undefined) return;
      setChecked(key);

      const obj = data[0];
      const result = findObject(obj, key);

      setSelectCategoryName(showingTranslateValue(result?.name));
    }
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateCategory")}
            description={t("UpdateCategoryDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("AddCategoryTitle")}
            description={t("AddCategoryDescription")}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Name")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Category title"
                  name="name"
                  type="text"
                  placeholder={t("ParentCategoryPlaceholder")}
                  defaultValue={undefined}
                  autoComplete={undefined}
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Description")} />
              <div className="col-span-8 sm:col-span-4">
                <TextAreaCom
                  register={register}
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Category Description"
                  required={false}
                  value={undefined}
                />
                <Error errorName={errors.description} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("ParentCategory")} />
              <div className="col-span-8 sm:col-span-4 relative">
                <Input
                  readOnly
                  {...register(`parent`, {
                    required: false,
                  })}
                  name="parent"
                  value={selectCategoryName ? selectCategoryName : "Home"}
                  placeholder={t("ParentCategory")}
                  type="text"
                  required={false}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  css={undefined}
                  crossOrigin={undefined}
                />

                <div className="draggable-demo capitalize">
                  <style dangerouslySetInnerHTML={{ __html: STYLE }} />
                  <Tree
                    expandAction="click"
                    treeData={renderCategories(data)}
                    selectedKeys={[checked]}
                    onSelect={(v) => handleSelect(v[0])}
                    motion={motion}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("CategoryIcon")} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  folder="category"
                  targetWidth={238}
                  targetHeight={238}
                  product={undefined}
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Published")} />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggle
                  id="category-published"
                  title={t("Published")}
                  handleProcess={setPublished}
                  processOption={published}
                />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Category" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default CategoryDrawer;
