/**
 * Check configs.js
 * =====================
 * Check if configs/config.ts exist, if don't exist rename .tpl
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import fs from "fs";
import shell from "shelljs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const config_path = `${__dirname}/../app/configs/config.ts`;
if (!fs.existsSync(config_path)) {
	shell.cp("-Rf", `${__dirname}/../app/configs/config.ts.tpl`, `${config_path}`);
}
