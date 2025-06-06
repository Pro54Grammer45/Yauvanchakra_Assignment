'use client';

import { ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">{children}</h1>
  )
}

export default PageTitle
