/**
 * Databases Interfaces
 * =====================
 *
 * Create your telegram bot with this friendly boilerplate. Use this repository as template for your bot
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */

/**
 * Telegram User Interface
 * =====================
 *
 * @Context: ctx.update.message.from
 *
 * @interface [TelegramUserInterface](https://github.com/ptkdev-boilerplate/node-telegram-bot-boilerplate/blob/main/app/webcomponent/types/databases.type.ts)
 *
 * @param { number } id - telegram
 * @param { boolean } is_bot - is user a bot
 * @param { string } first_name - user name from telegram
 * @param { string } username - user username from telegram
 * @param { string } language_code - user code language from OS
 *
 */
export interface TelegramUserInterface {
	/**
	 * Telegram User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev-boilerplate/node-telegram-bot-boilerplate/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { number } id - telegram
	 *
	 */
	id: number;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev-boilerplate/node-telegram-bot-boilerplate/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { boolean } is_bot - is user a bot
	 *
	 */
	is_bot?: boolean;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev-boilerplate/node-telegram-bot-boilerplate/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } first_name - user name from telegram
	 *
	 */
	first_name?: string;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev-boilerplate/node-telegram-bot-boilerplate/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } username - user username from telegram
	 *
	 */
	username?: string;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev-boilerplate/node-telegram-bot-boilerplate/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } language_code - user code language from OS
	 *
	 */
	language_code?: string;
}
