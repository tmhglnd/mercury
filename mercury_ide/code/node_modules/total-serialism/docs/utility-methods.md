# Utility Methods

Basic arithmetic and methods necessary to run functions in the libraries above. But can also be of help in your own algorithmic processes.

## Include

```js
const Util = require('total-serialism').Utility;
```

## Usage

Mapping and scaling methods

```js
// Apply modulus (%) operation to an array
Util.mod([-2, 4, 3, 7], 5);
//=> [ 3, 4, 3, 2 ] 

// Constrain an array between low and high values
Util.bound([-2, 4, 3, 7], 1, 5);
//=> [ 1, 4, 3, 5 ] 

// Fold an array between low and high values
// Higher/lower values will bounce back instead of wrap
Util.fold([-1, 0, 1, 2, 3, 4, 5], 0, 3);
//=> [ 1, 0, 1, 2, 3, 2, 1 ]

// Scale values from an input range to output range
Util.map([0, 1, 2, 3, 4], 0, 4, -1, 1);
//=> [ -1, -0.5, 0, 0.5, 1 ] 
```

Basic arithmetic methods that accept arrays in both arguments. Outputlength is always the length of the longest list. 

```js
// Add two arrays sequentially
Util.add([1, 2, 3, 4], [1, 2, 3]);
//=> [ 2, 4, 6, 5 ] 

// Subtract two arrays sequentially
Util.subtract([1, 2, 3, 4], [1, 2, 3]);
//=> [ 0, 0, 0, 3 ] 

// Multiply two arrays sequentially
Util.multiply([1, 2, 3, 4], [1, 2, 3]);
//=> [ 1, 4, 9, 4 ] 

// Divide two arrays sequentially
Util.divide([1, 2, 3, 4], [1, 2, 3]);
//=> [ 1, 1, 1, 4 ] 
```
