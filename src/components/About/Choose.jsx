import { Check, Truck, Award } from "lucide-react";

export const Choose = () => (
  <section className="py-10">
    <div className="max-w-4xl mx-auto text-center mb-16">
      <h2 className="text-3xl font-bold mb-4">Why Choose Partsbazar?</h2>
      <p className="text-xl text-muted-foreground">
        We go beyond just selling parts - we provide complete automotive
        solutions
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0 mt-1">
              <Check className="text-primary w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Extensive Product Catalog
              </h3>
              <p className="text-muted-foreground">
                As a specialized e-commerce platform, Partsbazar features an
                extensive catalog of automobile parts, including engine
                components, suspension parts, brakes, batteries, electricals,
                filters, lighting, and a variety of accessories for both
                domestic and imported vehicles.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0 mt-1">
              <Truck className="text-primary w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Convenience & Reliability
              </h3>
              <p className="text-muted-foreground">
                Partsbazar aims to make the process of buying automobile parts
                as convenient as possible, offering reliable delivery services
                that bring the products directly to customers' doorsteps.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0 mt-1">
              <Award className="text-primary w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-muted-foreground">
                With a focus on quality and authenticity, the platform ensures
                that all parts meet the highest standards and are sourced from
                trusted manufacturers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80 md:h-[420px] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <Truck className="w-24 h-24 mx-auto mb-4" />
            <p>Automotive parts delivery illustration</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
