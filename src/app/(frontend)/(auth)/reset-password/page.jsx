"use client";
import OTPForm from "@/components/Auth/OTPForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResetPasswordPage = () => {
  return (
    <section className="myContainer">
      <div className="flex items-center justify-center bg-background py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <p className="text-muted-foreground">
              Enter the OTP and your new password
            </p>
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
