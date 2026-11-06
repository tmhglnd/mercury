/**
 * Build the action boxs for the cow message
 */

import { CowOptions } from ".";


/**
 * The cow action
 */
export declare type BoxAction = `say` | `think`;


/**
 * Build the action box
 *
 * The default action is say and the default wrap word value is 40, so wrap
 * words at or before the 40th column.
 *
 * @param action The cow action
 * @param message The message to show
 * @param wrap Word wrap column
 * @returns The action box
 */
export declare function perform(action?: BoxAction, message?: string, wrap?: CowOptions["wrap"]): string;

/**
 * Build the say box
 *
 * The default wrap word value is 40, so wrap words at or before the 40th
 * column.
 *
 * @param message The message to show
 * @param wrap Word wrap column
 */
export declare function say(message?: string, wrap?: number | false | null): string;

/**
 * Build the think box
 *
 * The default wrap word value is 40, so wrap words at or before the 40th
 * column.
 *
 * @param message The message to show
 * @param wrap Word wrap column
 */
export declare function think(message?: string, wrap?: number | false | null): string;
