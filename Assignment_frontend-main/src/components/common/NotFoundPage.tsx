'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, FC } from 'react';
import notFound from '@/assets/img/404.svg';

const NotFoundPage: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === '/') router.replace('/dashboard');
  }, [pathname, router]);

  return (
    <div className="px-6 py-16 lg:py-20 h-screen flex flex-wrap content-center">
      <div className="mx-auto text-center">
        <Image width={650} height={450} src={notFound} alt="404" />
        <h2 className="font-bold font-serif dark:text-gray-200 text-2xl lg:text-4xl leading-7 mb-4">
          Page is not found!
        </h2>
        <p className="text-red-400 text-lg">
          Sorry you don&apos;t have access to this page!
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
