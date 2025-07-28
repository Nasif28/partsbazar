export default function FrontendLayout({ children }) {
  return (
    <>
      <main
        className="py-12 relative"
        style={{
          backgroundImage: `url(/authbg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>

        <main>{children}</main>
      </main>
    </>
  );
}
