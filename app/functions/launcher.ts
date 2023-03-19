/**
 * Launcher
 * =====================
 *
 * @contributors: Francesco Maida [@edge33] <francescomaida91@gmail.com> (https://edge33.github.io)
 *
 * @license: MIT License
 *
 */
import bot from "./telegraf";
import config from "@configs/config";
import fs from "fs";
import { Input } from "telegraf";

const launchPolling = (): void => {
	bot.launch();
};

const launchSelfSigned = async () => {
	const { port, url } = config.webhook;
	const path = `${process.cwd()}/certs`;
	const cert = fs.readFileSync(`${path}/PUBLIC.pem`);
	const pk = fs.readFileSync(`${path}/PK.key`);
	const tls_options = {
		key: pk,
		cert: cert,
	};
	const certFile = Input.fromLocalFile(`${path}/PUBLIC.pem`);

	await bot.launch({
		webhook: {
			domain: url,
			port: port,
			certificate: certFile,
			tlsOptions: tls_options,
		},
	});
};

const launchLocalTunnel = async (secret_path: string, port: number) => {
	const localtunnel = (await import("localtunnel")).default;
	const tunnel = await localtunnel({ port });
	await bot.launch({
		webhook: {
			domain: tunnel.url,
			hookPath: secret_path,
			port: port,
		},
	});
};

const launchWebhook = async (mode: string): Promise<void> => {
	const { port, url, self_signed } = config.webhook;
	const secret_path = `/telegraf/${bot.secretPathComponent()}`;

	// Set telegram webhook
	// this runs localtunnel to develop the bot on localhost
	// acts as a reverse proxy for telegrm calls to our websocket
	if (mode === "localtunnel") {
		return launchLocalTunnel(secret_path, port);
	}

	if (mode === "webhook" && self_signed) {
		return launchSelfSigned();
	} else {
		return bot.launch({
			webhook: {
				domain: url,
				hookPath: secret_path,
				port: port,
			},
		});
	}
};

export { launchPolling, launchWebhook };
