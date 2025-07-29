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
    <main className="myContainer">
      <section className="container secP">
        <div>
          <SectionHeader
            title="Trusted Partners"
            href="/partners"
            linkText="All Partners"
          />

          <div className="container mx-auto">
            <TooltipProvider>
              <SectionSlider
                items={partners}
                autoplayOptions={false}
                itemClassName="md:basis-1/6 flex justify-center"
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
        </div>
      </section>
    </main>
  );
};

export default Partners;
