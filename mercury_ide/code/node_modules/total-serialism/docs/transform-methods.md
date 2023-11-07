# Transform

Methods that transform one or more input arrays. Examples of methods within this library are reverse, palindrome, duplicate, inverse, lace, rotate and more.

# Include

```js
const Mod = require('total-serialism').Transform;
```

# Methods

- [clone](#clone)
- [join](#join)
- [copy](#copy)
- [every](#every)
- [flatten](#flatten)
- [filter](#filter)
- [filterType](#filterType)
- [invert](#invert)
- [lace](#lace)
- [lookup](#lookup)
- [merge](#merge)
- [palindrome](#palindrome)
- [repeat](#repeat)
- [reverse](#reverse)
- [rotate](#rotate)
- [sort](#sort)
- [slice](#slice)
- [split](#split)
- [spray](#spray)
- [stretch](#stretch)
- [unique](#unique)

## clone

Duplicate an array with an offset added to every value 

Duplicate an array multiple times, optionaly add an offset to every value when duplicating. Also works with 2-dimensonal arrays. When using strings the values will be concatenated.

**arguments**
- {NumberArray} -> Array to clone
- {Int, Int2, ... Int-n} -> amount of clones with integer offset

```js
// duplicate an array with an offset added to every value
Mod.clone([0, 5, 7], 0, 12, -12); 
//=> [ 0, 5, 7, 12, 17, 19, -12, -7, -5 ] 

// works with multidimensional arrays
Mod.clone([0, 5, [7, 12]], 0, 12, -12);
//=> [ 0, 5, [ 7, 12 ], 12, 17, [ 19, 24 ], -12, -7, [ -5, 0 ] ]

// works with strings
Mod.clone(['c', ['e', 'g']], ['4', '5', '#3']);
//=> [ 'c4', [ 'e4', 'g4' ], 'c5', [ 'e5', 'g5' ], 'c#3', [ 'e#3', 'g#3' ] ]
```

<!-- <iframe src="https://editor.p5js.org/tmhglnd/embed/6hmjQkbzj" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe> -->

## join

Join arrays into one array. More than 2 arrays as arguments is possible.

**arguments**
- {Array-0, Array-1, ..., Array-n} -> Arrays to combine

```js
// combine multiple numbers/arrays into one
Mod.join([0, 5], 12, [7, 3]); 
//=> [ 0, 5, 12, 7, 3 ] 

// works with 2D-arrays
Mod.join([0, 5], [[12, 19], 7]);
//=> [ 0, 5, [ 12, 19 ], 7 ] 

// works with strings
Mod.join(['c4', 'e4'], ['g4', 'f4']);
//=> [ 'c4', 'e4', 'g4', 'f4' ]

// Alias: Mod.combine()
```

<!-- <iframe src="https://editor.p5js.org/tmhglnd/embed/oDCkLCUta" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe> -->

## copy

Duplicate an array a certain amount of times.

**arguments**
- {Array} -> Array to duplicate
- {Int+} -> amount of duplicates (optional, default=2)

```js
// duplicate an array certain amount of times
Mod.copy([0, 7, 12], 3);
//=> [ 0, 7, 12, 0, 7, 12, 0, 7, 12 ] 

// works with 2D-arrays
Mod.copy([0, [3, 7], 12], 2);
//=> [ 0, [ 3, 7 ], 12, 0, [ 3, 7 ], 12 ] 

// works with strings
Mod.copy(['c', 'f', 'g'], 3);
//=> [ 'c', 'f', 'g', 'c', 'f', 'g', 'c', 'f', 'g' ] 

// Alias: Mod.duplicate(), Mod.dup()
```

<!-- <iframe src="https://editor.p5js.org/tmhglnd/embed/5n5e03e4M" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe> -->

## padding

Pad an array with zeroes (or any other value) up to the length specified. The padding value can optionally be changed and the shift argument rotates the list n-steps left or right (negative). This method is similar to `every()` except arguments are not specified in musical bars/divisions but in array length. A shorter length than input list will slice the output list.

**arguments**
- {NumberArrray} -> Array to use every n-bars
- {Int} -> output length of array (optional, default=16)
- {Value} -> padding value for the added items (optional, default=0)
- {Number} -> shift in steps (optional, default=0)

```js 
Mod.pad([3, 7, 11, 12], 9);
//=> [ 3, 7, 11, 12, 0, 0, 0, 0, 0 ] 

Mod.pad(['c', 'f', 'g'], 11, '-', 4);
//=> [ '-', '-', '-', '-', 'c', 'f', 'g', '-', '-', '-', '-' ] 
```

## every

Add zeroes to an array with a number sequence. The division determines the amount of values per bar. The total length equals the bars times division. This method is very useful for rhythms that must occur once in a while, but can also be use for melodic phrases. Also works with strings.

**arguments**
- {NumberArrray} -> Array to use every n-bars
- {Int} -> amount of bars (optional, default=1)
- {Int} -> amount of values per bar (optional, defaul=16)
- {Value} -> padding value for the added items (optional, default=0)
- {Number} -> optional shift in n-bars (optional, default=0)

```js
// add zeroes to a rhythm to make it play once over a certain amount of bars
Mod.every([1, 0, 1, 1, 1], 2, 8);
//=> [ 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
 
// change the padding value with an optional 3rd argument
Mod.every([3, 0, 7, 9, 11], 2, 8, 12);
//=> [ 3, 0, 7, 9, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ]

// change the shift (rotation) with an optional 4th argument
Mod.every([1, 0, 0, 1, 1], 2, 8, 0, 1);
//=> [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0 ]

// works with 2D-array
Mod.every([3, [0, 7, 9], 11], 1, 12);
//=> [ 3, [ 0, 7, 9 ], 11, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] 

// Works with strings
Mod.every(['c4', 'eb4', 'g4', 'f4', 'eb4'], 2, 8, 'r');
//=> [ 'c4',  'eb4', 'g4', 'f4',
//     'eb4', 'r',   'r',  'r',
//     'r',   'r',   'r',  'r',
//     'r',   'r',   'r',  'r' ] 
```

<!-- <iframe src="https://editor.p5js.org/tmhglnd/embed/9AF_CeIcW" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe> -->

## flatten

Flatten a multidimensional array. Optionally set the depth for the flattening with the second argument.

**arguments**
- {Array} -> array to flatten
- {Number} -> depth of flatten (default=Infinity)

```js 
Mod.flatten([1, [2, 3, [ 4 ], 5], 6]);
//=> [ 1, 2, 3, 4, 5, 6 ] 
```

## filter

Filter one or multiple values from an array

**arguments**
- {Array} -> array to filter
- {Number/String/Array} -> values to filter

```js
// remove values from an array
Mod.filter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [3, 8, 10]);
//=> [ 0, 1, 2, 4, 5, 6, 7, 9 ] 
```

## filterType

Filter one or multiple values from an array based on their type

**arguments**
- {Array} -> array to filter
- {String} -> datatype to filter (optional, default=number)

```js
// default filter is set as number
Mod.filterType([0, 'foo', {bar : true}, 1, undefined]);
//=> [ 0, 1 ] 

// return only a specific datatype (in this case you specify the type to return)
Mod.filterType([0, 1, [1, 2], 'foo', 2, null, true, {bar: 5}, 3.14, undefined], 'number');
//=> [ 0, 1, 2, 3.14 ] 

// Alias: Mod.tFilter()
```

## invert

Invert an array of values by mapping the lowest value to the highest value and vice versa, flipping everything in between.  Second optional argument sets the center to flip values against. Third optional argument sets a range to flip values against.

**arguments**
- {NumberArray} -> Array to invert
- {Int} -> invert center / low range (optional, default=array-minimum)
- {Int} -> high range (optional, default=array-maximum)

```js
// invert an array between the highest and lowest values
Mod.invert([-1, 2, 7, 9, 14]);
//=> [ 14, 11, 6, 4, -1 ] 

// invert an array around a specified center point
Mod.invert([-1, 2, 7, 9, 14], 5);
//=> [ 11, 8, 3, 1, -4 ] 

// invert an array around specified low and high points
Mod.invert([-1, 2, 7, 9, 14], 0, 12);
//=> [ 13, 10, 5, 3, -2 ] 

// works with multidimensional arrays
Mod.invert([-1, 2, [[7, 9], 14]]);
//=> [ 14, 11, [ [ 6, 4 ], -1 ] ] 
```

<!-- <iframe src="https://editor.p5js.org/tmhglnd/embed/iU3-FJDWG" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe> -->

## lace

Interleave two or more arrays. Works with every length of an array. Works with 2D-arrays and string arrays as well.

**arguments**
- {Array-0, Array-1, ..., Array-n} -> one or multiple arrays to interleave

```js
// lace multiple arrays of different lengths
Mod.lace([0, 0, 0], [7, 7], [9, 9, 9, 9]);
//=> [ 0, 7, 9, 0, 7, 9, 0, 9, 9 ] 

// works with multidimensional arrays
Mod.lace([0, [0, 0]], [[7,7]], [9, [9, 9], 9]);
//=> [ 0, [ 7, 7 ], 9, [ 0, 0 ], [ 9, 9 ], 9 ] 

// works with strings
Mod.lace(['c', 'c', 'c', 'c'], ['g', 'g'], ['e']);
//=> [ 'c', 'g', 'e', 'c', 'g', 'c', 'c' ] 

// Alias: Mod.zip()
```

## lookup

Build an array of items based on an array of indeces looking up values from an input array. The values are wrapped within the length of the lookup array. Works with n-dimensional arrays.

**arguments**
- {Array} -> Array with indeces to lookup
- {Array} -> Array with values returned from lookup
- {Array} -> Looked up values

```js
// first array is the index, second array are the items to lookup
Mod.lookup([0, 1, 1, 2, 0, 2, 2, 1], ['c4', 'e4', 'f4', 'g4']);
//=> [ 'c4', 'e4', 'e4', 'f4', 'c4', 'f4', 'f4', 'e4' ] 

// works with multidimensional arrays and leaves nesting intact
Mod.lookup([0, [1, 1, [2, 3], 0], 2], ['c4', 'e4', 'f4', 'g4']);
//=> [ 'c4', [ 'e4', 'e4', [ 'f4', 'g4' ], 'c4' ], 'f4' ] 

// indices are wrapped between listlength
Mod.lookup([-2, 5, 7, 12], ['c4', 'e4', 'f4', 'g4']);
//=> [ 'f4', 'e4', 'g4', 'c4' ] 

// indices are floored if floating point values
Mod.lookup([0.999, 2.78, 3.14, 1.54], ['c4', 'e4', 'f4', 'g4']);
//=> [ 'c4', 'f4', 'g4', 'e4' ] 

// ignores non-numeric values
Mod.lookup([0, 'foo', ['1', 'bar']], [1, 2, 3]);
//=> [ 1, [ 2 ] ] 
```

## merge

Merge all values of multiple arrays on the same index into a 2D array. Preserves length of longest list.

**arguments**
- {Array-0, Array-1, ..., Array-n} -> arrays to be merged

```js
// merge multiple arrays into a 2D-array
Mod.merge([0, 0, 0], [5, 5], [7, 7, 7, 7]);
//=> [ [ 0, 5, 7 ], [ 0, 5, 7 ], [ 0, 7 ], [ 7 ] ] 

// works with strings
Mod.merge(['c4', 'c4'], ['f4'], ['g4', 'g4', 'g4']);
//=> [ [ 'c4', 'f4', 'g4' ], [ 'c4', 'g4' ], [ 'g4' ] ] 

// 2D-arrays are concatenated to the other arrays
Mod.merge([['c4', 'e4'], 'c4'], [['f4', 'a4']], ['g4', 'g4']);
//=> [ [ 'c4', 'e4', 'f4', 'a4', 'g4' ], [ 'c4', 'g4' ] ] 
```

## palindrome

Reverse an array and concatenate to the input creating a palindrome of the array. Add an optional true flag to remove the double on the reverse and end points.

**arguments**
- {Array} -> input array to transform to palindrome
- {Bool} -> no-double flag (optional, default = false)

```js
// reverse and concatenate to the original array
Mod.palindrome([0, 5, 7, 12]);
//=> [ 0, 5, 7, 12, 12, 7, 5, 0] 

// works with 2D-array, removes doubles in center and end
Mod.palindrome([0, [5, 7], 9, 12], true);
//=> [ 0, [ 5, 7 ], 9, 12, 9, [ 5, 7 ] ] 

// works with strings
Mod.palindrome(['c4', 'f4', 'g4'], true);
//=> [ 'c4', 'f4', 'g4', 'f4' ] 

// Alias: Mod.mirror()
```

## repeat

Repeat the values of an array n-times
Using a second array for repeat times iterates over that array

**arguments**
- {Array} -> array with values to repeat
- {Int/Array} -> array or number of repetitions per value

```js
Mod.repeat([0, 5, 7], 3);
//=> [ 0, 0, 0, 5, 5, 5, 7, 7, 7 ] 

// us an array for repetitions per index
Mod.repeat(['c4', 'e4', 'f4', 'g4'], [1, 4, 2, 0]);
//=> [ 'c4', 'e4', 'e4', 'e4', 'e4', 'f4', 'f4' ] 

// works with multidimensional arrays
Mod.repeat([[0, 5], [7, 9, 12]], [2, 3]);
//=> [ 
// 	 [ 0, 5 ], 
//   [ 0, 5 ], 
//   [ 7, 9, 12 ], 
//   [ 7, 9, 12 ], 
//   [ 7, 9, 12 ] ] 
```

## reverse

Reverse the order of items in an array.

**arguments**
- {Array} -> array to reverse

```js
Mod.reverse([0, 5, 7, 12]);
//=> [ 12, 7, 5, 0 ] 

// works with strings and 2D-arrays
Mod.reverse(['c4', ['e4', 'f4'], 'g4']);
//=> [ 'g4', [ 'e4', 'f4' ], 'c4' ] 
```

## rotate

Rotate an array to the left or right of n-steps. Works with 2D-arrays and string arrays.

**arguments**
- {Array} -> array to rotate
- {Int} -> direction and steps to rotate

```js
Mod.rotate([0, 5, 7, 12], 1);
//=> [ 12, 0, 5, 7 ] 

Mod.rotate(['c4', ['e4', 'f4'], 'g4', 'a4'], -1);
//=> [ [ 'e4', 'f4' ], 'g4', 'a4', 'c4' ] 
```

## sort

Sort an array of numbers or strings. sorts ascending or descending in numerical and alphabetical order.

**arguments**
- {Array} -> array to sort
- {Int} -> sort direction (positive value is ascending)

```js
Mod.sort([-5, 7, 0, 3, 12, -7, 9], -1);
//=> [ 12, 9, 7, 3, 0, -5, -7 ] 

// works with strings (but alphabetical order!)
Mod.sort(['e4', 'g3', 'c4', 'f3', 'b5']);
//=> [ 'b5', 'c4', 'e4', 'f3', 'g3' ]
```

## slice

Slice an array in one or multiple parts. Slice lengths are determined by the second argument array. Outputs an array of arrays of the result

**arguments**
- {Array} -> array to slice in parts
- {Number/Array} -> slice lengths to slice array into
- {Bool} -> output rest flag (optional, default=false)

```js
Mod.slice(Gen.spread(8), [3, 2]);
//=> [ [ 0, 1, 2 ], [ 3, 4 ], [ 5, 6, 7 ] ] 

// set rest-flag to false removes last slice 
Mod.slice(Gen.spread(24), [3, 2, -1, 5], false);
//=> [ [ 0, 1, 2 ], [ 3, 4 ], [ 5, 6, 7, 8, 9 ] ] 
```

## split

Similar to slice in that it also splits an array, except that slice recursively splits until the array is completely empty. If an array is provided as split sizes it will iterate the lengths.

**arguments**
- {Array} -> array to split in parts
- {Number/Array} -> split lengths to split array into

```js
Mod.split(Gen.spread(12), 3);
//=> [ [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ], [ 9, 10, 11 ] ] 

Mod.split(Gen.spread(12), [3, 2, -1]);
//=> [ [ 0, 1, 2 ], [ 3, 4 ], [ 5, 6, 7 ], [ 8, 9 ], [ 10, 11 ] ] 
```

## spray

**arguments**
- {Array} -> Array to spray out over other array
- {Array} -> Array of non-zero positions will be sprayed

```js
Mod.spray([7, 9, 12], [1, 0, 0, 1, 1, 0, 1, 0]);
//=> [ 7, 0, 0, 9, 12, 0, 7, 0 ] 

// works with 2D-arrays
Mod.spray([[5, 7, 9], [12, 14]], [1, 0, 1, 1, 0]);
//=> [ [ 5, 7, 9 ], 0, [ 12, 14 ], [ 5, 7, 9 ], 0 ]

// works with strings
Mod.spray(['c4', 'f4', 'g4'], [1, 0, 0, 1, 1, 0, 1, 0]);
//=> [ 'c4', 0, 0, 'f4', 'g4', 0, 'c4', 0 ] 
```

## stretch

Stretch (or shrink) an array to a specified length, linearly interpolating between all values within the array. Minimum output length is 2 (which will be the outmost values from the array). Third optional argument sets the interpolation mode. Available modes are `none` (or `null`, `false`) and `linear`.
 
**arguments**
- {Array} -> array to stretch
- {Array} -> outputlength of array
- {String/Int} -> interpolation on/off (optional, default=true)

```js
Mod.stretch([0, 12, 3, 7], 24);
//=> [ 0, 1.56, 3.13,  4.69, 6.26, 7.82, 9.39, 10.95, 
//    11.60, 10.43, 9.26, 8.08, 6.91, 5.73, 4.56, 3.39, 
//    3.34, 3.86, 4.391, 4.91, 5.43, 5.95, 6.478, 7 ] 

//   11.61 ┼       ╭╮               
//   10.45 ┤      ╭╯╰╮              
//    9.29 ┤     ╭╯  ╰╮             
//    8.13 ┤    ╭╯    ╰╮            
//    6.97 ┤    │      ╰╮        ╭─ 
//    5.80 ┤   ╭╯       ╰╮     ╭─╯  
//    4.64 ┤  ╭╯         ╰╮  ╭─╯    
//    3.48 ┤ ╭╯           ╰──╯      
//    2.32 ┤ │                      
//    1.16 ┤╭╯                      
//    0.00 ┼╯

// set interpolation to 'none'
Mod.stretch([0, 12, 3, 7], 10, 'none');
//=> 12.00 ┼  ╭──╮    
//    9.60 ┤  │  │    
//    7.20 ┤  │  │  ╭ 
//    4.80 ┤  │  │  │ 
//    2.40 ┤  │  ╰──╯ 
//    0.00 ┼──╯ 
```

## unique

Remove duplicate items from an array. Does not account for 2-dimensional arrays within the array.

**arguments**
- {Array} -> array to filter

```js
// remove duplicates from an array, leave order of appearance intact
Mod.unique([5, 7, 5, 0, 12, 7, 5]); 
//=> [ 5, 7, 0, 12 ] 
```
