/**
 * Telegraf Commands
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import bot from "@app/functions/telegraf";
import * as databases from "@app/functions/databases";
import config from "@configs/config";
import { launchPolling, launchWebhook } from "./launcher";

/**
 * command: /quit
 * =====================
 * If user exit from bot
 *
 */
const quit = async (): Promise<void> => {
	bot.command("quit", (ctx) => {
		ctx.telegram.leaveChat(ctx.message.chat.id);
		ctx.leaveChat();
	});
};

/**
 * command: /photo
 * =====================
 * Send photo from picsum to chat
 *
 */
const sendPhoto = async (): Promise<void> => {
	bot.command("photo", (ctx) => {
		ctx.replyWithPhoto("https://picsum.photos/200/300/");
	});
};

/**
 * command: /start
 * =====================
 * Send welcome message
 *
 */
const start = async (): Promise<void> => {
	bot.start((ctx) => {
		databases.writeUser(ctx.update.message.from);

		ctx.telegram.sendMessage(ctx.message.chat.id, `Welcome! Try send /photo command or write any text`);
	});
};

/**
 * Run bot
 * =====================
 * Send welcome message
 *
 */
const launch = async (): Promise<void> => {
	const mode = config.mode;
	if (mode === "webhook") {
		launchWebhook();
	} else {
		launchPolling();
	}
};

export { launch, quit, sendPhoto, start };
export default launch;
