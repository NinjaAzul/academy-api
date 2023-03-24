-- AlterTable
ALTER TABLE "permissions" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "description" DROP NOT NULL;
