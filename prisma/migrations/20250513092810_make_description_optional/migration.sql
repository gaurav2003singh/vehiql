-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "mileage" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "bodyType" TEXT NOT NULL,
    "seats" INTEGER,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Car" ("bodyType", "color", "createdAt", "description", "featured", "fuelType", "id", "make", "mileage", "model", "price", "seats", "status", "transmission", "updatedAt", "year") SELECT "bodyType", "color", "createdAt", "description", "featured", "fuelType", "id", "make", "mileage", "model", "price", "seats", "status", "transmission", "updatedAt", "year" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
CREATE INDEX "Car_make_model_idx" ON "Car"("make", "model");
CREATE INDEX "Car_bodyType_idx" ON "Car"("bodyType");
CREATE INDEX "Car_price_idx" ON "Car"("price");
CREATE INDEX "Car_year_idx" ON "Car"("year");
CREATE INDEX "Car_status_idx" ON "Car"("status");
CREATE INDEX "Car_fuelType_idx" ON "Car"("fuelType");
CREATE INDEX "Car_featured_idx" ON "Car"("featured");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
