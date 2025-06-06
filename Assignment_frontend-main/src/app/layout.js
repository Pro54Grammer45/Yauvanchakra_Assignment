// app/layout.js (or layout.tsx if using TypeScript)
// import "./globals.css";
import '@/app/globals.css'
import ClientLayout from "./clientLayout"; // Import the client component
import Head from 'next/head';

export const metadata = {
  title: "D origin Admin",
  description: "Born again, naturally",
  icons: {
    icon: "/Favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <link rel="icon" href="/Favicon.png" type="image/png" sizes="32x32" />
      </Head>
      <body>
        <ClientLayout>{children}</ClientLayout> {/* Wrap with Client Component */}
      </body>
    </html>
  );
}
