"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { clearError, forgotPassword } from "@/redux/features/authSlice";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { loading, error, resetEmail } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    await dispatch(forgotPassword(email));
  };

  if (resetEmail) {
    return (
      <div className="space-y-4 text-center">
        <div className="text-primary text-lg font-medium">
          Password reset email sent!
        </div>
        <p className="text-white/70">
          We've sent a password reset OTP to {resetEmail}. Please check your
          inbox.
        </p>
        <Button asChild className="w-full mt-4">
          <Link href="/reset-password">Reset Password</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white">
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2"
          />
        </div>
      </div>

      {error && <div className="text-destructive text-sm">{error}</div>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Recover Password"
        )}
      </Button>

      <div className="mt-4 text-center text-sm">
        Remember your password?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Back to Login
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
