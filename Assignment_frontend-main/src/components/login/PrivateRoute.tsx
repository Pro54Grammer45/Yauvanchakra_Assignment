'use client';

import { ReactNode, useContext } from "react";
import { useRouter } from "next/navigation";
import { AdminContext } from "@/context/AdminContext";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const router = useRouter();

  if (!adminInfo?.email) {
    router.push('/login');
    return null;
  }

  return children;
};

export default PrivateRoute;