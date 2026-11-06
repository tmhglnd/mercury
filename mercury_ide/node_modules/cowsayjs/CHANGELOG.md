# v2.0.0

## Feature

- Second phase finished. Customization, tests, code coverage and CI are correctly implemented.

## Fixed

- Remove paragraph about tests revision in [`README.md`](https://github.com/erincones/cowsayjs/blob/v2.0.0/README.md).


# v1.2.3

## Fixed

- Codecov badge in [`README.md`](https://github.com/erincones/cowsayjs/blob/v1.2.3/README.md).


# v1.2.2

## Features

- Setup CI with Github actions.
- Add coverage test action workflow with Codecov.

### To do
- [x] Setup CI.


# v1.2.1

## Features

- Add nyc setup file and `package.json` script.
- Add mocha setup file.
- Add tests for custom cows and modes management.
- Reference to original source code in [`README.md`](https://github.com/erincones/cowsayjs/blob/v1.2.1/README.md).
- Update dependencies.

## Fixed

- Some cows designs have been fixed.
- Box generation for empty messages.
- Test script has been improved.

### To do
- [x] Fix tests.
- [ ] Setup CI.


# v1.2.0

## Features

- Add [CHANGELOG.md](https://github.com/erincones/cowsayjs/blob/v1.2.0/CHANGELOG.md) file.
- Add any version of node to engines in [`package.json`](https://github.com/erincones/cowsayjs/blob/v1.2.0/package.json).
- Update dependencies.

## Fixed

- Don't export the `parseArgs` function from [cli/index.js](https://github.com/erincones/cowsayjs/blob/v1.2.0/cli.index.js) and rename the `execArgs` to `exec`.
- Fix [`README.md`](https://github.com/erincones/cowsayjs/blob/v1.2.0/README.md) badges.

### To do
- [ ] Fix tests.
- [ ] Setup CI.


# v1.1.4

## Features

- Name of custom cows for `moo`, `cowsay` and `cowthink` methods is not mandatory and ignored if it's provided.

## Fixed

- Custom cow usage in [`README.md`](https://github.com/erincones/cowsayjs/blob/v1.1.4/README.md) file has been improved.
- Version for help message of [cli commands](https://github.com/erincones/cowsayjs/blob/v1.1.4/cli/index.js#L43) is taken from [`package.json`](https://github.com/erincones/cowsayjs/blob/v1.1.4/package.json) file instead of hardcoding it.
- Copyright year for help message of [cli commands](https://github.com/erincones/cowsayjs/blob/v1.1.4/cli/index.js#L97) is taken from machine clock instead of hardcoding it.

### To do
- [ ] Fix tests.
- [ ] Setup CI.


# v1.1.3

## Fixed

- Cows design errors.

### To do
- [ ] Fix tests.
- [ ] Setup CI.


# v1.1.2

## Features

- New cows have been added.
- Custom cows management feature.
- Custom modes management feature.

## Fixed

- Type definitions.
- Cow rendering function.
- Box rendering function.
- Cows design.

### To do
- [ ] Fix tests.
- [x] Add more cows.
- [ ] Setup CI.
- [x] Add modes programmatically.
- [x] Add cows programmatically.


# v1.0.7

## Features

- Update dependencies

## Fixed

- Type documentation comments:
  - `CowRenderer`
  - `CowAllOptions`
  - `moo`
  - `cowsay`
  - `cowthink`.

### To do
- [ ] Fix tests.
- [ ] Add more cows.
- [ ] Setup CI.
- [ ] Add modes programmatically.
- [ ] Add cows programmatically.


# v1.0.5

## Features

- Add badges to [README.md](https://github.com/erincones/cowsayjs/blob/v1.0.5/README.md).
- Update dependencies

## Fixed

- Independent testing of the `cowsay` and `cowthink` commands.

### To do
- [ ] Add modes programmatically.
- [ ] Add cows programmatically.


# v1.0.4

## Fixed

- Fix action for `cowthink` when options is not given.

### To do
- [ ] Add modes programmatically.
- [ ] Add cows programmatically.


# v1.0.3

## Fixed

- Fix [#1](https://github.com/erincones/cowsayjs/issues/1): ES6 example code is not using the right format.

### To do
- [ ] Add modes programmatically.
- [ ] Add cows programmatically.


# v1.0.2

## Fixed

- Documentation misspellings.

### To do
- [ ] Add modes programmatically.
- [ ] Add cows programmatically.


# v1.0.1

## Features

- Update the home page.

### To do
- [ ] Add modes programmatically.
- [ ] Add cows programmatically.


# v1.0.0

## Features

- Receive the one argument with all options or traditional two arguments with the message and options separately.
- Improve the documentation.

### To do
- [ ] Add modes programmatically.
- [ ] Add cows programmatically.


# v0.3.5

## Fixed

- Fatal bug when wrap is a string with not valid integer format.

## Features

- Simplify tests without affect the coverage.

### To do
- [ ] Add modes programmatically.
- [ ] Add cows programmatically.


# v0.3.4

## Fixed

- Webpack support.

### To do
- [ ] Add modes programmatically.
- [ ] Add cows programmatically.


# v0.3.3

## Features

- How to pipe messages example now available in [README.md](https://github.com/erincones/cowsayjs/blob/v0.3.3/README.md).

### To do
- [ ] Add modes programmatically.
- [ ] Add cows programmatically.


# v0.3.2

## Fixed

- Code blocks in [README.md](https://github.com/erincones/cowsayjs/blob/v0.3.2/README.md).
- Version number for cli commands help output.

### To do
- [ ] Add modes programmatically.
- [ ] Add cows programmatically.


# v0.3.1

## Fixed

- Default eyes to `".."` for the small cow when a empty eyes string is provided.
- Eyes spacing for the udder cow when the eyes string is only one character.
- Special wrapping cases.

### To do
- [x] Complete the [README.md](https://github.com/erincones/cowsayjs/blob/v0.3.1/README.md) file.
- [x] Improve tests.
- [ ] Add modes programmatically.
- [ ] Add cows programmatically.


# v0.3.0

## Features

- **Zero dependencies**.
- Coded in pure **ES5** for best support.
- Full **documented** code with **JSDoc** and **TypeScript** declaration files.
- **CLI** commands with the same parameters as the original `cowsay` and `cowthink` commands.
- **Tested** against the original `cowsay` and `cowthink` commands.

### To do
- [ ] Complete the [README.md](https://github.com/erincones/cowsayjs/blob/v0.3.0/README.md) file.
- [ ] Improve tests.
- [ ] Add modes programmatically.
- [ ] Add cows programmatically.
