'use client';

import { FC, ReactNode } from 'react';

interface AnimatedContentProps {
  children: ReactNode;
}

const AnimatedContent: FC<AnimatedContentProps> = ({ children }) => (
  <div className="tab tab-enter">{children}</div>
);

export default AnimatedContent;
