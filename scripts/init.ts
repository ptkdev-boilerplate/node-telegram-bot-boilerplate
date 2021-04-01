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
import * as fs from "fs";
import * as shell from "shelljs";
import { argv } from "yargs";

declare const __dirname: string;
console.log(argv, argv._[0]);
const path = `${__dirname}/../app/configs/config.js`;

if (fs.existsSync(path)) {
	shell.sed("-i", "BOT_USERNAME", `${argv._[0]}`, path);
	shell.sed("-i", "BOT_TOKEN", `${argv._[1]}`, path);
}
