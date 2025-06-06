'use client';

import { useContext, Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";

//internal import
import Main from "@/layout/Main";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarContext } from "@/context/SidebarContext";
import ThemeSuspense from "@/components/theme/ThemeSuspense";

const Layout = ({ children }) => {
  const { isSidebarOpen, closeSidebar, navBar } = useContext(SidebarContext);
  const pathname = usePathname();

  const isOnline = typeof window !== 'undefined' ? navigator.onLine : true;

  useEffect(() => {
    closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {!isOnline && (
        <div className="flex justify-center bg-red-600 text-white">
          You are in offline mode!{" "}
        </div>
      )}
      <div
        className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
          isSidebarOpen && "overflow-hidden"
        }`}
      >
        {navBar && <Sidebar />}

        <div className="flex flex-col flex-1 w-full">
          <Header />
          <Main>
            <Suspense fallback={<ThemeSuspense />}>
              {children}
            </Suspense>
          </Main>
        </div>
      </div>
    </>
  );
};

export default Layout;
