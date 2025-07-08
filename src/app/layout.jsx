"use client";
import { ThemeProvider } from "@/providers/theme-provider";
import "../styles/globals.css";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner";

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
              {children}
              <Toaster position="top-right" richColors />
            </div>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
