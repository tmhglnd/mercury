"use strict";

var utils = require("../lib/utils");


/**
 * Eyes and tongue of the cow
 *
 * The eyes and tongue are hardcoded for some cows and cannot be changed.
 *
 * @typedef {Object} CowFace
 * @property {string} [eyes] Eyes of the cow
 * @property {string} [tongue] Tongue of the cow
 */

/**
 * Name for known faces
 *
 * @typedef {Object} CowMode
 * @property {string} id The short name of the mode
 * @property {string} name The full name of the mode
 */

/**
 * Cow mode and face
 *
 * @typedef {CowMode & CowFace} CowModeData
 */


/**
 * All available modes data
 *
 * The default mode is in the first position.
 *
 * @type {ReadonlyArray<Readonly<CowModeData>>}
 * @constant
 * @package
 */
var modes = [
  { id: "u", name: "default" },
  { id: "b", name: "borg",     eyes: "==" },
  { id: "d", name: "dead",     eyes: "xx", tongue: "U " },
  { id: "g", name: "greedy",   eyes: "$$" },
  { id: "p", name: "paranoia", eyes: "@@" },
  { id: "s", name: "stoned",   eyes: "**", tongue: "U " },
  { id: "t", name: "tired",    eyes: "--" },
  { id: "w", name: "wired",    eyes: "OO" },
  { id: "y", name: "youthful", eyes: ".." }
];

/**
 * Custom modes data
 *
 * @type {Readonly<CowModeData>[]}
 * @constant
 */
var customModes = [];


/**
 * Create a full deep copy of the given cow mode data
 *
 * @param {CowModeData} modeData Cow mode data to copy
 * @returns {CowModeData} A copy of the given cow mode data
 */
function copyModeData(modeData) {
  return {
    id: modeData.id,
    name: modeData.name,
    eyes: modeData.eyes,
    tongue: modeData.tongue
  };
}


/**
 * Get the mode for the giving face
 *
 * If the face is not found, the default mode is returned.
 *
 * @param {CowFace} face The cow face
 * @returns {CowMode} The matching cow mode
 */
function faceMode(face) {
  /** @type {CowMode | undefined} */
  var mode;

  // Find mode
  if (typeof face === "object" && face !== null) {
    mode = utils.find(modes.concat(customModes), function(mode) {
      return mode.eyes === face.eyes && mode.tongue === face.tongue;
    });
  }

  // Get default mode if is not found
  if (mode === undefined) {
    mode = modes[0];
  }

  // Return a copy of the mode
  return {
    id: mode.id,
    name: mode.name,
  };
}

/**
 * Get the face for the giving mode
 *
 * If the mode is not found, the default face is returned.
 *
 * @param {string} [id] The id or name of the cow mode
 * @returns {CowFace} The matching cow face
 */
function modeFace(id) {
  /** @type {CowFace | undefined} */
  var face;

  // Find face
  if (typeof id === "string") {
    face = utils.find(modes.concat(customModes), function(mode) {
      return mode.id === id || mode.name === id;
    });
  }

  // Get default face if is not found
  if (face === undefined) {
    face = modes[0];
  }

  // Return a copy of the face
  return {
    eyes: face.eyes,
    tongue: face.tongue
  };
}

/**
 * Add a new cow mode data to the custom cow mode data list
 *
 * Cow mode data id should match with the first name letter (case sensitive) and
 * should be different to any existing option.
 *
 * @param {CowModeData} modeData Cow mode data to add
 * @returns {boolean} Whether the cow mode data could be added
 */
function addMode(modeData) {
  // Validate type and format
  var valid = true;
  valid = valid && typeof modeData === "object" && modeData !== null && !Array.isArray(modeData);
  valid = valid && typeof modeData.id === "string" && modeData.id.length === 1;
  valid = valid && typeof modeData.name === "string" && modeData.id === modeData.name[0];
  valid = valid && (typeof modeData.eyes === "undefined" || typeof modeData.eyes === "string");
  valid = valid && (typeof modeData.tongue === "undefined" || typeof modeData.tongue === "string");

  if (!valid) {
    return false;
  }

  // Check if cow mode data already exists
  var ind = modes.concat(customModes).findIndex(function(mode) {
    return mode.id === modeData.id;
  });

  if (ind !== -1) {
    return false;
  }

  // Check reserved id
  var options = [ "h", "e", "f", "l", "n", "r", "T", "W" ];

  if (options.includes(modeData.id)) {
    return false;
  }

  // Add and sort custom cow mode data list
  customModes.push(copyModeData(modeData));
  customModes.sort(function(a, b) {
    return a.id.localeCompare(b.id);
  });

  return true;
}

/**
 * Remove a cow mode data from the custom cow mode data list
 *
 * @param {string} id The id or name of the cow mode
 * @return {CowModeData | undefined} Removed cow mode data
 */
function removeMode(id) {
  // Return undefined for not valid string
  if (typeof id !== "string") {
    return undefined;
  }

  // Get cow index
  var ind = customModes.findIndex(function(face) {
    return face.id === id || face.name === id;
  });

  // Remove cow mode data from custom mode data list and return it
  if (ind !== -1) {
    return customModes.splice(ind, 1)[0];
  }

  // Not found cow mode data
  return undefined;
}


/**
 * Manage cow modes and faces
 *
 * @module cowsay/lib/mode
 */
module.exports = {
  modes: modes.map(copyModeData),
  customModes: customModes,
  faceMode: faceMode,
  modeFace: modeFace,
  addMode: addMode,
  removeMode: removeMode
};
