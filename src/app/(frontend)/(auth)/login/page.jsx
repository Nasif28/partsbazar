"use client";
import LoginForm from "@/components/Auth/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  return (
    <section className="myContainer">
      <div className="container py-16 flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">WELCOME BACK!</CardTitle>
            <p className="text-muted-foreground">Login to your account</p>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;
