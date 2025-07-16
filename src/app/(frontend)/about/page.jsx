"use client";
import React from "react";
import { Header } from "@/components/About/Header";
import { Story } from "@/components/About/Story";
import { Mission } from "@/components/About/Mission";
import { Choose } from "@/components/About/Choose";
import { Stats } from "@/components/About/Stats";
import { Team } from "@/components/About/Team";
import { Experience } from "@/components/About/Experience";

const AboutUsPage = () => {
  return (
    <main className="myContainer">
      <div className="min-h-screen container pageP">
        <Header />
        <div className="space-y-8">
          <Story />
          <Mission />
          <Choose />
          <Stats />
          <Team />
          <Experience />
        </div>
      </div>
    </main>
  );
};

export default AboutUsPage;
