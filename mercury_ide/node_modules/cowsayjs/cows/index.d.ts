/**
 * Cows collection
 */


/**
 * Position index
 */
declare type Position = [ number, number ];


/**
 * Cow action
 */
export declare type CowAction = `o` | `\\`;


/**
 * Cow without name
 */
export declare interface CowBase {
  /** Default eyes for empty string */
  defEyes?: string;
  /** Default tongue for empty string */
  defTongue?: string;
  /** Cow template */
  template: ReadonlyArray<string>;
  /** Action position indexes */
  actionPos?: ReadonlyArray<Position>;
  /** Eyes position indexes */
  eyesPos?: ReadonlyArray<Position>;
  /** Tongue position indexes */
  tonguePos?: ReadonlyArray<Position>;
}

/**
 * Cow
 */
export declare interface Cow extends CowBase {
  /** Cow name */
  name: string;
}


/**
 * Cows list
 *
 * The default cow is in the first position.
 */
export declare const corral: ReadonlyArray<Readonly<Cow>>;

/**
 * Custom cows list
 */
export declare const customCorral: Readonly<Cow>[];

/**
 * Validate the given custom cow
 *
 * @param cow Custom cow to validata
 * @param name Validate name
 * @returns Whether the custom cow is valid
 */
export declare function validateCow(cow: Cow | CowBase, name?: boolean): boolean;

/**
 * Find a cow in the corral by name
 *
 * @param name Cow name
 * @returns Matching cow
 */
export declare function getCow(name: string): Cow;

/**
 * Add a new cow to the custom corral
 *
 * @param cow New cow to add
 * @returns whether the cow could be added
 */
export declare function addCow(cow: Cow): boolean;

/**
 * Remove a cow from the custom corral
 *
 * @param name Cow name
 * @returns Removed cow
 */
export declare function removeCow(name: string): Cow | undefined;

/**
 * Cow renderer function
 *
 * @param cow Cow to render
 * @param action Action
 * @param eyes Eyes
 * @param tongue Tongue
 * @returns Rendered cow
 */
export declare function renderCow(cow: CowBase, action: CowAction, eyes?: string, tongue?: string): string;
