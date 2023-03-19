/**
 * Database: lowdb
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import type { TelegramUserInterface } from "@app/types/databases.type";
import configs from "@configs/config";
import { JSONFileSync, LowSync } from "lowdb";

const adapter = new JSONFileSync<{ users: TelegramUserInterface[] }>(configs.databases.users);

const databases = { users: new LowSync(adapter) };

databases.users.data = { users: [] };
databases.users.write();

/**
 * writeUser()
 * =====================
 * Write user information from telegram context to user database
 *
 * @Context: ctx.update.message.from
 *
 * @interface [TelegramUserInterface](https://github.com/ptkdev-boilerplate/node-telegram-bot-boilerplate/blob/main/app/webcomponent/types/databases.type.ts)
 *
 * @param { TelegramUserInterface } json - telegram user object
 *
 */
const writeUser = async (json: TelegramUserInterface): Promise<void> => {
	databases.users.read();
	databases.users.data?.users.find((u) => u.id === json.id);
	if (!databases.users.data) {
		throw new Error("Users database not found");
	}
	const user_id = databases.users.data.users.findIndex((u) => u.id === json.id);
	let newUsers = databases.users.data.users ? [...databases.users.data.users] : [];
	if (user_id !== -1) {
		newUsers[user_id] = { ...json };
	} else {
		newUsers = [...newUsers, { ...json }];
	}
	databases.users.data.users = newUsers;
	databases.users.write();
};

export { databases, writeUser };
export default databases;
