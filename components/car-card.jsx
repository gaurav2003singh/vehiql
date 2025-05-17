"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { CarIcon, Heart, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { toggleSavedCar } from "@/actions/car-listing";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import NavigateButton from "./ui/navigateButton";

export const CarCard = ({ car }) => {
  const [isSaved, setIsSaved] = useState(car.wishlisted);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const {
    loading: isToggling,
    fn: toggleSavedCarFn,
    data: toggleResult,
    error: toggleError,
  } = useFetch(toggleSavedCar);

  // Handle toggle result with useEffect
  useEffect(() => {
    if (toggleResult?.success && toggleResult.saved !== isSaved) {
      setIsSaved(toggleResult.saved);
      toast.success(toggleResult.message);
    }
  }, [toggleResult, isSaved]);

  // Handle errors with useEffect
  useEffect(() => {
    if (toggleError) {
      toast.error("Failed to update favorites");
    }
  }, [toggleError]);

  const handleToggleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      toast.error("Please sign in to save cars");
      router.push("/sign-in");
      return;
    }

    if (isToggling) return;

    // Call the toggleSavedCar function using our useFetch hook
    await toggleSavedCarFn(car.id);
  };
  return (
    <Card
      className="overflow-hidden  hover:shadow-lg transition group"
      onClick={() => router.push(`/cars/${car.id}`)}
    >
      <div className="relative w-full aspect-[4/3] ">
        {car.images && car.images.length > 0 ? (
          <div className="relative w-full h-full ">
            <Image
              src={
                car.images?.[0]?.url
                  ? car.images[0].url.startsWith("/")
                    ? car.images[0].url
                    : "/" + car.images[0].url
                  : ""
              }
              alt={`${car.make} ${car.model}`}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <CarIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 bg-white/90 rounded-full p-1.5 ${
            isSaved
              ? "text-red-500 hover:text-red-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={handleToggleSave}
        >
          <Heart className={isSaved ? "fill-current" : ""} size={20} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="flex flex-col mb-2 ">
          <div className="flex flex-row gap-2">
            <h3 className="text-lg font-bold line-clamp-1 ">{car.make}</h3>
            <h3 className="text-lg font-bold line-clamp-1 ">{car.model}</h3>
          </div>
          <span className="text-xl font-bold text-blue-600">
            ${car.price.toLocaleString("hi-IN")}
          </span>
        </div>

        <div className="text-gray-600 mb-2 flex items-center">
          <span>{car.year}</span>
          <span className="mx-1">.</span>
          <span>{car.transmission}</span>
          <span className="mx-1">.</span>
          <span>{car.fuelType}</span>
        </div>

        <div className=" flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-gray-50">
            {car.bodyType}
          </Badge>
          <Badge variant="outline" className="bg-gray-50">
            {car.mileage.toLocaleString("en-US")}
          </Badge>
          <Badge variant="outline" className="bg-gray-50">
            {car.color}
          </Badge>
        </div>
        <div className="flex justify-between">
          {/* <Button
            className="flex-1"
            onClick={() => router.push(`/cars/${car.id}`)}
            
          >
           
            View Car
          </Button> */}
          <NavigateButton href={`/cars/${car.id}`} className="flex-1">
            View Car
          </NavigateButton>
        </div>
      </CardContent>
    </Card>
  );
};
