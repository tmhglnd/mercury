# Mercury Grammar Design

This folder contains the work in progress of an updated grammar design for the Mercury tokenizer and parser using the Moo lexer and Nearley parser.

## NPM dependencies

- [Nearley Parser Toolkit](https://nearley.js.org/)
- [Moo! Tokenizer/Lexer Generator](https://www.npmjs.com/package/moo)

## How To Use

first run `npm install` in the grammar directory

1. Open the `mercury.ne` file to view the grammar in the Nearley language including the moo tokenizer as embedded js code on the top.
2. Generate the `grammar.js` parser file with the command `npm run gen` on the commandline.
3. Generate the railroad graph with the command `npm run graph` on the commandline.
4. Test the parser with the `parser-test.js` file by running the command `npm run test`.