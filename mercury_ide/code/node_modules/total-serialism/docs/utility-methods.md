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

## minimum

Return the minimum value from an array (Also part of `.Statistic`)

```js
Util.minimum([-38, -53, -6, 33, 88, 32, -8, 73]);
//=> -53 
// Alternative: Util.min()
```

## maximum

Return the maximum value from an array (Also part of `.Statistic`)

```js
Util.maximum([-38, -53, -6, 33, 88, 32, -8, 73]);
//=> 88 
// Alternative: Util.max()
```

## normalize

Normalize all the values in an array between 0. and 1.
The highest value will be 1, the lowest value will be 0.

**arguments**
- {Number/Array} -> input values
- {Int/Array} -> normailzed values

```js
Util.normalize([0, 1, 2, 3, 4]);
//=> [ 0, 0.25, 0.5, 0.75, 1 ]

Util.normalize([5, 12, 4, 17, 3]);
//=> [ 0.14285714285714285, 0.6428571428571429, 0.07142857142857142, 1, 0 ] 
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

## draw

Draw a grayscale ascii character image of the input 2D-array to the console and return drawing as a string. If you just want the graph returned as string and not log to console set `{ log: false }`. If you want to print using a characterset under ascii-code 256 use `{ extend: false }`. For error reporting when values are `NaN` use `{ error: true }`.

**arguments**

- {Array/2D-Array} -> values to draw
- {Object} -> preferences
	- -> { log: false } don't log to console and only return
	- -> { extend: true } use extended ascii characters
	- -> { error: false } use error character for error reporting

```js 

let drawing = [];
Rand.seed(628);
for (let i=0; i<10; i++){
	drawing.push(Rand.drunk(42, 5));
}
Util.draw(drawing);

// ░░▒░▒▒▓██▓▒▓▒▒▒▓▓▓█▓███▓▒▓▓█▓██▓▒▓▓██▓█▓▒▒
// ░░░░   ░     ░░        ░░▒▒░░░░░▒▓█▒▒▓█▓▒▒
// ░▒░▒▒▒░░░▒▒█▒▒▒▒▒▒▒▓▒▒▒▒▒▒▒▓▒▒▒▒▒▓██▓▓▓▒▒░
// ▒░░    ░  ░▒░░░    ░           ░        ░▒
// ▒▓█▓▓▓█▓▒▒▒▓▓▓██▓▓▓▒▒░░▒░▒░░▒░░  ░▒▒▓▓██▓▓
// ▒░▒▓▒▓▒░▒░ ░░░░░   ░▒▓▓▓▓▒░▒▒░░░░░░░░░    
// ░░░░░      ░        ░      ░    ░░░▒▒░░ ░░
// ░ ░░░   ░░░▒░▒▒░▒▒▓█▒▒▒▒▒▒▒░░▒░░░░░ ░░    
// ░▒░░░░▒▓█▓▒▒▒░ ░░ ░▒░░░    ░▒▒▒▒▒▒▓█▓▓█▓▒█
// ░   ░░░░▒▒▒░░  ░▒▒▒▒▒▒▒▒▒░▒▒▓█▓▒▒░░░░░    

let harmonics = [];
for (let i=0; i<10; i++){
	harmonics.push(Gen.sine(42, i+1));
}
Util.draw(harmonics, { extend: false });

// --==+++########+++==---..              ..-
// -=++####+=--.       .-=++####+=--.       .
// -=+##+=-.    .-=+##+=-.    .-=+##+=-.    .
// -+##+-.   .=+##=-    -+##+-.   .=+##=-    
// -+#+-   .=##=.   -+#+-   -+##=.  .=##+-   
// -+#=.  -+#=.  -+#=.  -+#=.  -+#=.  -+#=.  
// -##-  -##-  -##-  -##-  -##-  -##-  -##-  
// -#+. .+#-  +#-  =#=  -#+. .+#-  +#-  =#=  
// -#=  =#- .++. -#=  =#- .++. -#=  =#- .++. 
// -#- .#=  ++  +#. =#- -#- .#=  ++  +#. =#- 

```