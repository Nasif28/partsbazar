import React from "react";
import CategoriesMenu from "./CategoriesMenu";
import Banner from "./Banner";
import TodaysDeals from "./TodaysDeals";
import Fitment from "./Fitment";

const HeroBanner = () => {
  return (
    <section className="myContainer">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="hidden lg:block w-3xs">
            <CategoriesMenu isOpen={true} />
          </div>

          <div className="w-full flex flex-col xl:flex-row py-4 gap-4">
            <div className="w-full xl:w-7/10 space-y-4">
              <Banner />
              <Fitment />
            </div>

            <div className="w-full xl:w-3/10">
              <TodaysDeals />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
