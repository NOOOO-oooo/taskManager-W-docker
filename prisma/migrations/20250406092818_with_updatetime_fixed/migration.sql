-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "task_status" SET DEFAULT 'pending',
ALTER COLUMN "updatedAt" DROP DEFAULT;
