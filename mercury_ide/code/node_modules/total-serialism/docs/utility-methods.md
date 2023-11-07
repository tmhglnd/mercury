# Utility

Basic arithmetic and methods necessary to run functions in the libraries above. Can also be of help in your own algorithmic processes. Also includes a `plot()` and `draw()` method which generates an asciichart or ascii-image of the array printed to the console.

## Include

```js
const Util = require('total-serialism').Utility;
```

# Methods

- [wrap](#wrap)
- [constrain](#constrain)
- [fold](#fold)
- [scale](#scale)
- [lerp](#lerp)
- [add](#add)
- [subtract](#subtract)
- [multiply](#multiply)
- [divide](#divide)
- [mod](#mod)
- [pow](#pow)
- [sqrt](#sqrt)
- [arrayCalc](#arraycalc)
- [toArray](#toArray)
- [size](#size)
- [sum](#sum)
- [minimum](#minimum)
- [maximum](#maximum)
- [normalize](#normalize)
- [flatten](#flatten)
- [plot](#plot)
- [draw](#draw)

# Mapping and scaling methods

Various mapping and scaling methods to keep values of n-dimensional arrays within a specified range.

## wrap

Wrap values from a list within a specified low and high range.

**arguments**
- {Array} -> Array to wrap
- {Number} -> Low value (optional, default=12)
- {Number} -> High value (optional, default=0)

```js
Util.wrap([0, [1, [2, 3]], [4, 5], 6], 2, 5);
//=> [ 3, [ 4, [ 2, 3 ] ], [ 4, 2 ], 3 ] 

Util.wrap(Gen.spread(30), 2, 8);
//=>  7.00 ┤╭╮    ╭╮    ╭╮    ╭╮    ╭╮    
//    6.00 ┼╯│   ╭╯│   ╭╯│   ╭╯│   ╭╯│    
//    5.00 ┤ │  ╭╯ │  ╭╯ │  ╭╯ │  ╭╯ │  ╭ 
//    4.00 ┤ │ ╭╯  │ ╭╯  │ ╭╯  │ ╭╯  │ ╭╯ 
//    3.00 ┤ │╭╯   │╭╯   │╭╯   │╭╯   │╭╯  
//    2.00 ┤ ╰╯    ╰╯    ╰╯    ╰╯    ╰╯    
```

## constrain

Constrain values from a list within a specified low and high range.

**arguments**
- {Array} -> Array to constrain
- {Number} -> Low value (optional default=12)
- {Number} -> High value (optional default=0)

```js
Util.constrain([0, [1, [2, 3]], [4, 5], 6], 2, 5);
//=> [ 2, [ 2, [ 2, 3 ] ], [ 4, 5 ], 5 ] 

Util.constrain(Gen.cosine(30, 1), 5, 9);
//=>  9.00 ┼─────╮                   ╭─── 
//    8.20 ┤     │                  ╭╯    
//    7.40 ┤     ╰╮                ╭╯     
//    6.60 ┤      ╰╮              ╭╯      
//    5.80 ┤       │              │       
//    5.00 ┤       ╰──────────────╯ 

// Alias: bound(), clip(), clamp()
```

## fold

Fold values from a list within a specified low and high range.

**arguments**
- {Array} -> Array to fold
- {Number} -> Low value (optional, default=12)
- {Number} -> High value (optional, default=0)

```js
Util.fold([0, [1, [2, 3]], [4, 5], 6], 2, 5);
//=> [ 4, [ 3, [ 2, 3 ] ], [ 4, 5 ], 4 ]

Util.fold(Gen.spreadFloat(30, -9, 13), 0, 1);
//=>  1.00 ┼╮         ╭╮      ╭╮          
//    0.80 ┤│ ╭╮   ╭╮ ││ ╭╮╭╮ ││ ╭╮   ╭╮  
//    0.60 ┤│ ││╭─╮││ ││╭╯││╰╮││ ││╭─╮││  
//    0.40 ┤│╭╯││ ││╰─╯││ ││ ││╰─╯││ ││╰╮ 
//    0.20 ┤╰╯ ││ ╰╯   ╰╯ ││ ╰╯   ╰╯ ││ ╰ 
//    0.00 ┤   ╰╯         ╰╯         ╰╯    

// Alias: bounce()
```

## scale

Rescale values from a list from a specified input range to a specified low and high output range.

**arguments**
- {Array} -> Array to wrap
- {Number} -> Low value (optional, default=1)
- {Number} -> High value (optional, default=0)
- {Number} -> Low value (optional, default=1)
- {Number} -> High value (optional, default=0)
- {Number} -> Exponent value (optional, default=1)

```js
Util.scale([0, [1, [2, 3]], 4], 0, 4, -1, 1);
//=> [ -1, [ -0.5, [ 0, 0.5 ] ], 1 ] 

// Alias: map()
```

## mod

Return the remainder after division. Also works in the negative direction, so wrap starts at 0

**arguments**
- {Int/Array} -> input value
- {Int/Array} -> divisor (optional, default=12)
- {Int/Array} -> remainder after division

```js
Util.mod([-2, [4, [3, 7]]], 5);
//=> [ 3, [ 4, [ 3, 2 ] ] ]
```

## lerp

Lerp (linear interpolation) two values or arrays. Both sides can be a single value or an array. Set the interpolation factor as third argument.

**arguments**
- {Number/Array} -> input 1 to be mixed
- {Number/Array} -> input 2 to be mixed
- {Number} -> interpolation factor (optional, default=0.5)

```js
Util.lerp(2, 10, 0.5)
//=> 6

Util.lerp([-2, 4, 6], [10, 20, 30], 0.5)
//=> [4, 12, 18]

// Alias: mix()
```

## toArray

Check if the value is an array or not and if not transform into an array.

**arguments**
- {Value} -> input to be checked

**return**
- {Array} -> the input as an array

```js
Util.toArray();
//=> [undefined]

Util.toArray(1);
//=> [ 1 ]

Util.toArray([1, 2, 3]);
//=> [ 1, 2, 3 ]
```

## fromArray

Check if the value is an array or not and if it is an array output the first value

**arguments**
- {Value} -> intput to be checked
- {Int+} -> index to return from Array (optional, default=0)

**return**
- {Value} -> single value output

```js
Util.fromArray();
//=> undefined

Util.fromArray([1, 2, 3]);
//=> 1

Util.fromArray([1, 2, 3], 2);
//=> 3
```

## size

Return the length/size of an array if the argument is an array. If the argument is a number return the number as a positive integer greater than 0. If the argument is not a number return 1. The method can be used to input arrays as arguments for other functions

**arguments**
- @param {Value/Array} -> input value to check
- @return {Int} -> the array length

```js
Util.size([5, 7, 3, 2, 9]);
//=> 5

Util.size(8);
//=> 8

Util.size(3.1415);
//=> 3

Util.size('foo');
//=> 1

// Alias: length()
```

# Arithmetic

Basic arithmetic methods that accept n-dimensional arrays in both arguments. Outputlength is always the length of the longest list. Values that are `NaN` will be returned as `0`

## add

```js
// Add two arrays sequentially
Util.add([1, 2, 3, 4], [1, 2, 3]);
//=> [ 2, 4, 6, 5 ] 

// Works with n-dimensional arrays
Util.add([1, [2, 3]], [10, [20, 30, 40]]);
//=> [ 11, [ 22, 33, 42 ] ] 
```

## subtract

```js
// Subtract two arrays sequentially
Util.subtract([1, 2, 3, 4], [1, 2, 3]);
//=> [ 0, 0, 0, 3 ] 

Util.sub([1, [2, 3]], [10, [20, 30, 40]]);
//=> [ -9, [ -18, -27, -38 ] ] 

// Alias: sub()
```

## multiply

```js
// Multiply two arrays sequentially
Util.multiply([1, 2, 3, 4], [1, 2, 3]);
//=> [ 1, 4, 9, 4 ] 

Util.mul([1, [2, 3]], [10, [20, 30, 40]]);
//=> [ 10, [ 40, 90, 80 ] ] 

// Alias: mul(), mult()
```

## divide

```js
// Divide two arrays sequentially
Util.divide([1, 2, 3, 4], [1, 2, 3]);
//=> [ 1, 1, 1, 4 ] 

Util.div([1, [2, 3]], [10, [20, 30, 40]]);
//=> [ 0.1, [ 0.1, 0.1, 0.05 ] ] 

// Alias: div()
```

## pow

```js
// Raise one array to the power of another
Util.pow([1, 2, 3, 4], [2, 3, 4]);
//=> [ 1, 8, 81, 16 ] 

Util.pow([1, [2, 3]], [10, [2, 3, 4]]);
//=> [ 1, [ 4, 27, 16 ] ] 
```

## sqrt

```js
// Return the squareroot of an array
Util.sqrt([2, [9, [16, 25], 144]]);
//=> [ 1.4142135623730951, [ 3, [ 4, 5 ], 12 ] ] 
```

## arrayCalc

Evaluate a function for a multi-dimensional array. Input the left and righthand side of the evaluation and set a function as third argument.

**arguments**
- {Array/Number} -> left hand input array
- {Array/Number} -> right hand input array
- {Function} -> function to Evaluate

```js 
Util.arrayCalc([0, 1, [2, 3]], [[5, 7], 10], (a,b) => { return (a+b)/2 });
//=> [ [ 2.5, 3.5 ], 5.5, [ 3.5, 5 ] ]

Util.arrayCalc([10, 2, 1, 5], [4, 9, 7, 3], (a,b) => { return Math.max(a,b) });
//=> [ 10, 9, 7, 5 ] 
```

## sum

Return the sum of all values in an array. Ignores all non-numeric values. Works with n-dimensional arrays.

```js
Util.sum([1, 2, 3, 4]);
//=> 10 

Util.sum([10, 'foo', 11, 'bar', 22]);
//=> 43 

Util.sum([1, 2, [3, 4, [5, 6], 7], 8]);
//=> 36
```

## minimum

Return the minimum value from an array (Also part of `.Statistic`)

```js
Util.minimum([-38, -53, -6, 33, 88, 32, -8, 73]);
//=> -53 

// Also works with n-dimensional arrays
Stat.minimum([-38, [-53, [-6, 33], 88, 32], [-8, 73]]);
//=> -53 

// Alias: Util.min()
```

## maximum

Return the maximum value from an array (Also part of `.Statistic`)

```js
Util.maximum([-38, -53, -6, 33, 88, 32, -8, 73]);
//=> 88 

// Also works with n-dimensional arrays
Stat.maximum([-38, [-53, [-6, 33], 88, 32], [-8, 73]]);
//=> 88 

// Alias: Util.max()
```

## normalize

Normalize all the values in an array between 0. and 1.
The highest value will be 1, the lowest value will be 0.

**arguments**
- {Number/Array} -> input values
- {Int/Array} -> normalized values

```js
Util.normalize([0, 1, 2, 3, 4]);
//=> [ 0, 0.25, 0.5, 0.75, 1 ]

// works with n-dimensional arrays
Util.norm([5, [12, [4, 17]], 3, 1]);
//=> [ 0.25, [ 0.6875, [ 0.1875, 1 ] ], 0.125, 0 ]  

// Alias: norm()
```

## signedNormalize

Signed Normalize all the values in an array between -1. and 1.
The highest value will be 1, the lowest value will be -1.

**arguments**
- {Number/Array} -> input values
- {Int/Array} -> signed normalized values

```js
Util.signedNormalize([0, 1, 2, 3, 4]);
//=> [ -1, -0.75, -0.25, 0, 1 ]

// works with n-dimensional arrays
Util.snorm([5, [12, [4, 17]], 3, 1]);
//=> [ -0.5, [ 0.375, [ -0.625, 1 ] ], -0.75, -1 ]

// Alias: snorm()
```

## flatten

Flatten a multidimensional array to a single dimension. Optionally set the depth for the flattening.

**arguments**
- {Array} -> array to flatten
- {Number} -> depth of flatten

```js 
Util.flatten([1, [2, 3, [4, 5], 6], 7]);
// => [ 1, 2, 3, 4, 5, 6, 7 ]
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