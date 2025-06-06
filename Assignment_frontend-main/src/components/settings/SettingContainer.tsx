"use client";

import { FC, ReactNode } from "react";
import { Button } from "@windmill/react-ui";
import { FiSettings } from "react-icons/fi";
import { useTranslation } from "react-i18next";

// internal import
import spinnerLoadingImage from "@/assets/img/spinner.gif";

/* -------------------------------------------------------------------------- */
/*                              Props definition                              */
/* -------------------------------------------------------------------------- */
interface SettingContainerProps {
  /** If `true`, show “Save”; otherwise show “Update”. */
  isSave: boolean;
  /** Section heading text. */
  title: string;
  /** Inner form/content to be rendered beneath the heading. */
  children: ReactNode;
  /** Disables the action button and shows the spinner. */
  isSubmitting: boolean;
}

const SettingContainer: FC<SettingContainerProps> = ({
  isSave,
  title,
  children,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-12 font-sans pr-4">
      <div className="col-span-12">
        {/* Sticky action bar */}
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

        {/* Heading */}
        <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 md:mb-3 mb-1">
          <FiSettings className="mt-1 mr-2" />
          {title}
        </div>

        <hr className="md:mb-12 mb-3" />

        {/* Inner content */}
        {children}
      </div>
    </div>
  );
};

export default SettingContainer;
