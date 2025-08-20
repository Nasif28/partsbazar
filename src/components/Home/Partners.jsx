"use client";
import React from "react";
import SectionHeader from "../Global/SectionHeader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import partners from "@/data/Partners.json";
import Image from "next/image";
import SectionSlider from "../Global/SectionSlider";

const Partners = () => {
  return (
    <main className="secP">
      <section className="myContainer">
        <div className="container mx-auto">
          <SectionHeader
            title="Trusted Partners"
            href="/partners"
            linkText="All Partners"
          />

          <TooltipProvider>
            <SectionSlider
              items={partners}
              autoplayOptions={false}
              itemClassName="lg:basis-1/6 sm:basis-1/4 basis-1/3 flex justify-center"
              renderItem={(partner) => (
                <Tooltip key={partner.id}>
                  <TooltipTrigger asChild>
                    <div className="p-4 flex items-center justify-center">
                      <Image
                        src={partner.thumbnail}
                        alt={partner.name}
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium">{partner.name}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              emptyMessage="No Partner found"
            />
          </TooltipProvider>
        </div>
      </section>
    </main>
  );
};

export default Partners;
