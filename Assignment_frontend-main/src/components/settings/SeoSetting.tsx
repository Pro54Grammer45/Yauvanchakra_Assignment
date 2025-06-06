"use client";

import { FC } from "react";
import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiSettings } from "react-icons/fi";
import {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

// internal imports
import Error from "@/components/form/others/Error";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import InputAreaTwo from "@/components/form/input/InputAreaTwo";
import Uploader from "@/components/image-uploader/Uploader";
import TextAreaCom from "@/components/form/others/TextAreaCom";

/**
 * --- Form model ------------------------------------------------------------
 * Adjust the keys here if you later add / rename any form fields.
 */
interface SeoFormValues {
  meta_title: string;
  meta_description: string;
  meta_url: string;
  meta_keywords: string;
}

/**
 * --- Component props -------------------------------------------------------
 * • `register` / `errors` come from react-hook-form.
 * • `favicon`/`metaImg` are the current URLs.  
 *   Use an empty string ("") when no image is selected.
 * • `setFavicon` / `setMetaImg` must update the parent state.
 */
interface SeoSettingProps {
  errors: FieldErrors<SeoFormValues>;
  register: UseFormRegister<SeoFormValues>;
  isSave: boolean;
  favicon: string;
  setFavicon: (url: string) => void;
  metaImg: string;
  setMetaImg: (url: string) => void;
  isSubmitting: boolean;
}

const SeoSetting: FC<SeoSettingProps> = ({
  errors,
  register,
  isSave,
  favicon,
  setFavicon,
  metaImg,
  setMetaImg,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Action bar --------------------------------------------------------- */}
      <div className="sticky top-0 z-20 flex justify-end">
        {isSubmitting ? (
          <Button disabled type="button" className="h-10 px-6">
            <img src={spinnerLoadingImage.src} alt="Loading" width={20} height={10} />
            <span className="font-serif ml-2 font-light">{t("Processing")}</span>
          </Button>
        ) : (
          <Button type="submit" className="h-10 px-6">
            {isSave ? t("SaveBtn") : t("UpdateBtn")}
          </Button>
        )}
      </div>

      {/* Main card ---------------------------------------------------------- */}
      <div className="grid grid-cols-12 font-sans">
        <div className="col-span-12 mr-3">
          <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 mb-3 relative">
            <FiSettings className="mt-1 mr-2" />
            {t("SeoSettings") ?? "Seo Settings"}
          </div>

          <hr className="md:mb-12 mb-2" />

          <div className="lg:px-6 pt-4 lg:pl-40 lg:pr-40 md:pl-5 md:pr-5 flex-grow scrollbar-hide w-full max-h-full pb-0">
            {/* 1. Favicon ---------------------------------------------------- */}
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 mb-6">
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                {t("Favicon")}
              </label>
              <div className="sm:col-span-3">
                <Uploader imageUrl={favicon} setImageUrl={setFavicon} folder={''} />
              </div>
            </div>

            {/* 2. Meta Title ------------------------------------------------- */}
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 mb-6">
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                {t("MetaTitle")}
              </label>
              <div className="sm:col-span-3">
                <InputAreaTwo
                  register={register}
                  label={t("MetaTitle")}
                  name="meta_title"
                  type="text"
                  placeholder={t("MetaTitle")}
                />
                <Error errorName={errors.meta_title} />
              </div>
            </div>

            {/* 3. Meta Description ------------------------------------------ */}
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 mb-6">
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                {t("MetaDescription")}
              </label>
              <div className="sm:col-span-3">
                <TextAreaCom
                  required
                  register={register}
                  label={t("MetaDescription")}
                  name="meta_description"
                  type="text"
                  placeholder={t("MetaDescription")}
                />
                <Error errorName={errors.meta_description} />
              </div>
            </div>

            {/* 4. Meta URL --------------------------------------------------- */}
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 mb-6">
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                {t("MetaUrl")}
              </label>
              <div className="sm:col-span-3">
                <InputAreaTwo
                  register={register}
                  label={t("MetaUrl")}
                  name="meta_url"
                  type="text"
                  placeholder={t("MetaUrl")}
                />
                <Error errorName={errors.meta_url} />
              </div>
            </div>

            {/* 5. Meta Keywords --------------------------------------------- */}
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 mb-6">
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                {t("MetaKeyword")}
              </label>
              <div className="sm:col-span-3">
                <TextAreaCom
                  register={register}
                  label={t("MetaKeyword")}
                  name="meta_keywords"
                  type="text"
                  placeholder={t("MetaKeyword")}
                />
                <Error errorName={errors.meta_keywords} />
              </div>
            </div>

            {/* 6. Meta Image ------------------------------------------------- */}
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 mb-6">
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                {t("MetaImage")}
              </label>
              <div className="sm:col-span-3">
                <Uploader imageUrl={metaImg} setImageUrl={setMetaImg} folder={''} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeoSetting;
