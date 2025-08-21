import { Settings } from "lucide-react";

export const Story = () => (
  <section className="pb-10">
    <div className="flex flex-col lg:flex-row items-center gap-12">
      <div className="flex-1 w-full">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80 md:h-[420px] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <Settings className="w-24 h-24" />
            <span className="sr-only">Automotive parts illustration</span>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-6 lg:text-left text-center">
          Our Story
        </h2>
        <div className="space-y-4 text-muted-foreground lg:text-left text-center">
          <p>
            <strong>Partsbazar</strong> is a leading online platform in
            Bangladesh, dedicated to providing a wide range of high-quality
            automobile parts and accessories. With a user-friendly interface and
            seamless functionality, Partsbazar offers an easy and reliable
            shopping experience for car owners, mechanics, and businesses alike.
          </p>
          <p>
            Founded in 2021 with Trade License: TRAD/DSCC/011983/2021,
            Partsbazar has rapidly grown to become Bangladesh's premier
            automotive parts destination. We address the needs of car owners by
            providing authentic, high-quality car parts alongside integrated
            services such as expert parts knowledge and convenient delivery.
          </p>
          <p>
            As Bangladesh's first comprehensive automotive platform, Partsbazar
            takes care of everything a vehicle owner needs. Customers can
            purchase genuine parts, arrange for replacements, and even access
            services at their doorstep. This streamlined approach saves time and
            effort, making car maintenance a seamless experience.
          </p>
        </div>
      </div>
    </div>
  </section>
);
