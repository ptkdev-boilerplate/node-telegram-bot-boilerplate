/**
 * Module Interface
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */

/**
 * ModuleInterface
 * =====================
 *
 * @interface [ModuleInterface](https://github.com/ptkdev-boilerplate/node-telegram-bot-boilerplate/blob/main/app/types/module.type.ts)
 *
 * @param { String } text - input text
 *
 */
export interface ModuleInterface {
	/**
	 * Input text
	 * =====================
	 * Set text
	 *
	 * @interface [ModuleInterface](https://github.com/ptkdev-boilerplate/node-telegram-bot-boilerplate/blob/main/app/types/module.type.ts)
	 *
	 * @param { String } text - input text
	 *
	 */
	text: string;
}

/**
 * ModuleResponseInterface
 * =====================
 *
 * @interface [ModuleResponseInterface](https://github.com/ptkdev-boilerplate/node-telegram-bot-boilerplate/blob/main/app/types/module.type.ts)
 *
 * @return {fn} string - run app() for output text
 *
 */
export interface ModuleResponseInterface {
	/**
	 * Output text
	 * =====================
	 * Get text
	 *
	 * @interface [ModuleResponseInterface](https://github.com/ptkdev-boilerplate/node-telegram-bot-boilerplate/blob/main/app/types/module.type.ts)
	 *
	 * @return {fn} string - run app() for output text
	 *
	 */
	app(): string;
}
