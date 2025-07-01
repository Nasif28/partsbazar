import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function FrontendLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
