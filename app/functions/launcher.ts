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
import localtunnel from "localtunnel";

const launchPolling = (): void => {
	bot.launch();
};

const launchSelfSigned = async (webhook_url: string, secret_path: string) => {
	const { port } = config.webhook;
	const path = `${process.cwd()}/certs`;
	const cert = fs.readFileSync(`${path}/PUBLIC.pem`);
	const pk = fs.readFileSync(`${path}/PK.key`);
	const tls_options = {
		key: pk,
		cert: cert,
	};
	await bot.launch({
		webhook: {
			tlsOptions: tls_options,
			hookPath: secret_path,
			port: port,
		},
	});
	bot.telegram.setWebhook(`${webhook_url}${secret_path}`, {
		certificate: {
			source: cert,
		},
	});
};

const launchLocalTunnel = async (secret_path: string, port: number) => {
	const tunnel = await localtunnel({ port });
	bot.launch({
		webhook: {
			domain: tunnel.url,
			hookPath: secret_path,
			port: port,
		},
	});
};

const launchWebhook = async (): Promise<void> => {
	const { port, url, self_signed } = config.webhook;
	const secret_path = `/telegraf/${bot.secretPathComponent()}`;

	// Set telegram webhook
	// this runs localtunnel to develop the bot on localhost
	// acts as a reverse proxy for telegrm calls to our websocket
	const webhook_url = url;
	if (config.debug) {
		return launchLocalTunnel(secret_path, port);
	} else if (self_signed) {
		return launchSelfSigned(webhook_url, secret_path);
	} else {
		return bot.launch({
			webhook: {
				domain: webhook_url,
				hookPath: secret_path,
				port: port,
			},
		});
	}
};

export { launchPolling, launchWebhook };
