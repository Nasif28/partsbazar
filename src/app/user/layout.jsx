import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserLayout({ children }) {
  return (
    <>
      <ProtectedRoute>
        <main>{children}</main>
      </ProtectedRoute>
    </>
  );
}
