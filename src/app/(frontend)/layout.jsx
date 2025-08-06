import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/Global/ScrollToTop";
import Header from "@/components/Header/Header";
import TopBar from "@/components/Header/TopBar";

export default function FrontendLayout({ children }) {
  return (
    <div className="maxContainer">
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
