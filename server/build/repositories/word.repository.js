"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordRepositoryPrisma = void 0;
const prismaClient_1 = require("../utils/database/prismaClient");
const GeneralError_1 = __importStar(require("../utils/error/GeneralError"));
class WordRepositoryPrisma {
    async getAll(query) {
        const { id, word, page = 1, limit = 10 } = query;
        const offset = (page - 1) * limit;
        let result;
        if (id) {
            result = await prismaClient_1.prisma.$queryRaw `
      SELECT *
      FROM words
      WHERE id = ${id}
      LIMIT 1
      `;
        }
        else if (!word) {
            result = await prismaClient_1.prisma.$queryRaw `
      SELECT *
      FROM words
      ORDER BY word ASC
      LIMIT ${limit}
      OFFSET ${offset}
      `;
        }
        else {
            result = await prismaClient_1.prisma.$queryRaw `
      SELECT *
      FROM words
      WHERE word LIKE ${`${word}%`}
      ORDER BY 
        CASE 
        WHEN word LIKE ${`${word} %`} THEN 1 
        ELSE 0 
        END
      LIMIT ${limit} 
      OFFSET ${offset}
      `;
        }
        if (!result || result.length === 0) {
            throw new GeneralError_1.default({
                type: GeneralError_1.ErrorTypes.Internal,
                title: "No existing words",
                detail: "No words found in the database, please populate the database with the command in script.",
            }, 500);
        }
        return result;
    }
    async count() {
        const result = await prismaClient_1.prisma.word.count();
        if (!result) {
            throw new GeneralError_1.default({
                type: GeneralError_1.ErrorTypes.Internal,
                title: "No existing words",
                detail: "No words found in the database, please populate the database with the command in script.",
            }, 500);
        }
        return result;
    }
}
exports.WordRepositoryPrisma = WordRepositoryPrisma;
