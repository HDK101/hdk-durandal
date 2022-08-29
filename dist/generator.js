"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processFolder = void 0;
const path_1 = require("path");
const promises_1 = require("fs/promises");
const madge_1 = __importDefault(require("madge"));
const safeMkdir_1 = __importDefault(require("./utils/safeMkdir"));
async function generateSVG(file) {
    const res = await (0, madge_1.default)(file);
    const buffer = await res.svg();
    return buffer.toString('utf-8');
}
async function processFolder(dest) {
    const files = await (0, promises_1.readdir)(dest);
    const folder = (0, path_1.basename)(dest);
    await (0, safeMkdir_1.default)(`dependencies/${folder}`);
    await Promise.all(files.map(async (file) => {
        await (0, promises_1.writeFile)(`dependencies/${folder}/${file}.svg`, await generateSVG(`${dest}/${file}`));
    }));
}
exports.processFolder = processFolder;