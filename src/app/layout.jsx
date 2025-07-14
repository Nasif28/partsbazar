import { defaultMetadata } from "./metadata";
import "../styles/globals.css";

export const metadata = defaultMetadata;

export default function RootLayout({ children }) {
  const ClientRootLayout = require("./client-layout").default;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
