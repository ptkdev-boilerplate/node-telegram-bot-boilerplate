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
	const tlsOptions = {
		key: pk,
		cert: cert,
	};
	const certFile = Input.fromLocalFile(`${path}/PUBLIC.pem`);

	await bot.launch({
		webhook: {
			domain: url,
			port: port,
			certificate: certFile,
			tlsOptions,
		},
	});
};

const launchLocalTunnel = async (secretPath: string, port: number) => {
	const localtunnel = (await import("localtunnel")).default;
	const tunnel = await localtunnel({ port });
	await bot.launch({
		webhook: {
			domain: tunnel.url,
			hookPath: secretPath,
			port: port,
		},
	});
};

const launchWebhook = async (mode: string): Promise<void> => {
	const { port, url, selfSigned } = config.webhook;
	const secretPath = `/telegraf/${bot.secretPathComponent()}`;

	// Set telegram webhook
	// this runs localtunnel to develop the bot on localhost
	// acts as a reverse proxy for telegrm calls to our websocket
	const webhookUrl = url;
	if (mode === "localtunnel") {
		return launchLocalTunnel(secretPath, port);
	}

	if (mode === "webhook" && selfSigned) {
		return launchSelfSigned();
	} else {
		return bot.launch({
			webhook: {
				domain: webhookUrl,
				hookPath: secretPath,
				port: port,
			},
		});
	}
};

export { launchPolling, launchWebhook };
