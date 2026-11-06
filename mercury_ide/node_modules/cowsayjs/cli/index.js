"use strict";

var fs = require("fs");
var path = require("path");

var lib = require("../lib");
var mode = require("../lib/mode");
var cows = require("../cows");


/**
 * Common command line arguments
 *
 * @typedef {Object} CLIArgs
 * @property {boolean} [help] Show help
 * @property {boolean} [list] List available cows
 * @property {string} message Message
 * @package
 */

/**
 * Full parsed cow arguments
 *
 * @typedef {import("../lib").CowAllOptions & CLIArgs} CowArgs
 */

/**
 * Argument data
 *
 * @typedef {Object} ArgData
 * @property {string} data Data
 * @property {number} next Next argument list index
 * @package
 */


/**
 * Parsed `package.json` file
 *
 * @type {Record<string, string | string[] | Record<string, string>>}
 * @package
 */
var package_json = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"));


/**
 * Get all available cow mode data IDs
 *
 * @returns {string[]}
 * @package
 */
function getModes() {
  return mode.modes
    .slice(1)
    .concat(mode.customModes)
    .map(function(mode) { return mode.id; });
}

/**
 * Get the argument data for the given position of the argument list
 *
 * @param {string} token Option token
 * @param {number} j Current token index
 * @param {string[]} argv Argument list
 * @param {number} i Current argument index
 * @returns {ArgData} Parsed argument data
 * @package
 */
function getArg(token, j, argv, i) {
  // Get rest of token
  var data = token.slice(j + 1);
  var next = i;

  // Check next token
  if (data.length === 0) {
    next += 1;

    if (next < argv.length) {
      data = argv[next];
    }
  }

  // Return data
  return {
    data: data,
    next: next
  };
}


/**
 * Print scripts help
 *
 * @package
 */
function printHelp() {
  // Current year
  var year = new Date().getFullYear();

  // Get current script
  var script = process.argv[1].replace(/\\/g, "/");
  script = script.slice(script.lastIndexOf("/") + 1).replace(/\./, "");


  // Script info
  var info =
    "moojs, cowsayjs, cowthinkjs v" + package_json.version + "\n" +
    "Copyright (c) " + year + " Erick Rincones\n" +
    "Licensed under the MIT License\n\n";

  // Brief
  var brief =
    "  A nodejs clone of the classic cowsay and cowthink cli commands.\n\n";


  // Usage
  var usage =
    "Usage: " + script + " [options] [message]\n\n";

  // Options
  var modes = getModes().join("");
  var modeOptsPad = Array(modes.length < 12 ? 12 - modes.length : 15).join(" ");
  var modeOptsSep = modeOptsPad.length === 15 ? "\n" : " ";
  var modeOpts = modes + modeOptsSep + modeOptsPad;
  var reflexive = script === "moojs" ?
    "  -r           A reflexive cow will think instead say the message\n" : "";

  var options =
    "Options:\n" +
    "  -h           Print this message\n" +
    "  -e EYES      Set the first two chars of EYES as the cow eyes\n" +
    "  -f COW       Specify the cow to use\n" +
    "  -l           Show the list of available cows\n" +
    "  -n           No wrap and show original message\n" +
    reflexive +
    "  -T TONGUE    Set the first tow characters of TONGUE as the cow tongue\n" +
    "  -W COLUMN    Specifies where the message should be wrapped\n" +
    "  -" + modeOpts + "Select one mode to use a predefined face\n\n";

  // Details
  var details =
    "By default EYES are \"oo\" and COLUMN is 40. The eyes and tongue\n" +
    "cannot be changed for some cows specified by the -f option.\n\n";


  // Examples
  var examples =
    "Examples:\n" +
    "  cowsayjs Moo world\n" +
    "  cowthinkjs -f small -b -T \"U \" -W 10 I am a reflexive little cow\n" +
    "  moojs -f dragon -r Another reflexive cow\n" +
    "  echo -e 'This message\\n\\nwill\\tnot\\n\\n  be wraped' | moojs -n\n\n";

  // Extra
  var extra =
    "Full documentation and source code: https://github.com/erincones/cowsayjs\n" +
    "Online version: https://nextmoo.vercel.app\n";


  // Print help
  var help = info + brief + usage + options + details + examples + extra;
  process.stdout.write(help);
}

/**
 * Print cows list
 *
 * @package
 */
function printCorral() {
  var corral = cows.corral.concat(cows.customCorral);
  var i = 0;

  do {
    var cow = corral[i];
    process.stdout.write(cow.name + "\n");
  } while (++i < corral.length);
}


/**
 * Parse the script arguments
 *
 * @param {import("../lib/box").BoxAction} [action] Default cow action
 * @returns {CowArgs} Script arguments
 * @package
 */
function parseArgs(action) {
  // Set default action and initial values
  /** @type {CowArgs} */
  var args = { action: action, message: "" };
  var argv = process.argv;
  var modes = getModes();
  var stop = false;
  var i = 2;

  // Check number of arguments
  if (argv.length <= 2) {
    return args;
  }


  // Parse arguments
  do {
    var arg = argv[i];

    // Handle message
    if (arg.length <= 1 || arg[0] !== "-") {
      stop = true;
    }

    // Handle arguments
    else {
      var token = arg.slice(1);
      var j = 0;

      do {
        // Check each option
        var opt = token[j];

        switch (opt) {
          // Boolean options
          case "h": args.help = true; return args;
          case "l": args.list = true; break;
          case "n": args.wrap = false; break;
          case "r": args.action = action || "think"; break;

          // Options with arguments
          case "e": case "f": case "T": case "W": {
            var parsed = getArg(token, j, argv, i);
            j = token.length;
            i = parsed.next;

            switch (opt) {
              case "e": args.eyes = parsed.data; break;
              case "f": args.cow = parsed.data; break;
              case "T": args.tongue = parsed.data; break;
              case "W":
                if (args.wrap !== false) {
                  args.wrap = parseInt(parsed.data);
                }
            }
            break;
          }

          default:
            // Mode options
            if (modes.indexOf(opt) !== -1) {
              args.mode = opt;
            }
            else {
              process.stderr.write("Unknown option: " + opt + "\n");
            }
        }
      } while (++j < token.length);
    }
  } while (!stop && ++i < argv.length);


  // Set message
  if (stop && i < argv.length) {
    args.message = argv.slice(i).join(" ");
  }

  // Return arguments
  return args;
}

/**
 * Parse arguments and execute the given cow action
 *
 * @param {import("../lib/box").BoxAction} [action] Default cow action
 */
function exec(action) {
  // Get arguments
  var args = parseArgs(action);

  // Print help
  if (args.help) {
    printHelp();
  }

  // Print list of cows
  else if (args.list) {
    printCorral();
  }

  // Print cow with shell message
  else if (process.stdin.isTTY === true || args.message.length !== 0) {
    process.stdout.write(lib.moo(args) + "\n");
  }

  // Print cow with piped message
  else {
    args.message = "";

    process.stdin.on("data", function(chunk) {
      // Get data
      args.message += chunk.toString();
    }).on("end", function() {
      // Remove empty final line and print cow
      args.message = args.message.replace(/\n$/, "");
      process.stdout.write(lib.moo(args) + "\n");
    });
  }
}


/**
 * Argument parser
 *
 * @module cowsayjs/cli
 */
module.exports = {
  exec: exec
};
