"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!loading && !token) {
      router.push("/login");
    }
  }, [token, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return token ? children : null;
};

export default ProtectedRoute;
