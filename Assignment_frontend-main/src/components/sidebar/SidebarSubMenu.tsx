'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoRemoveSharp,
} from "react-icons/io5";

// Type definitions for sidebar items
interface SidebarSubItem {
  path: string;
  name: string;
  outside?: string;
}

interface SidebarItem {
  path?: string;
  icon: React.ComponentType<any>;
  name: string;
  routes?: SidebarSubItem[];
}

interface SidebarSubMenuProps {
  route: SidebarItem;
}

const SidebarSubMenu: React.FC<SidebarSubMenuProps> = ({ route }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <li className="relative px-6 py-3" key={route.name}>
        <button
          className="inline-flex items-center justify-between focus:outline-none w-full text-sm font-semibold transition-colors duration-150 hover:text-emerald-600 dark:hover:text-gray-200"
          onClick={() => setOpen(!open)}
          aria-haspopup="true"
        >
          <span className="inline-flex items-center">
            <route.icon className="w-5 h-5" aria-hidden="true" />
            <span className="ml-4 mt-1">{t(`${route.name}`)}</span>
            <span className="pl-4 mt-1">
              {open ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
            </span>
          </span>
          {/* <DropdownIcon className="w-4 h-4" aria-hidden="true" /> */}
        </button>
        {open && (
          <ul
            className="p-2  overflow-hidden text-sm font-medium text-gray-500 rounded-md dark:text-gray-400 dark:bg-gray-900"
            aria-label="submenu"
          >
            {route.routes?.map((child, i) => (
              <li key={i + 1}>
                {child?.outside ? (
                  <a
                    href={process.env.NEXT_PUBLIC_STORE_DOMAIN}
                    target="_blank"
                    className="flex items-center font-serif py-1 text-sm text-gray-600 hover:text-emerald-600 cursor-pointer"
                    // activeStyle={{
                    //   color: "#0d9e6d",
                    // }}
                    rel="noreferrer"
                  >
                    {pathname === child.path && (
                      <span
                        className="absolute inset-y-0 left-0 w-1 bg-emerald-500 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"
                      ></span>
                    )}
                    {/* <route.icon className="w-5 h-5" aria-hidden="true" /> */}
                    <span className="text-xs text-gray-500 pr-1">
                      <IoRemoveSharp />
                    </span>
                    <span className="text-gray-500 hover:text-emerald-600 dark:hover:text-gray-200">
                      {t(`${child.name}`)}
                    </span>
                    {/* <span className="ml-4">{route.name}</span> */}
                  </a>
                ) : (
                  <Link
                    href={child.path}
                    className={`flex items-center font-serif py-1 text-sm text-gray-600 hover:text-emerald-600 cursor-pointer ${
                      pathname === child.path ? "text-emerald-500 dark:text-gray-100" : ""
                    }`}
                    rel="noreferrer"
                  >
                    {pathname === child.path && (
                      <span
                        className="absolute inset-y-0 left-0 w-1 bg-emerald-600 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"
                      ></span>
                    )}
                    <span className="text-xs text-gray-500 pr-1">
                      <IoRemoveSharp />
                    </span>
                    <span className="text-gray-500 hover:text-emerald-600 dark:hover:text-gray-200">
                      {t(`${child.name}`)}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    </>
  );
};

export default SidebarSubMenu;
