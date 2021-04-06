/**
 * Telegraf
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import { Telegraf } from "telegraf";
import configs from "@configs/config";

const bot = new Telegraf(configs.telegram.token);

export { bot };
export default bot;
