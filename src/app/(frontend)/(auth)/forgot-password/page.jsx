"use client";
import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ForgotPasswordPage = () => {
  return (
    <section className="myContainer">
      <div className="container flex items-center justify-center py-16">
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">
              FORGOT PASSWORD?
            </CardTitle>
            <p className="text-white/70">
              Enter your email address to recover your password
            </p>
          </CardHeader>

          <CardContent>
            <ForgotPasswordForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
