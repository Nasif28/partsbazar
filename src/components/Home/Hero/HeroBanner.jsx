import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CategoriesMenu from "./CategoriesMenu";
import Banner from "./Banner";
import TodaysDeals from "./TodaysDeals";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HeroBanner = () => {
  return (
    <section className="myContainer">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="hidden lg:block w-3xs">
            {/* <DropdownMenu defaultOpen>
              <DropdownMenuTrigger asChild>
                <span>A</span>
              </DropdownMenuTrigger> */}

            <CategoriesMenu
              isOpen={true}
              // variant="dropdown"
              // onSelect={() => setMobileMenuOpen(false)}
            />
            {/* </DropdownMenu> */}
          </div>

          <div className="w-full  flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full md:w-7/10 py-5">
                <Banner />
              </div>

              <div className="w-full md:w-3/10 grid gap-4">
                <TodaysDeals />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
