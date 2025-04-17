-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "summary_es" TEXT,
    "info" TEXT NOT NULL,
    "info_es" TEXT,
    "link" TEXT NOT NULL,
    "repo" TEXT NOT NULL,
    "media" TEXT[],
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
