"use client";
import React from "react";
import { Story } from "@/components/About/Story";
import { Mission } from "@/components/About/Mission";
import { Choose } from "@/components/About/Choose";
import { Stats } from "@/components/About/Stats";
import { Team } from "@/components/About/Team";
import { Experience } from "@/components/About/Experience";
import PageHeader from "@/components/Global/PageHeader";
import { PBLogo } from "@/assets/Import";

const AboutUsPage = () => {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="About Us"
        description="Revolutionizing the automotive parts industry in Bangladesh with quality, convenience, and innovation"
        buttonText="Explore Our Products"
        buttonLink="/products"
        backgroundImage={PBLogo}
      />
      
      <div className="myContainer">
        <div className="container mx-auto pageP">
          <div className="space-y-8">
            <Story />
            <Mission />
            <Choose />
            <Stats />
            <Team />
            <Experience />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutUsPage;
