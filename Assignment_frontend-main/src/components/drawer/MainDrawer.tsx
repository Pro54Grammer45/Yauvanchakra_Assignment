'use client';
import Drawer from 'rc-drawer';
import { useContext, useEffect, useState, FC, ReactNode } from 'react';
import { FiX } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { SidebarContext } from '@/context/SidebarContext';

interface MainDrawerProps {
  children: ReactNode;
  product?: boolean;
}

const MainDrawer: FC<MainDrawerProps> = ({ children, product = false }) => {
  const { toggleDrawer, isDrawerOpen, closeDrawer, windowDimension } = useContext(SidebarContext);
  const [isProduct, setIsProduct] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/products') setIsProduct(true);
  }, [pathname]);

  const width = windowDimension <= 575 ? '100%' : product || isProduct ? '85%' : '50%';

  return (
    <Drawer open={isDrawerOpen} onClose={closeDrawer} placement="right" width={width}>
      <button onClick={toggleDrawer} className="absolute focus:outline-none z-10 text-red-500 hover:bg-red-100 hover:text-gray-700 transition-colors duration-150 bg-white shadow-md mr-6 mt-6 right-0 w-10 h-10 rounded-full">
        <FiX className="mx-auto" />
      </button>
      <div className="flex flex-col w-full h-full justify-between">{children}</div>
    </Drawer>
  );
};
export default MainDrawer;