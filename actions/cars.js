"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";
import { auth } from "@clerk/nextjs/server";
import { serializeCarData } from "@/lib/helper";

// Function to convert File to base64
async function fileToBase64(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return buffer.toString("base64");
}

// Gemini AI integration for car image processing
export async function processCarImageWithAI(file) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const base64Image = await fileToBase64(file);

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: file.type,
      },
    };

    // Define the prompt for car detail extraction
    const prompt = `
      Analyze this car image and extract the following information:
      1. Make (manufacturer)
      2. Model
      3. Year (approximately)
      4. Color
      5. Body type (SUV, Sedan, Hatchback, etc.)
      6. Mileage
      7. Fuel type (your best guess)
      8. Transmission type (your best guess)
      9. Price (your best guess)
      9. Short Description as to be added to a car listing

      Format your response as a clean JSON object with these fields:
      {
        "make": "",
        "model": "",
        "year": 0000,
        "color": "",
        "price": "",
        "mileage": "",
        "bodyType": "",
        "fuelType": "",
        "transmission": "",
        "description": "",
        "confidence": 0.0
      }

      For confidence, provide a value between 0 and 1 representing how confident you are in your overall identification.
      Only respond with the JSON object, nothing else.
    `;

    // Get response from Gemini
    const result = await model.generateContent([imagePart, prompt]);
    const response = await result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    // Parse the JSON response
    try {
      const carDetails = JSON.parse(cleanedText);

      const requiredFields = [
        "make",
        "model",
        "year",
        "color",
        "bodyType",
        "price",
        "mileage",
        "fuelType",
        "transmission",
        "description",
        "confidence",
      ];

      const missingFields = requiredFields.filter(
        (field) => !(field in carDetails)
      );

      if (missingFields.length > 0) {
        throw new Error(
          `AI response missing required fields: ${missingFields.join(", ")}`
        );
      }

      // Return success response with data
      return {
        success: true,
        data: carDetails,
      };
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.log("Raw response:", text);
      return {
        success: false,
        error: "Failed to parse AI response",
      };
    }
  } catch (error) {
    console.error();
    throw new Error("Gemini API error:" + error.message);
  }
}

// Add a car to the database with images

export async function addCar({ carData, images }) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found");

    const carId = uuidv4();
    const folderPath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "cars",
      carId
    );

    await fs.mkdir(folderPath, { recursive: true });

    const imageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const base64Data = images[i];
      if (!base64Data || !base64Data.startsWith("data:image/")) continue;

      const base64 = base64Data.split(",")[1];
      const imageBuffer = Buffer.from(base64, "base64");

      const mimeMatch = base64Data.match(/data:image\/([a-zA-Z0-9]+);/);
      const fileExtension = mimeMatch ? mimeMatch[1] : "jpeg";
      const fileName = `image-${Date.now()}-${i}.${fileExtension}`;

      const filePath = path.join(folderPath, fileName);
      const relativePath = `/uploads/cars/${carId}/${fileName}`;

      await fs.writeFile(filePath, imageBuffer);
      imageUrls.push(relativePath); // store relative URL for use in frontend
    }

    if (imageUrls.length === 0) throw new Error("No valid images uploaded");

    const car = await db.car.create({
      data: {
        id: carId,
        make: carData.make,
        model: carData.model,
        year: carData.year,
        price: carData.price,
        mileage: carData.mileage,
        color: carData.color,
        fuelType: carData.fuelType,
        transmission: carData.transmission,
        bodyType: carData.bodyType,
        seats: carData.seats,
        description: carData.description,
        status: carData.status,
        featured: carData.featured,
      },
    });

    await db.carImage.createMany({
      data: imageUrls.map((url) => ({
        carId: car.id,
        url,
      })),
    });

    revalidatePath("/admin/cars");

    return { success: true };
  } catch (error) {
    console.error("Error adding car:", error);
    throw new Error("Error adding car: " + error.message);
  }
}

// Fetch all cars with simple search
export async function getCars(search = "") {
  try {
    // Build where conditions
    let where = {};

    // Add search filter
    if (search) {
      where.OR = [
        { make: { contains: search, mode: "insensitive" } },
        { model: { contains: search, mode: "insensitive" } },
        { color: { contains: search, mode: "insensitive" } },
      ];
    }

    // Execute main query
    const cars = await db.car.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include:{
        images:true,
      },
    });

    const serializedCars = cars.map(serializeCarData);

    return {
      success: true,
      data: serializedCars,
    };
  } catch (error) {
    console.error("Error fetching cars:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Delete a car by ID

export async function deleteCar(id) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Step 1: Get the car and its image URLs
    const car = await db.car.findUnique({
      where: { id:carId },
      include:{
        images:true,
      }
      // select: { images: true },
    });

    if (!car) {
      return {
        success: false,
        error: "Car not found",
      };
    }

    // Step 2: Delete image files from local storage
    for (const image of car.images) {
      const filePath = path.join(process.cwd(), "public", image.url); // assuming image.url = "/uploads/cars/car-id/img.jpg"
      try {
        await fs.unlink(filePath);
      } catch (err) {
        console.warn("Failed to delete image:", filePath, err.message);
      }
    }

    // Optionally: delete the entire folder for the car
    const folderPath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "cars",
      id
    );
    try {
      await fs.rmdir(folderPath, { recursive: true });
    } catch (err) {
      console.warn("Failed to delete folder:", folderPath, err.message);
    }

    // Step 3: Delete images from database
    await db.carImage.deleteMany({
      where: { carId: id },
    });

    // Step 4: Delete the car itself
    await db.car.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting car:", error);
    return {
      success: false,
      error: "Something went wrong.",
    };
  }
}

// Update car status or featured status
export async function updateCarStatus(id, { status, featured }) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const updateData = {};

    if (status !== undefined) {
      updateData.status = status;
    }

    if (featured !== undefined) {
      updateData.featured = featured;
    }

    // Update the car
    await db.car.update({
      where: { id },
      data: updateData,
    });

    // Revalidate the cars list page
    revalidatePath("/admin/cars");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating car status:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
