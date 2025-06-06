'use client';

import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return <h2 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">{children}</h2>
}

export default SectionTitle
