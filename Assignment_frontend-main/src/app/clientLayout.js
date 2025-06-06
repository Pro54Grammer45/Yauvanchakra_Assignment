// // app/ClientLayout.js (or ClientLayout.tsx)
// "use client"; // Mark this as a Client Component

// import { Provider } from "react-redux";
// import reduxStore from "../reduxStore/store";
// import { AdminProvider } from "@/context/AdminContext";
// import Header from "@/components/header/Header";

// export default function ClientLayout({ children }) {
//   return <Provider store={reduxStore}>
//     <AdminProvider>
//       <Header/>
//     {children}
//     </AdminProvider>
//   </Provider>;
// }


"use client";
import React, { Suspense, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Windmill } from "@windmill/react-ui";
import myTheme from "@/assets/theme/myTheme";
import { AdminProvider } from "@/context/AdminContext";
import { SidebarProvider } from "@/context/SidebarContext";
import ThemeSuspense from "@/components/theme/ThemeSuspense";
import reduxStore from "@/reduxStore/store";

// If you want to add Header globally, import it here
import Header from "@/components/header/Header";

export default function ClientLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));
  const persistor = persistStore(reduxStore);

  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <Provider store={reduxStore}>
          <PersistGate loading={null} persistor={persistor}>
            <SidebarProvider>
              <Suspense fallback={<ThemeSuspense />}>
                <Windmill usePreferences theme={myTheme}>
                  <Header />
                  {children}
                </Windmill>
              </Suspense>
            </SidebarProvider>
          </PersistGate>
        </Provider>
      </AdminProvider>
    </QueryClientProvider>
  );
}