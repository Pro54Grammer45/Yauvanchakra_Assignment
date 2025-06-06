'use client';

import { useTranslation } from "react-i18next";
import Link from "next/link";
import "react-tabs/style/react-tabs.css";

const StoreTabList = () => {
  const { t } = useTranslation();

  // Define type for tab items
  type TabItem = {
    href: string;
    translationKey: string;
    mobileLabel: string;
  };

  // Tab data array
  const tabs: TabItem[] = [
    {
      href: "/store/customization?storeTab=home-settings",
      translationKey: "HomeSettings",
      mobileLabel: "Tab-1"
    },
    {
      href: "/store/customization?storeTab=single-setting",
      translationKey: "SingleSetting",
      mobileLabel: "Tab-2"
    },
    {
      href: "/store/customization?storeTab=about-us-setting",
      translationKey: "AboutUsSetting",
      mobileLabel: "Tab-3"
    },
    {
      href: "/store/customization?storeTab=privacy-setting",
      translationKey: "PrivacyTCSetting",
      mobileLabel: "Tab-4"
    },
    {
      href: "/store/customization?storeTab=FAQ-setting",
      translationKey: "FAQSetting",
      mobileLabel: "Tab-5"
    },
    {
      href: "/store/customization?storeTab=offers-setting",
      translationKey: "OffersStting",
      mobileLabel: "Tab-6"
    },
    {
      href: "/store/customization?storeTab=contact-us-setting",
      translationKey: "ContactUsStting",
      mobileLabel: "Tab-7"
    }
  ];

  return (
    <ul className="sm:flex grid grid-cols-3 text-sm font-medium text-center text-gray-500 sm:divide-x divide-gray-200 rounded-lg dark:divide-gray-700 dark:text-gray-400 mb-5">
      {tabs.map((tab, index) => (
        <li key={tab.translationKey}>
          <Link
            href={tab.href}
            className={`inline-block w-full p-4 shadow bg-white hover:text-white hover:bg-emerald-500 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-emerald-500 ${
              index === 0 ? 'rounded-l-md' : ''
            }`}
          >
            <span className="text-sm font-medium font-serif xl:inline-block hidden">
              {t(tab.translationKey)}
            </span>
            <span className="text-sm font-medium font-serif xl:hidden">
              {tab.mobileLabel}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default StoreTabList;