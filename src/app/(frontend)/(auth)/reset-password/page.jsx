"use client";
import OTPForm from "@/components/Auth/OTPForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResetPasswordPage = () => {
  return (
    <section className="myContainer">
      <div className="container flex items-center justify-center py-16">
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">
              Reset Password
            </CardTitle>
            <p className="text-white/70">Enter the OTP and your new password</p>
          </CardHeader>

          <CardContent>
            <OTPForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
