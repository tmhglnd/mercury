//=======================================================================
// index.js
// main of 'total-serialism' Package
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// MIT License
//
// total-serialism is a set of methods for the generation and 
// transformation of number sequences designed with algorithmic 
// composition for music in mind.
//=======================================================================

// require the various libraries
const Generative    = require('./src/gen-basic.js');
const Algorithmic   = require('./src/gen-complex.js');
const Stochastic    = require('./src/gen-stochastic.js');
const Transform     = require('./src/transform.js');
const Statistic     = require('./src/statistic.js')
const Translate     = require('./src/translate.js');
const Utility       = require('./src/utility.js');

// export the various libraries
exports.Generative  = Generative;
exports.Algorithmic = Algorithmic;
exports.Stochastic  = Stochastic;
exports.Transform   = Transform;
exports.Statistic   = Statistic;
exports.Translate   = Translate;
exports.Utility     = Utility;

// Methods exposed to global scope
exports.getSettings = Translate.getSettings;
exports.setTempo    = Translate.setTempo;
exports.getTempo    = Translate.getTempo;
exports.setBPM      = Translate.setTempo;
exports.getBPM      = Translate.getTempo;
exports.setScale    = Translate.setScale;
exports.getScale    = Translate.getScale;
exports.setRoot     = Translate.setRoot;
exports.getRoot     = Translate.getRoot;

// Include all methods as part of the main library
// This allows you to use everything without having to specify the 
// various libraries
// Object.assign(this, Generative, Algorithmic, Stochastic, Transform, Statistic, Translate, Utility);