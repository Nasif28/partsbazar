"use client";
import { ThemeProvider } from "@/providers/theme-provider";
import "../styles/globals.css";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "@/providers/auth-provider";

// export const metadata = {
//   title: "Authentication System",
//   description: "Next.js authentication with Redux and JWT",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Provider store={store}>
            <div className="maxContainer">
              <StoreProvider>{children}</StoreProvider>
              <Toaster position="top-right" richColors />
            </div>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
