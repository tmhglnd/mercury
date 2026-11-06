[![npm version](https://img.shields.io/npm/v/cowsayjs)][npm]
[![npm total downloads](https://img.shields.io/npm/dt/cowsayjs)][npm]
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/cowsayjs)][npm]
[![node current version](https://img.shields.io/node/v/cowsayjs)][npm]

[![codecov](https://codecov.io/gh/erincones/cowsayjs/branch/master/graph/badge.svg)][codecov]
[![GitHub stars](https://img.shields.io/github/stars/erincones/cowsayjs)][stars]
[![GitHub open issues](https://img.shields.io/github/issues-raw/erincones/cowsayjs)][issues]
[![GitHub last commit](https://img.shields.io/github/last-commit/erincones/cowsayjs)][commits]
[![npm license](https://img.shields.io/npm/l/cowsayjs)][LICENSE]


# cowsayjs

```Text
 _____
< moo >
 -----
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

A nodejs clone of the classic cowsay and cowthink cli commands, originally
written in Perl by [Tony Monroe][tony].

Coded from scratch in pure ES5 for maximum support on client and server side,
zero dependencies and well documented with JSDoc and TypeScript declaration
files to use in modern develop environments. Also, custom cows and modes
management feature has been implemented.


## Online example

Create your custom cows without install or code anything with
[Next Moo!][web]


## Install

Just install the [nodejs package][npm].

```Shell
npm i cowsayjs
```

Use the `-g` option to install globally on your system and **make available the
cli commands**. Maybe you need run with `sudo` if you are using an unix system.

As this is a zero dependencies package, you can also clone the repository, but
you have to setup the scripts manually to execute the cli commands.

```Shell
git clone https://github.com/erincones/cowsayjs.git
```


## Usage

You can use it as cli commands or a dependency of your back-end or front-end
projects.


### CLI

If you install the package globaly with the `-g` option of `npm`, three commands
will be available on your system:

 - `cowsayjs`
 - `cowthinkjs`
 - `moojs`

They have exactly the same behavior of the original `cowsay` and `cowthink`
commands, once installed, run `cowsayjs -h`, `cowthinkjs -h` or `moojs -h` to
print the help.

```Text
moojs, cowsayjs, cowthinkjs v2.0.0
Copyright (c) 2022 Erick Rincones
Licensed under the MIT License

  A nodejs clone of the classic cowsay and cowthink cli commands.

Usage: moojs [options] [message]

Options:
  -h           Print this message
  -e EYES      Set the first two chars of EYES as the cow eyes
  -f COW       Specify the cow to use
  -l           Show the list of available cows
  -n           No wrap and show original message
  -r           A reflexive cow will think instead say the message
  -T TONGUE    Set the first tow characters of TONGUE as the cow tongue
  -W COLUMN    Specifies where the message should be wrapped
  -bdgpstwy    Select one mode to use a predefined face

By default EYES are "oo" and COLUMN is 40. The eyes and tongue
cannot be changed for some cows specified by the -f option.

Examples:
  cowsayjs Moo world
  cowthinkjs -f small -b -T "U " -W 10 I am a reflexive little cow
  moojs -f dragon -r Another reflexive cow
  echo -e 'This message\n\nwill\tnot\n\n  be wraped' | moojs -n

Full documentation and source code: https://github.com/erincones/cowsayjs
```

You can get more details from the official documentation of the orirignal cowsay
here [cowsay(1)][cowsay(1)]. Note that `moojs` command
includes the optional argument `-r` to generate a reflexive thinking cow,
instead a talking cow.

The `js` suffix avoid collisions with the classic commands. When you are ready,
just run the commands with the message and some options.

```Text
$ cowsayjs -f small I need a real job
 __________________
< I need a real job >
 ------------------
       \   ,__,
        \  (oo)____
           (__)    )\
              ||--|| *
```


You can also pipe the output of any command as the message for your cow.

```Text
$ echo Everything is gonna be alright | moojs -r
 ________________________________
( Everything is gonna be alright )
 --------------------------------
        o   ^__^
         o  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```


### NodeJS dependency

Depending on your project setup, you can import the main three functions in two
ways.

```JavaScript
// ES5
var cowsayjs = require("cowsayjs");

console.log(cowsayjs.moo("can you see me?"));
```
```JavaScript
// ES6
import { cowsay, cowthink, moo } from "cowsayjs";

console.log(cowsay(`will anyone read this?`));
```

The three functions can recieve one or two parameters.

```TypeScript
function moo(options?: CowAllOptions): string;
function moo(message?: string, options?: CowMooOptions): string;

function cowsay(options?: CowAllOptions): string;
function cowsay(message?: string, options?: CowOptions): string;

function cowthink(options?: CowAllOptions): string;
function cowthink(message?: string, options?: CowOptions): string;
```

The base for the cow options is a `CowOptions`.

```TypeScript
interface CowOptions {
  cow?: string | Cow;
  mode?: string;
  eyes?: string;
  tongue?: string;
  wrap?: string | number | boolean | null;
}
```

`CowMooOptions` extends the base options and adds the `action` property that
could be `say` or `think` to decide the cow action. This property only works
for the `moo` function and is ignored by the `cowsay` and `cowthink` functions.

`CowAllOption` extends the `CowMooOptions` and adds the `message` property
to pass the message to the cow. If the functions are called with two parameters,
the first one is considered the message and the second one the options, so any
value for `options.message` is ignored.

To disable the text wrapping, set `false` or `null` the `wrap` property. Default
value is `40`.

The default value for the eyes is `"oo"` and `"  "` for the tongue. Just set any
string to change it or one of the [predefined modes][modes] using
the `id` or `name` property to set the `mode` option.

```JavaScript
modes = [
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
```

Unknown values falls back to the `u` mode, wich is the default face.

Check the [cows/][cows] directory to see all the available cows files. Set the
`cow` property of the options with the name of one cow file without `.cow.js`
to use it.

### Examples

```JavaScript
cowsay("English is not my native language", {
  cow: "three-eyes",
  mode: "w",
  tongue: "U "
});
```
```Text
 ___________________________________
< English is not my native language >
 -----------------------------------
        \  ^___^
         \ (OOO)\_______
           (___)\       )\/\
            U   ||----w |
                ||     ||
```

```TypeScript
moo({
  message: `I need to sleep ${new Date().toISOString()}`,
  mode: `paranoia`,
  action: `think`,
  wrap: false
});
```
```Text
 __________________________
( I need to sleep          )
( 2022-10-13T22:22:30.643Z )
 --------------------------
        o   ^__^
         o  (@@)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

```Typescript
cowthink({
  message: `No way, I don't want the leftovers of your love.`,
  eyes: `><`,
  wrap: 21,
  cow: {
    template: [
      `   \\`,
      `    \\  (\\__/)`,
      `     \\ (•ㅅ•)`,
      `       /    づ`
    ],
    defEyes: `••`,
    actionPos: [
      [ 0, 3 ],
      [ 1, 4 ],
      [ 2, 5 ]
    ],
    eyesPos: [
      [ 2, 8 ],
      [ 2, 10 ]
    ]
  }
});
```

```Text
 ______________________
( No way, I don't want )
( the leftovers of     )
( your love.           )
 ----------------------
   o
    o  (\__/)
     o (>ㅅ<)
       /    づ
```


#### Custom cows and modes management

For custom cows management, consider the next `Cow` type definition:

```Typescript
type Position = [ number, number ];

interface Cow {
  /** Cow name */
  name: string;
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
```

Where `Position` is a list of pairs of numbers where the first entry refers to
the template line and the second entry refers to the caracter position of the
template line. Both values are zero based.

Use the custom cows management functions to add or remove custom cows. Take in
count that predefined cows cannot be modified, you cannot add two cows with
the same name.

Custom cows are sorted by lexicographic order.

```Typescript
/**
 * Add a new cow to the custom corral
 *
 * @param cow New cow to add
 * @returns whether the cow could be added
 */
function addCow(cow: Cow): boolean;

/**
 * Remove a cow from the custom corral
 *
 * @param name Cow name
 * @returns Removed cow
 */
function removeCow(name: string): Cow | undefined;
```


For custom modes management, consider the next `CowModeData` type definition:

```Typescript
interface CowModeData {
  /** The short name of the mode */
  id: string;
  /** The full name of the mode */
  name: string;
  /** Eyes of the cow */
  eyes?: string;
  /** Tongue of the cow */
  tongue?: string;
}
```
Use the custom modes management functions to add ro remove custom modes. Take
in count that predefined modes cannot be modified, you cannot add two modes
with the same ID and name, ID should have one character and match with the
first character of the name.

Custom modes are sorted by lexicographical order.

```Typescript
/**
 * Add a new cow mode data to the custom cow mode data list
 *
 * Cow mode data id should match with the first name letter (case sensitive) and
 * should be different to any existing option.
 *
 * @param modeData Cow mode data to add
 * @returns Whether the cow mode data could be added
 */
function addMode(modeData: CowModeData): boolean;

/**
 * Remove a cow mode data from the custom cow mode data list
 *
 * @param id The id or name of the cow mode
 * @return Removed cow mode data
 */
function removeMode(id: string): CowModeData | undefined;
```


## Utilities

They are some aditional useful functions available. The modern code editors
should show you the docummentation from the JDocs or TypeScript declaration
files.

```JavaScript
// List of cows
import {
  corral,        // List of predefined cows
  customCorral,  // List of custom cows
  getCow,        // Get cow from the given name
  addCow,        // Add a new custom cow
  removeCow,     // Remove a custom cow
  renderCow      // Generate the cow string
} from "cowsayjs/cows";

import {
  modes,        // List of predefined modes
  customModes,  // List of custom modes
  faceMode,     // Get mode from the given eyes and tongue
  modeFace,     // Get face from the given mode
  addMode,      // Add a new custom mode
  removeMode    // Remove a custom mode
} from "cowsayjs/lib/mode";

import {
  perform,  // Generate a say or think box
  say,      // Generate a say box
  think     // Generate a think box
} from "cowsayjs/lib/box";
```


## Tests

Install the dev dependencies to run the tests locally. The classic `cowsay` and
`cowthink` commands must be installed in your system to be able to run the
tests.

There are certain environment variables which you can control the tests.

| Environment variable  | Description                                     | Default value |
|-----------------------|-------------------------------------------------|---------------|
| `MSG`                 | Standard message for short tests                | `moo`         |
| `COWSAY`              | Cowsay command                                  | `cowsay`      |
| `COWTHINK`            | Cowthink command                                | `cowthink`    |
| `SKIP_TESTS_COMMANDS` | If `1`, skips the command existence tests       |               |
| `SKIP_TESTS_ACTION`   | If `1`, skips the actions tests                 |               |
| `SKIP_TESTS_MODE`     | If `1`, skips the modes tests                   |               |
| `SKIP_TESTS_CORRAL`   | If `1`, skips the corral tests                  |               |
| `SKIP_TESTS_STRICT`   | If `1`, skips the comparison with `COWSAY` cows |               |
| `SKIP_TESTS_WRAP`     | If `1`, skips the wrapping tests                |               |


## License

Licensed under [the MIT license][LICENSE].

Share and enjoy!


<!-- References -->
[npm]: https://www.npmjs.com/package/cowsayjs
[github]: https://github.com/erincones/cowsayjs
[stars]: https://github.com/erincones/cowsayjs/stargazers
[commits]: https://github.com/erincones/cowsayjs/graphs/commit-activity
[issues]: https://github.com/erincones/cowsayjs/issues
[codecov]: https://codecov.io/gh/erincones/cowsayjs

[tony]: https://github.com/tnalpgge/rank-amateur-cowsay
[web]: https://nextmoo.vercel.app
[cowsay(1)]: https://linux.die.net/man/1/cowsay

[modes]: lib/mode.js#L40
[cows]: cows/
[LICENSE]: LICENSE
