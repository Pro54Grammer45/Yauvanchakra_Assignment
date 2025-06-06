'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
// import { useSidebar } from '@/context/SidebarContext'
import sidebar from '@/routes/sidebar'

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

//  Migrate sidebar data to TypeScript for better type safety

const Sidebar: React.FC = () => {
  const pathname = usePathname()
  // const { isSidebarOpen } = useSidebar()
  const isSidebarOpen = true

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="h-full overflow-y-auto">
        <div className="px-4 py-6">
          <nav>
            {(sidebar as SidebarItem[]).map((item, index) => (
              <div key={index}>
                {item.routes ? (
                  <div className="mb-4">
                    <div className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200">
                      <item.icon className="w-5 h-5 mr-3" />
                      <span>{item.name}</span>
                    </div>
                    <div className="ml-8">
                      {item.routes.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.path}
                          className={`block px-4 py-2 text-sm ${
                            pathname === subItem.path
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.path as string}
                    className={`flex items-center px-4 py-2 ${
                      pathname === item.path
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
