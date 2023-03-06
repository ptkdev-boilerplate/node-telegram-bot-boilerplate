/**
 * Disable debug
 * =====================
 * Check if configs/config.js has debug to off
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import fs from "fs";
import shell from "shelljs";
import yargs from "yargs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const config_path = `${__dirname}/../app/configs/config.ts`;

const argv = yargs(process.argv.slice(2)).parseSync();

if (fs.existsSync(config_path)) {
	if (argv.enable) {
		shell.sed("-i", '"debug": false', '"debug": true', config_path);
	} else {
		shell.sed("-i", '"debug": true', '"debug": false', config_path);
	}
}
