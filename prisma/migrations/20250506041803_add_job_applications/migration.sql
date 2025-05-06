-- CreateEnum
CREATE TYPE "JobApplicationStatus" AS ENUM ('Pending', 'InterviewPending', 'Success', 'Rejected');

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "status" "JobApplicationStatus" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);
