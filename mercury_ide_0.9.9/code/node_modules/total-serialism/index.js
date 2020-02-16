//==============================================================================
// index.js
// main of 'total-serialism' Package
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// MIT License
//
// total-serialism is a set of methods for the generation and 
// transformation of number sequences designed with algorithmic 
// composition for music in mind.
//==============================================================================

// require the various libraries
const Generative = require('./lib/gen-basic.js');
const Algorithmic = require('./lib/gen-complex.js');
const Stochastic = require('./lib/gen-stochastic.js');
const Transform = require('./lib/transform.js');
const Translate = require('./lib/translate.js');
const Utility = require('./lib/utility.js');
// const Dict = require('./lib/dict.js');

// export the various libraries
exports.Generative = Generative;
exports.Algorithmic = Algorithmic;
exports.Stochastic = Stochastic;
exports.Transform = Transform;
exports.Translate = Translate;
exports.Utility = Utility;
// exports.Dict = Dict;
