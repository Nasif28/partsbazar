"use client";
import RegisterForm from "@/components/Auth/RegisterForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <section className="myContainer">
      <div className=" container flex items-center justify-center py-16">
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">
              CREATE AN ACCOUNT
            </CardTitle>
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
