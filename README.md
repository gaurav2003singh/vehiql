This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




 // // Custom hooks for API calls
  // const {
  //   loading: addCarLoading,
  //   fn: addCarFn,
  //   data: addCarResult,
  // } = useFetch(addCar);

  // const {
  //   loading: processImageLoading,
  //   fn: processImageFn,
  //   data: processImageResult,
  //   error: processImageError,
  // } = useFetch(processCarImageWithAI);

  // // Handle successful car addition
  // useEffect(() => {
  //   if (addCarResult?.success) {
  //     toast.success("Car added successfully");
  //     router.push("/admin/cars");
  //   }
  // }, [addCarResult, router]);

  // useEffect(() => {
  //   if (processImageError) {
  //     toast.error(processImageError.message || "Failed to upload car");
  //   }
  // }, [processImageError]);

  // Handle successful AI processing
  // useEffect(() => {
  //   if (processImageResult?.success) {
  //     const carDetails = processImageResult.data;

  //     // Update form with AI results
  //     setValue("make", carDetails.make);
  //     setValue("model", carDetails.model);
  //     setValue("year", carDetails.year.toString());
  //     setValue("color", carDetails.color);
  //     setValue("bodyType", carDetails.bodyType);
  //     setValue("fuelType", carDetails.fuelType);
  //     setValue("price", carDetails.price);
  //     setValue("mileage", carDetails.mileage);
  //     setValue("transmission", carDetails.transmission);
  //     setValue("description", carDetails.description);

      // Add the image to the uploaded images
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setUploadedImages((prev) => [...prev, e.target.result]);
  //     };
  //     reader.readAsDataURL(uploadedAiImage);

  //     toast.success("Successfully extracted car details", {
  //       description: `Detected ${carDetails.year} ${carDetails.make} ${
  //         carDetails.model
  //       } with ${Math.round(carDetails.confidence * 100)}% confidence`,
  //     });

  //     // Switch to manual tab for the user to review and fill in missing details
  //     setActiveTab("manual");
  //   }
  // }, [processImageResult, setValue, uploadedAiImage]);

  // // Process image with Gemini AI
  // const processWithAI = async () => {
  //   if (!uploadedAiImage) {
  //     toast.error("Please upload an image first");
  //     return;
  //   }

  //   await processImageFn(uploadedAiImage);
  // };

  // Handle AI image upload with Dropzone
  // const onAiDrop = useCallback((acceptedFiles) => {
  //   const file = acceptedFiles[0];
  //   if (!file) return;

  //   if (file.size > 5 * 1024 * 1024) {
  //     toast.error("Image size should be less than 5MB");
  //     return;
  //   }

  //   setUploadedAiImage(file);

  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     setImagePreview(e.target.result);
  //   };
  //   reader.readAsDataURL(file);
  // }, []);

  // const { getRootProps: getAiRootProps, getInputProps: getAiInputProps } =
  //   useDropzone({
  //     onDrop: onAiDrop,
  //     accept: {
  //       "image/*": [".jpeg", ".jpg", ".png", ".webp"],
  //     },
  //     maxFiles: 1,
  //     multiple: false,
  //   });

  // Handle multiple image uploads with Dropzone
  // const onMultiImagesDrop = useCallback((acceptedFiles) => {
  //   const validFiles = acceptedFiles.filter((file) => {
  //     if (file.size > 5 * 1024 * 1024) {
  //       toast.error(`${file.name} exceeds 5MB limit and will be skipped`);
  //       return false;
  //     }
  //     return true;
  //   });

  //   if (validFiles.length === 0) return;

  //   // Simulate upload progress
  //   let progress = 0;
  //   const interval = setInterval(() => {
  //     progress += 10;
  //     setUploadProgress(progress);

  //     if (progress >= 100) {
  //       clearInterval(interval);

  //       // Process the images
  //       const newImages = [];
  //       validFiles.forEach((file) => {
  //         const reader = new FileReader();
  //         reader.onload = (e) => {
  //           newImages.push(e.target.result);

  //           // When all images are processed
  //           if (newImages.length === validFiles.length) {
  //             setUploadedImages((prev) => [...prev, ...newImages]);
  //             setUploadProgress(0);
  //             setImageError("");
  //             toast.success(
  //               `Successfully uploaded ${validFiles.length} images`
  //             );
  //           }
  //         };
  //         reader.readAsDataURL(file);
  //       });
  //     }
  //   }, 200);
  // }, []);

  // const {
  //   getRootProps: getMultiImageRootProps,
  //   getInputProps: getMultiImageInputProps,
  // } = useDropzone({
  //   onDrop: onMultiImagesDrop,
  //   accept: {
  //     "image/*": [".jpeg", ".jpg", ".png", ".webp"],
  //   },
  //   multiple: true,
  // });

  // // Remove image from upload preview
  // const removeImage = (index) => {
  //   setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  // };

  // const onSubmit = async (data) => {
  //   // Check if images are uploaded
  //   if (uploadedImages.length === 0) {
  //     setImageError("Please upload at least one image");
  //     return;
  //   }

  //   // Prepare data for server action
  //   const carData = {
  //     ...data,
  //     year: parseInt(data.year),
  //     price: parseFloat(data.price),
  //     mileage: parseInt(data.mileage),
  //     seats: data.seats ? parseInt(data.seats) : null,
  //   };

  //   // Call the addCar function with our useFetch hook
  //   await addCarFn({
  //     carData,
  //     images: uploadedImages,
  //   });