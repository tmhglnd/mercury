"use strict";


/**
 * The cow action
 *
 * @typedef {"say" | "think"} BoxAction
 */

/**
 * Limits of the box message for the actions
 *
 * @typedef {Object} CowBoxLimits
 * @property {string[]} say Box message limits for the say action
 * @property {string[]} think Box message limits for the think action
 * @package
 */


/**
 * Box limits for the actions
 *
 * @type {CowBoxLimits}
 */
var limits = {
  say: [
    "< ", " >",
    "/ ", " \\",
    "\\ ", " /",
    "| ", " |"
  ],
  think: [
    "( ", " )",
    "( ", " )",
    "( ", " )",
    "( ", " )"
  ]
};


/**
 * Split the message in multiple lines
 *
 * @param {string} message Message to split
 * @param {number} [wrap] Word wrap column
 * @returns {string[]} Message lines
 */
function split(message, wrap) {
  // No wrap text
  if (typeof wrap !== "number" || isNaN(wrap)) {
    // Break lines and replace tabs by spaces
    return message
      .split(/\r\n|[\n\r\f\v\u2028\u2029\u0085]/g)
      .map(function(line) {
        // Find tabs
        var tab = line.indexOf("\t");

        if (tab === -1) {
          return line;
        }

        // Replace tabs
        var tabbed = line;

        do {
          var spaces = Array(9 - tab % 8).join(" ");
          tabbed = tabbed.slice(0, tab) + spaces + tabbed.slice(tab + 1);
          tab = tabbed.indexOf("\t", tab + spaces.length);
        } while (tab !== -1);

        return tabbed;
      });
  }


  // Fix tabs, breaklines and split lines
  var lines = message
    .replace(/(?:\r\n|[\n\r\f\v\u2028\u2029\u0085])(\S)/g, " $1")
    .replace(/(?:\r\n|[\n\r\f\v\u2028\u2029\u0085])\s+/g, "\n\n")
    .replace(/(?:\r\n|[\t\n\r\f\v\u2028\u2029\u0085])$/g, " ")
    .split(/\r\n|[\n\r\f\v\u2028\u2029\u0085]/g);

  // Process lines
  lines = lines.map(function(line, i) {
    // Empty line
    if (/^\s*$/.test(line)) {
      return "";
    }

    // Remove duplicated spaces and trim left for non first line
    var fixed = line.replace(/\s+/g, " ");
    return i > 0 ? fixed.replace(/^\s+/, "") : fixed;
  }).filter(function(line, i, lines) {
    // Allways allow not empty lines and the first line
    if (line.length > 0 || i <= 1) {
      return true;
    }

    // Remove duplicated empty lines
    return lines[i - 1].length > 0;
  });


  // Check empty message
  if (lines.every(function(line) { return line.length === 0; })) {
    return [ "" ];
  }


  // Trim last empty line
  if (lines[lines.length - 1].length === 0) {
    lines.pop();
  }


  /** @type{string[]} */
  var initial = [];
  var max = wrap;
  var col = wrap - 1;

  // Wrap words
  return lines.reduce(function(acc, line, i, src) {
    // Empty line
    if (line.length === 0) {
      return acc.concat(line);
    }

    // Too small word wrap column or invalid value
    if (max < 2) {
      // Ends if the next line is not empty
      if (src[i + 1] !== "") {
        src.splice(0);
      }

      // Add a "0" character and continue like wraping at second column
      max = 2;
      col = 1;
      return acc.concat("0");
    }


    // Get break position
    var last = i > 0 ? acc[acc.length - 1] + line : line;
    var space = last.length < max ? last.length : last.lastIndexOf(" ", col);
    var br = space > 0 && space < col ? space : last.length === max && last[last.length - 1] === " " ? max : col;

    // Wrap line
    var words = acc.concat(last.slice(0, br));
    var rest = line.slice(br).replace(/^\s+/, "");

    // Wrap rest of line
    while (rest.length > 0) {
      space = rest.length < max ? rest.length : rest.lastIndexOf(" ", col);
      br = space > 0 && space < col ? space : rest.length === max && rest[rest.length - 1] === " " ? max : col;

      words.push(rest.slice(0, br));
      rest = rest.slice(br).replace(/^\s+/, "");
    }

    // Return words
    return words;
  }, initial);
}

/**
 * Pads the current string with spaces
 *
 * The resulting string reaches a given length.
 *
 * The padding is applied from the end of the current string.
 *
 * @param {string} str String to pad
 * @param {number} len Maximum length
 * @returns {string} Padded string
 */
function pad(str, len) {
  // Check length
  if (str.length >= len) {
    return str;
  }

  // Return padded string;
  var pad = Array(len - str.length + 1).join(" ");
  return str + pad;
}


/**
 * Build the action box
 *
 * The default action is say and the default wrap word value is 40, so wrap
 * words at or before the 40th column.
 *
 * @param {BoxAction} [action=say] The cow action
 * @param {string} [message] The message to show
 * @param {import(".").CowOptions["wrap"]} [wrap] Word wrap column
 * @returns {string} The action box
 */
function perform(action, message, wrap) {
  // Adjust parameters
  /** @type {BoxAction} */
  var type = action === "think" ? "think" : "say";
  var text = typeof message === "string" ? message : "";
  var col;

  // Fix wrap
  switch (typeof wrap) {
    case "number": col = wrap; break;
    case "string": col = parseInt(wrap); break;
    default: switch (wrap) {
      case undefined:
      case true: col = 40; break;
      default:   col = undefined;
    }
  }

  // Auxiliar variables
  var limit = limits[type];
  var lines = split(text, col);
  var width = lines.map(function(line) {
    return line.length;
  }).reduce(function(prev, curr) {
    return curr > prev ? curr : prev;
  }, 0);


  // Box top
  var spanner = Array(width + 3);
  var box = [" " + spanner.join("_")];

  // Box content for one single line
  if (lines.length === 1) {
    box.push(limit[0] + pad(lines[0], width) + limit[1]);
  }

  // Box content for multiple lines
  else {
    var last = lines.length - 1;
    var i = 0;

    do {
      switch (i) {
        case 0:    box.push(limit[2] + pad(lines[i], width) + limit[3]); break;
        case last: box.push(limit[4] + pad(lines[i], width) + limit[5]); break;
        default:   box.push(limit[6] + pad(lines[i], width) + limit[7]);
      }
    } while (++i <= last);
  }

  // Box bottom
  box.push(" " + spanner.join("-"), "");


  // Return box
  return box.join("\n");
}


/**
 * Build the say box
 *
 * The default wrap word value is 40, so wrap words at or before the 40th
 * column.
 *
 * @param {string} [message] The message to show
 * @param {number | false | null} [wrap=40] Word wrap column
 * @returns {string} The action box
 */
function say(message, wrap) {
  return perform("say", message, wrap);
}

/**
 * Build the think box
 *
 * The default wrap word value is 40, so wrap words at or before the 40th
 * column.
 *
 * @param {string} [message] The message to show
 * @param {number | false | null} [wrap=40] Where the message should be wrapped
 * @returns {string} The action box
 */
function think(message, wrap) {
  return perform("think", message, wrap);
}


/**
 * Build the action boxs for the cow message
 *
 * @module cowsayjs/lib/box
 */
module.exports = {
  perform: perform,
  say: say,
  think: think
};
