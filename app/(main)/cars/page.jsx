import { getCarFilters } from "@/actions/car-listing";
import React from "react";

export const metadata = {
  title: "Car | vehiql",
  description: "Browse and search for your dream car",
};

const CarPage = async () => {
  const filtersData = await getCarFilters();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-6xl mb-4 gradient-title">Browse Cars</h1>
    </div>
  );
};

export default CarPage;
