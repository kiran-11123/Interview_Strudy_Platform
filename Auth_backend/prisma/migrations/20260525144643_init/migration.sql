-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refresh_token_expiry" TIMESTAMP(3),
ADD COLUMN     "reset_password_expiry" TIMESTAMP(3),
ADD COLUMN     "reset_password_token" TEXT;
