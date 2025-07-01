"use client";
import { ThemeProvider } from "@/providers/theme-provider";
import "../styles/globals.css";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

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
            <div className="maxContainer">{children}</div>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
