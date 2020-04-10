# folder-walker

A recursive stream of the files and directories in a given folder. Can take multiple folders.

[![build status](http://img.shields.io/travis/karissa/folder-walker.svg?style=flat)](http://travis-ci.org/karissa/folder-walker)
![dat](http://img.shields.io/badge/Development%20sponsored%20by-dat-green.svg?style=flat)

## Install

```console
npm install folder-walker
```

## Example

```js
var walker = require('folder-walker')
var stream = walker(['/path/to/folder', '/another/folder/here'])
stream.on('data', function (data) {
  console.log(data)
})
```

Example item in the stream:

```js
{
  basename: 'index.js',
  relname: 'test/index.js',
  root: '/Users/karissa/dev/node_modules/folder-walker',
  filepath: '/Users/karissa/dev/node_modules/folder-walker/test/index.js',
  stat: [fs.Stat Object],
  type: 'file' // or 'directory'
}
```

## API

#### `stream = walker(dirs, [opts])`

Create a readable object stream of all files and folders inside of `dirs`.

`dirs` can be a path to a directory or an array of paths to directories.

`opts` includes:

```js
{
  fs: require('fs'), // the fs interface to use
  maxDepth: Infinity // maximum folder depth to walk. Minimum depth is 1.
  filter: function (filename) { return true } // a function that lets you filter out files by returning false
  // filter is applied to the `dirs` argument, and every file that folder-walker finds
}
```
