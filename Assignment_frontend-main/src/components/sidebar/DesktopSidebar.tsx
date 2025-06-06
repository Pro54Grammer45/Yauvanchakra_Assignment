'use client';

import React from "react";
import SidebarContent from "@/components/sidebar/SidebarContent";

const DesktopSidebar: React.FC = () => {
  return (
    <aside className="z-30 flex-shrink-0 hidden shadow-sm w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:block">
      <SidebarContent />
    </aside>
  );
};

export default DesktopSidebar;
