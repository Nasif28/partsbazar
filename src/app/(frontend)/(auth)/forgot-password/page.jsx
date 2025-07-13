"use client";
import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ForgotPasswordPage = () => {
  return (
    <section className="myContainer">
      <div className="flex items-center justify-center bg-background py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">FORGOT PASSWORD?</CardTitle>
            <p className="text-muted-foreground">
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
