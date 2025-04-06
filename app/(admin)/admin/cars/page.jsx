
import React from "react";
// import CarList from "@/.components/carlist";
import CarList from "../.components/carlist";

export const metadata = {
  title: "Cars |Vehiql Admin",
  description: "Manage your cars here",
};
const CarsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cars Management</h1>
     <CarList></CarList>
    </div>
  );
};

export default CarsPage;
