/**
 * Manage cow modes and faces
 */


/**
 * Eyes and tongue of the cow
 *
 * The eyes and tongue are hardcoded for some cows and cannot be changed.
 */
export declare interface CowFace {
  /** Eyes of the cow */
  eyes?: string;
  /** Tongue of the cow */
  tongue?: string;
}

/**
 * Name for known faces
 */
export declare interface CowMode {
  /** The short name of the mode */
  id: string;
  /** The full name of the mode */
  name: string;
}

/**
 * Cow mode and face
 */
export interface CowModeData extends CowFace, CowMode {}


/**
 * All available cow modes data
 *
 * The default mode is in the first position.
 */
export declare const modes: ReadonlyArray<Readonly<CowModeData>>;

/**
 * Custom modes data
 */
export declare const customModes: Readonly<CowModeData>[];


/**
 * Get the mode for the giving face
 *
 * If the face is not found, the default mode is returned.
 *
 * @param face The cow face
 * @returns The matching cow mode
 */
export declare function faceMode(face: CowFace): CowMode;

/**
 * Get the face for the giving mode
 *
 * If the mode is not found, the default face is returned.
 *
 * @param mode The id or name of the cow mode
 * @returns The matching cow face
 */
export declare function modeFace(mode?: string): CowFace;


/**
 * Add a new cow mode data to the custom cow mode data list
 *
 * Cow mode data id should match with the first name letter (case sensitive) and
 * should be different to any existing option.
 *
 * @param modeData Cow mode data to add
 * @returns Whether the cow mode data could be added
 */
export declare function addMode(modeData: CowModeData): boolean;

/**
 * Remove a cow mode data from the custom cow mode data list
 *
 * @param id The id or name of the cow mode
 * @return Removed cow mode data
 */
export declare function removeMode(id: string): CowModeData | undefined;
