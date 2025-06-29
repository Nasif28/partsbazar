"use client";
import "../styles/globals.css";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

// export const metadata = {
//   title: "Parts Bazar",
//   description: "A Complete Vehicle Parts Shop",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
