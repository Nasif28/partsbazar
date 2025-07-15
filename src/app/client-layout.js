// client-layout.jsx
"use client";

import { ThemeProvider } from "@/providers/theme-provider";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "@/providers/auth-provider";

export default function ClientRootLayout({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Provider store={store}>
        <div className="maxContainer">
          <StoreProvider>
            <main className="min-h-screen">{children}</main>
          </StoreProvider>
          <Toaster position="top-right" richColors />
        </div>
      </Provider>
    </ThemeProvider>
  );
}
