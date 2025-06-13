import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(base64Data, folder = "car-images") {
  // base64Data: "data:image/png;base64,...."
  return cloudinary.uploader.upload(base64Data, {
    folder,
    resource_type: "image",
  });
}