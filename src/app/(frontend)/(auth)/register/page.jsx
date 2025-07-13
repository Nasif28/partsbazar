"use client";
import RegisterForm from "@/components/Auth/RegisterForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <section className="myContainer">
      <div className="flex items-center justify-center bg-background py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">CREATE AN ACCOUNT</CardTitle>
          </CardHeader>

          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RegisterPage;
