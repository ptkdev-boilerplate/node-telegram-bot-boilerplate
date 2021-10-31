/* eslint-disable no-console */
/**
 * initCerts.js
 * =====================
 * create a private key a self-signed cert and a CA cart to be used with webhook
 *
 * @contributors: Francesco Maida [@edge33] <francescomaida91@gmail.com> (https://edge33.github.io)
 *
 * @license: MIT License
 *
 */
import * as fs from "fs";
import * as shell from "shelljs";
import { argv } from "yargs";

const certPaths = `${__dirname}/../certs`;

if (!fs.existsSync(certPaths)) {
	console.log("cert paths not found creating");
	fs.mkdirSync(certPaths);
}
const cn = argv._[0];
if (!cn) {
	console.error("No CN provided, exiting, please provide a valid CN for certs, i.e myhost.com or 126.234.243.10");
	process.exit();
}
console.log(`generting self-signed certs with CN ${argv._[0]}`);
shell.cd(certPaths);
shell.exec(
	`openssl req -newkey rsa:2048 -sha256 -nodes -keyout PK.key -x509 -days 365 -out PUBLIC.pem -subj "/C=CC/ST=Some State/L=Some Location/O=Some Company/CN=${cn}"`,
);
