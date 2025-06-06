'use client';

import Head from 'next/head';
import { FC } from 'react';

interface PageTitleProps {
  title?: string;
  description?: string;
}

const PageTitle: FC<PageTitleProps> = ({ title, description }) => (
  <Head>
    <title>
      {title
        ? `${title} | React eCommerce Admin Dashboard`
        : 'Kachabazar | React eCommerce Admin Dashboard'}
    </title>
    <meta
      name="description"
      content={
        description ??
        'Kachabazar : React Grocery & Organic Food Store e-commerce Admin Dashboard'
      }
    />
  </Head>
);

export default PageTitle;
