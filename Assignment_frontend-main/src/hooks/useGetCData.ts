'use client';

import { AdminContext } from "@/context/AdminContext";
import { usePathname } from "next/navigation";
import { useContext } from "react";

interface GetCDataResult {
  role: string;
  path: string | undefined;
  accessList: string[];
}

const useGetCData = (): GetCDataResult => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const pathname = usePathname();
  const path = pathname?.split("?")[0].split("/")[1];

  // Always return full access
  return {
    role: "Super Admin",
    path,
    accessList: [
      "dashboard",
      "products",
      "orders",
      "customers",
      "settings",
      "staff",
      "reports",
      "store-settings",
      "coupons",
      "categories",
      "attributes",
    ],
  };
};

export default useGetCData;
