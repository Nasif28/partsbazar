import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Settings, Users } from "lucide-react";

export const Mission = () => (
  <section className="p-10 bg-primary/5 rounded-xl">
    <div className="max-w-4xl mx-auto text-center mb-10">
      <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        To become the first choice for car users by offering a hassle-free,
        all-in-one automotive solution.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="h-full">
        <CardHeader>
          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <ShieldCheck className="text-primary w-6 h-6" />
          </div>
          <CardTitle>Authenticity Guaranteed</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            We're proud to be the authorized distributor of renowned global
            brands, ensuring the authenticity and quality of every product we
            sell.
          </p>
        </CardContent>
      </Card>

      <Card className="h-full">
        <CardHeader>
          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Settings className="text-primary w-6 h-6" />
          </div>
          <CardTitle>Comprehensive Solutions</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            From high-quality spare parts to expert advice, we've redefined
            convenience for car owners across Bangladesh.
          </p>
        </CardContent>
      </Card>

      <Card className="h-full">
        <CardHeader>
          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Users className="text-primary w-6 h-6" />
          </div>
          <CardTitle>Customer-Centric Approach</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Authenticity and quality are at the core of our operations. We're
            committed to ensuring safety and satisfaction for all our customers.
          </p>
        </CardContent>
      </Card>
    </div>
  </section>
);
