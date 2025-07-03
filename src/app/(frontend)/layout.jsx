import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TopBar from "@/components/Header/TopBar";

export default function FrontendLayout({ children }) {
  return (
    <>
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
