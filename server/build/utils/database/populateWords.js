"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prismaClient_1 = require("./prismaClient");
async function main() {
    const filePath = path_1.default.join(__dirname, "../../assets/english.txt");
    const fileContent = fs_1.default.readFileSync(filePath, "utf-8");
    const words = fileContent.split("\n").map((word) => word.trim());
    console.log(`📚 Found ${words.length} words. Inserting into database...`);
    for await (const word of words) {
        try {
            await prismaClient_1.prisma.word.create({
                data: {
                    word,
                },
            });
            const currentIndex = words.indexOf(word) + 1;
            const progress = ((currentIndex / words.length) * 100).toFixed(2);
            process.stdout.write(`\r⏳ Progress: ${progress}% (${currentIndex}/${words.length})`);
        }
        catch (error) {
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
    await prismaClient_1.prisma.$disconnect();
});
