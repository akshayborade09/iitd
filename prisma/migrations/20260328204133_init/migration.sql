-- CreateTable
CREATE TABLE "Registration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "travelStatus" TEXT NOT NULL,
    "accommodation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
