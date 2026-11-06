"use strict";

var box = require("./box");
var mode = require("./mode");
var cows = require("../cows");


/**
 * Common options for cowsay and cowthink functions
 *
 * @typedef {Object} CowOptions
 * @property {string | import("../cows").CowBase} [cow] Cow name
 * @property {string} [mode] Cow face mode
 * @property {string} [eyes] Custom cow eyes
 * @property {string} [tongue] Custom cow tongue
 * @property {string | number | boolean | null} [wrap] Where the message should be wrapped
 */

/**
 * Action option
 *
 * @typedef {Object} CowActionOption
 * @property {import("./box").BoxAction} [action] Cow action
 * @package
 */

/**
 * Message option
 *
 * @typedef {Object} CowMessageOption
 * @property {string} [message] Cow message
 * @package
 */

/**
 * Options for the moo function
 *
 * The common options for cowsay and cowthink with the action property.
 *
 * @typedef {CowOptions & CowActionOption} CowMooOptions
 */

/**
 * Options for the moo function with message
 *
 * The full options for moo with the message property.
 *
 * @typedef {CowMooOptions & CowMessageOption} CowAllOptions
 */


/**
 * Add the given property to the cow options
 *
 * @param {{ [key: string]: any } | undefined} options Cow options
 * @param {keyof CowAllOptions} property Cow action
 * @param {CowAllOptions[property]} value Cow action
 * @returns {CowAllOptions} All cow options
 * @package
 */
function extendOptions(options, property, value) {
  var extended = typeof options === "object" && options !== null ? {
    message: options.message,
    cow: options.cow,
    mode: options.mode,
    eyes: options.eyes,
    tongue: options.tongue,
    wrap: options.wrap,
    action: options.action,
  } : {};

  // Return extended options
  extended[property] = value;
  return extended;
}


/**
 * Build an ASCII cow with the message
 *
 * Default values:
 *  - action: "say"
 *  - eyes: "oo"
 *  - wrap: 40
 *
 * @param {CowAllOptions | string} [message] Message to show
 * @param {CowMooOptions} [options] Cow options with action
 * @returns {string} ASCII cow with the message
 */
function moo(message, options) {
  // Adjust parameters
  var opts = typeof message === "object" && message !== null ?
    message : extendOptions(options, "message", message);


  // Get action
  /** @type {import("./box").BoxAction} */
  var action = opts.action === "think" ? "think" : "say";
  /** @type {import("../cows").CowAction} */
  var act = action === "think" ? "o" : "\\";

  // Get face
  var eyes;
  var tongue;

  // Find face by mode
  if (typeof opts.mode === "string") {
    var face = mode.modeFace(opts.mode);
    eyes = face.eyes;
    tongue = face.tongue;
  }

  // Custom face
  if (typeof opts.eyes === "string" && eyes === undefined) {
    eyes = opts.eyes;
  }
  if (typeof opts.tongue === "string" && tongue === undefined) {
    tongue = opts.tongue;
  }

  // Get cow and returns
  /** @type {import("../cows").CowBase} */
  var cow;

  switch (typeof opts.cow) {
    case "string": cow = cows.getCow(opts.cow); break;
    case "object": cow = cows.validateCow(opts.cow) ? opts.cow : cows.corral[0]; break;
    default:       cow = cows.corral[0];
  }

  return box.perform(action, opts.message, opts.wrap) + cows.renderCow(cow, act, eyes, tongue);
}


/**
 * Build an ASCII cow saying the message
 *
 * Default values:
 *  - eyes: "oo"
 *  - wrap: 40
 *  - action: "say"
 *
 * @param {string} [message] Message to say
 * @param {CowOptions} [options] Cow options
 * @returns ASCII cow saying the message
 */
function cowsay(message, options) {
  return typeof message === "object" && message !== null ?
    moo(extendOptions(message, "action", "say")) :
    moo(message, extendOptions(options, "action", "say"));
}

/**
 * Build an ASCII cow thinking the message
 *
 * Default values:
 *  - eyes: "oo"
 *  - wrap: 40
 *  - action: "think"
 *
 * @param {CowAllOptions | string} [message] Message to think
 * @param {CowOptions} [options] Cow options
 * @returns ASCII cow thinking the message
 */
function cowthink(message, options) {
  return typeof message === "object" && message !== null ?
    moo(extendOptions(message, "action", "think")) :
    moo(message, extendOptions(options, "action", "think"));
}


/**
 * A nodejs clone of the classic cowsay and cowthink cli commands
 *
 * @module cowsayjs
 */
module.exports = {
  moo: moo,
  cowsay: cowsay,
  cowthink: cowthink
};
