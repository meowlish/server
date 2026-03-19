-- CreateTable
CREATE TABLE "user_badges" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "badges" (
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "attempt_criteria" (
    "uid" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL DEFAULT 0,
    "perfect" INTEGER NOT NULL DEFAULT 0,
    "good" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "attempt_criteria_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "login_criteria" (
    "uid" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "longest_streak" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL DEFAULT 0,
    "started_at" TIMESTAMP(3) NOT NULL,
    "last_login" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "login_criteria_pkey" PRIMARY KEY ("uid")
);

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badge_fkey" FOREIGN KEY ("badge") REFERENCES "badges"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
