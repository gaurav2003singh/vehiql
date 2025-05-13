import React from "react";

import { getCarFilters } from "@/actions/car-listing";
import {CarFilters} from "./_components/car-filters";
import { CarListings} from "./_components/car-listing";
export const metadata = {
  title: "Car | vehiql",
  description: "Browse and search for your dream car",
};

export default async function CarsPage() {
  const filtersData = await getCarFilters();
  return (
    <div className="container mx-auto px-4 ">
      <h1 className="text-4xl mb-4 gradient-title">Browse Cars</h1>
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Filters Section */}
        <div className="w-full lg:w-60 flex-shrink-0">
          <CarFilters filters={filtersData.data} />
        </div>

        {/* Car Listings */}
        <div className="flex-1 w-3/4">
          <CarListings />
        </div>
      </div>
     
    </div>
  );
};

// export default CarPage;
