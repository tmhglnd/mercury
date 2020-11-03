# Utility Methods

Basic arithmetic and methods necessary to run functions in the libraries above. Can also be of help in your own algorithmic processes. Also includes a `plot()` method which generates an asciichart of the array printed to the console.

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

## plot

Plot an array of values to the console in the form of an ascii chart and return chart from function. If you just want the chart returned as text and not log to console set { log: false }. Using the asciichart package by x84. 

**arguments**
- {Number/Array/String} -> values to plot
- {Object} -> { log: false } don't log to console and only return
	- -> { data: true } log the original array data
	- -> { decimals: 2 } adjust the number of decimals
	- -> { height: 10 } set a fixed chart line-height
	- -> other preferences for padding, colors, offset. See the asciichart documentation

```js 

Util.plot(Gen.sine(20, 3.1415, 0, 24), { height: 10 });
//=>     23.00 ┼╭─╮    ╭╮    ╭╮     
//       20.70 ┤│ │    ││    │╰╮    
//       18.40 ┤│ │   ╭╯╰╮   │ │    
//       16.10 ┤│ │   │  │  ╭╯ │    
//       13.80 ┤│ ╰╮  │  │  │  │    
//       11.50 ┼╯  │  │  │  │  ╰╮   
//        9.20 ┤   │  │  │  │   │ ╭ 
//        6.90 ┤   │ ╭╯  ╰╮ │   │ │ 
//        4.60 ┤   │ │    │╭╯   │ │ 
//        2.30 ┤   ╰╮│    ││    │ │ 
//        0.00 ┤    ╰╯    ╰╯    ╰─╯  

```