/**
 * Init
 * =====================
 * Configure telegram token and username
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import fs from "fs";
import shell from "shelljs";
import { fileURLToPath } from "url";
import yargs from "yargs";
import path from "path";

const argv = yargs(process.argv.slice(2)).parseSync();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const config_path = `${__dirname}/../app/configs/config.ts`;

if (fs.existsSync(config_path)) {
	shell.sed("-i", "BOT_USERNAME", `${argv.username}`, config_path);
	shell.sed("-i", "BOT_TOKEN", `${argv.token}`, config_path);
}
