import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const songs = await prisma.song.findMany();

  for (const song of songs) {
    const title = song.title as any;

    // Case 1: JSON title → extract primary
    if (title && typeof title === "object" && "primary" in title) {
      await prisma.song.update({
        where: { id: song.id },
        data: {
          title: String(title.primary ?? ""),
        },
      });
      continue;
    }

    // Case 2: already string → do nothing
    if (typeof title === "string") {
      continue;
    }

    // Case 3: corrupted / null → fallback
    await prisma.song.update({
      where: { id: song.id },
      data: {
        title: "",
      },
    });
  }

  console.log("✅ Title reverted to string successfully");
}

main()
  .catch((e) => {
    console.error("❌ Migration failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
