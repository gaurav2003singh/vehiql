const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cars = require('./data/carss.json'); // loading JSON data

async function main() {
  console.log(`🌱 Seeding ${cars.length} cars...`);

  for (const car of cars) {
    await prisma.car.create({
      data: {
        make: car.make,
        model: car.model,
        year: car.year,
        price: car.price,
        mileage: car.mileage,
        color: car.color,
        fuelType: car.fuelType,
        transmission: car.transmission,
        bodyType: car.bodyType,
        seats: car.seats,
        description: car.description,
        status: car.status,
        featured: car.featured,
        // createdAt: new Date(car.createdAt),
        // updatedAt: new Date(car.updatedAt),
        images: {
          create: car.images.map((img) => ({
            url: img.url,
          })),
        },
      },
    });
  }

  console.log('✅ Done seeding!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
