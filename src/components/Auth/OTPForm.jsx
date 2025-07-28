"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { clearError, resetPassword } from "@/redux/features/authSlice";

const OTPForm = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, otpVerified, resetEmail } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatch(clearError());
      return;
    }

    dispatch(clearError());
    const result = await dispatch(resetPassword({ otp, password }));
    if (result.payload) {
      router.push("/login");
    }
  };

  if (otpVerified) {
    return (
      <div className="space-y-4 text-center">
        <div className="text-primary text-lg font-medium">
          Password reset successful!
        </div>
        <p className="text-white/70">
          Your password has been updated successfully.
        </p>
        <Button asChild className="w-full mt-4">
          <Link href="/login">Back to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white">
      <div className="space-y-4">
        <div>
          <Label htmlFor="otp">Reset Code</Label>
          <Input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="mt-2"
          />
          <p className="text-xs text-white/60 mt-1">
            Enter the OTP sent to {resetEmail}
          </p>
        </div>
        <div>
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          "Reset Password"
        )}
      </Button>
    </form>
  );
};

export default OTPForm;
