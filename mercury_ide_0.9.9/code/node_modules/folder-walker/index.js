var from = require('from2')
var path = require('path')

module.exports = walker

function walker (dirs, opts) {
  var fs = opts && opts.fs || require('fs')
  var filter = opts && opts.filter || function (filename) { return true }
  if (!Array.isArray(dirs)) dirs = [dirs]
  var maxDepth = opts && opts.maxDepth || Infinity

  dirs = dirs.filter(filter)

  var pending = []
  var root = dirs.shift()
  if (root) pending.push(root)

  return from.obj(read)

  function read (size, cb) {
    if (!pending.length) {
      if (dirs.length) {
        root = dirs.shift()
        pending.push(root)
        return read(size, cb)
      }
      return cb(null, null)
    }
    kick(cb)
  }

  function kick (cb) {
    var name = pending.shift()
    if (typeof name === 'undefined') return cb(null, null)
    fs.lstat(name, function (err, st) {
      if (err) return done(err)
      if (!st.isDirectory() || depthLimiter(name, root, maxDepth)) return done(null)

      fs.readdir(name, function (err, files) {
        if (err) return done(err)
        files.sort()
        for (var i = 0; i < files.length; i++) {
          var next = path.join(name, files[i])
          if (filter(next)) pending.unshift(next)
        }
        if (name === root) kick(cb)
        else done(null)
      })

      function done (err) {
        if (err) return cb(err)
        var item = {
          root: root,
          filepath: name,
          stat: st,
          relname: root === name ? path.basename(name) : path.relative(root, name),
          basename: path.basename(name)
        }
        var isFile = st.isFile()
        if (isFile) {
          item.type = 'file'
        }
        var isDir = st.isDirectory()
        if (isDir) item.type = 'directory'
        cb(null, item)
      }
    })
  }
}

function depthLimiter (filePath, relativeTo, maxDepth) {
  if (maxDepth === Infinity) return false
  const rootDepth = relativeTo.split(path.sep).length
  const fileDepth = filePath.split(path.sep).length
  return fileDepth - rootDepth > maxDepth
}
