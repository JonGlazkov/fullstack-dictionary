import fs from "fs";
import path from "path";
import { prisma } from "./prismaClient";

async function main() {
  const filePath = path.join(__dirname, "../../assets/english.txt");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const words = fileContent.split("\n").map((word) => word.trim());

  console.log(`📚 Found ${words.length} words. Inserting into database...`);

  for await (const word of words) {
    try {
      await prisma.word.create({
        data: {
          word,
        },
      });
      const currentIndex = words.indexOf(word) + 1;
      const progress = ((currentIndex / words.length) * 100).toFixed(2);
      process.stdout.write(
        `\r⏳ Progress: ${progress}% (${currentIndex}/${words.length})`
      );
    } catch (error) {
      console.error(`❌ Error inserting word: ${word}`);
    }
  }

  console.log("✅ All words inserted successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
