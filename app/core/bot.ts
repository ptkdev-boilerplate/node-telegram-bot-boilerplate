/**
 * Start bot
 * =====================
 *
 * Run telegram bot
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import { Telegraf } from "telegraf";
import lowdb from "lowdb";
import lowdbFileSync from "lowdb/adapters/FileSync";
import configs from "@configs/config";

(async () => {
	const bot = new Telegraf(configs.telegram.token);
	const database = { users: "databases/users.json" };

	const users = lowdb(new lowdbFileSync(database.users));
	users.defaults({ users: [] }).write();

	bot.command("quit", (ctx) => {
		// Explicit usage
		ctx.telegram.leaveChat(ctx.message.chat.id);

		// Using context shortcut
		ctx.leaveChat();
	});

	bot.command("photo", (ctx) => {
		ctx.replyWithPhoto("https://picsum.photos/200/300/");
	});

	bot.start((ctx) => {
		ctx.telegram.sendMessage(ctx.message.chat.id, `Welcome! Try send /photo command`);
	});

	bot.on("text", (ctx) => {
		// Explicit usage
		ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);

		// Using context shortcut
		ctx.reply(`Hello ${ctx.state.role}`);
	});

	bot.on("callback_query", (ctx) => {
		// Explicit usage
		ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

		// Using context shortcut
		ctx.answerCbQuery();
	});

	bot.on("inline_query", (ctx) => {
		const result = [];
		// Explicit usage
		ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

		// Using context shortcut
		ctx.answerInlineQuery(result);
	});

	bot.launch();

	// Enable graceful stop
	process.once("SIGINT", () => bot.stop("SIGINT"));
	process.once("SIGTERM", () => bot.stop("SIGTERM"));
})();
