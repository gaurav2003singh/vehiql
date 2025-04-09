"use client";

import React, { use, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "plug-in hybrid"];
const transmissions = ["Automatic", "Manual", "Semi-Automatic"];
const bodyTypes = [
  "Hatchback",
  "Sedan",
  "SUV",
  "Coupe",
  "Convertible",
  "Wagon",
  "Van",
  "Pickup Truck",
];
const carStatuses = [
  "Available",
  "Sold",
  "Reserved",
  "In Service",
  "Out of Service",
  "Unavailable",
];

const AddCarForm = () => {
  const [activeTab, setActiveTab] = useState("ai");

  const carFormSchema = z.object({
    make: z.string().min(1, "Make is required"),
    model: z.string().min(1, "Model is required"),
    year: z.string().refine((val) => {
      const year = parseInt(val);
      return (
        !isNaN(year) && year >= 1900 && year <= new Date().getFullYear() + 1
      );
    }, "Valid year required"),
    price: z.number().min(0, "Price is required"),
    mileage: z.number().min(0, "Mileage is required"),
    fuelType: z.string().min(1, "Fuel type is required"),
    transmission: z.string().min(1, "Transmission is required"),
    bodyType: z.string().min(1, "Body type is required"),
    color: z.string().min(1, "Color is required"),
    seats: z.number().min(1, "Seats are required"),
    discription: z.string().min(10, "Description is required"),
    status: z.enum([
      "available",
      "sold",
      "reserved",
      "in service",
      "out of service",
      "unavailable",
    ]),
    // imageUrl: z.string().url("Invalid URL"),
    featured: z.boolean().default(false),
  });

  const {
    register,
    setValues,
    getValues,
    Watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      make: "",
      model: "",
      year: "",
      price: 0,
      mileage: 0,
      fuelType: "",
      transmission: "",
      bodyType: "",
      color: "",
      seats: 0,
      description: "",
      status: "available",
      featured: false,
    },
  });

  return (
    <div>
      <Tabs
        defaultValue="ai"
        className="w-[800px]"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="ai">AI Upload</TabsTrigger>
        </TabsList>
        <TabsContent value="manual" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Details</CardTitle>
              <CardDescription>
                Enter the details of the car you want to add.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="make">make</Label>
                    <Input
                      id="make"
                      {...register("make")}
                      placeholder="e.g. Toyota"
                      className={errors.make ? "border-red-500" : ""}
                    />
                    {errors.make && (
                      <p className=" text-red-500 text-sm">
                        {errors.make.message}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai" className="mt-6">
          Change your password here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AddCarForm;
