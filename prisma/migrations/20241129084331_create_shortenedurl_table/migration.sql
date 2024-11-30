-- CreateTable
CREATE TABLE "ShortenedURL" (
    "id" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    "shortened" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShortenedURL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortenedURL_shortened_key" ON "ShortenedURL"("shortened");

-- AddForeignKey
ALTER TABLE "ShortenedURL" ADD CONSTRAINT "ShortenedURL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
