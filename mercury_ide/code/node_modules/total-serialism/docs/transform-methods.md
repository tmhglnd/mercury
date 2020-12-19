# Transform Methods

Methods that transform the array in some fashion. Think of methods such as reversing, palindrome, duplicating, inversing, interleaving and more.

## Include

```js
const Mod = require('total-serialism').Transform;
```

## clone

Duplicate an array with an offset added to every value 

**arguments**
- {NumberArray} -> Array to clone
- {Int, Int2, ... Int-n} -> amount of clones with integer offset

```js
// duplicate an array with an offset added to every value
Mod.clone([0, 5, 7], 0, 12, -12); 
//=> [ 0, 5, 7, 12, 17, 19, -12, -7, -5 ] 
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/6hmjQkbzj" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## join

Join arrays into one array. More than 2 arrays as arguments is possible.

**arguments**
- {Array-0, Array-1, ..., Array-n} -> Arrays to combine

```js
// combine multiple numbers/arrays into one
Mod.join([0, 5], 12, [7, 3]); 
//=> [ 0, 5, 12, 7, 3 ] 
// Alternative: Mod.combine()
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/oDCkLCUta" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## copy

Duplicate an array a certain amount of times.

**arguments**
- {Array} -> Array to duplicate
- {Int+} -> amount of duplicates (optional, default=2)

```js
// duplicate an array certain amount of times
Mod.copy([0, 5, 7], 3); 
//=> [ 0, 5, 7, 0, 5, 7, 0, 5, 7 ]
// Alternative: Mod.duplicate()
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/5n5e03e4M" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## every

Add zeroes to an array with a number sequence. The division determines the amount of values per bar. The total length equals the bars times division. This method is very useful for rhythms that must occur once in a while, but can also be use for melodic phrases.

**arguments**
- {NumberArrray} -> Array to use every n-bars
- {Int} -> amount of bars (optional, default=4)
- {Int} -> amount of values per bar (optional, defaul=16)
- {Value} -> padding value for the added items (optional, default=0)
- {Number} -> optional shift in n-divisions (optional, default=0)

```js
// add zeroes to a rhythm to make it play once over a certain amount of bars
Mod.every([1, 0, 1, 0, 1, 1, 0, 1], 2, 8)); 
//=> [ 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ]

// change the padding value with an optional 3rd argument
Mod.every([3, 0, 7, 9, 11], 2, 7, 12);
//=> [ 3, 0, 7, 9, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12 ] 

// change the shift (rotation) with an optional 4th argument
Mod.every([1, 0, 0, 1, 1], 1.5, 8, 0, 0.5);
//=> [ 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0 ]
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/9AF_CeIcW" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## filter

Invert an array of values by mapping the lowest value to the highest value and vice versa, flipping everything in between.  Second optional argument sets the center to flip values against. Third optional argument sets a range to flip values against.

**arguments**
- {NumberArray} -> Array to invert
- {Int} -> invert center / low range (optional, default=array-minimum)
- {Int} -> high range (optional, default=array-maximum)

```js
// remove values from an array
Mod.filter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [3, 8, 10]);
//=> [ 0, 1, 2, 4, 5, 6, 7, 9 ] 

// return only a specific datatype (in this case you specify the type to return)
Mod.filterType([0, 1, [1, 2], 'foo', 2, null, true, {bar: 5}, 3.14, undefined], 'number');
//=> [ 0, 1, 2, 3.14 ] 
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/iU3-FJDWG" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## lookup

Build an array of items based on another array of indeces 
The values are wrapped within the length of the lookup array

**arguments**
- {Array} -> Array with indeces to lookup
- {Array} -> Array with values returned from lookup
- {Array} -> Looked up values

```js
// first array is the index, second array are the items to lookup
Mod.lookup([0, 1, 1, 2, 0, 2, 2, 1], ['c', 'e', 'f', 'g']);
//=> [ 'c', 'e', 'e', 'f', 'c', 'f', 'f', 'e' ]

// indices are wrapped between listlength
Mod.lookup([8, -5, 144, 55], ['c', 'e', 'g']);
//=> [ 'g', 'e', 'c', 'e' ]
```

## invert

```js
// invert an array around a center point
Mod.invert([0, 2, 5, 10, 13], 5); 
//=> [ 10, 8, 5, 0, -3 ]
```

## repeat

repeat the values of an array n-times
Using a second array for repeat times iterates over that array

**arguments**:

- {Array} -> array with values to repeat
- {Int/Array} -> array or number of repetitions per value

```js
Mod.repeat([10, 20, 30], 3);
//=> [ 10, 10, 10, 20, 20, 20, 30, 30, 30 ] 

Mod.repeat([10, 20, 30, 40], [1, 4, 2, 0]);
//=> [ 10, 20, 20, 20, 20, 30, 30 ] 

// works with strings as well
Mod.repeat(['kick', 'hat'], [1, 4]);
//=> [ 'kick', 'hat', 'hat', 'hat', 'hat' ] 

// also works with 2D arrays
Mod.repeat([[10, 20], [30, 40, 50]], [2, 3]);
//=> [ [ 10, 20 ],
//     [ 10, 20 ],
//     [ 30, 40, 50 ],
//     [ 30, 40, 50 ],
//     [ 30, 40, 50 ] ] 
```

## stretch

Stretch (or shrink) an array to a specified length, linearly interpolating between all values within the array. Minimum output length is 2 (which will be the outmost values from the array). Third optional argument sets the interpolation mode. Available modes are `none` (or `null`, `false`) and `linear`.

**arguments**

```js
Mod.stretch([0, 12, 3, 7], 15);
//=> [ 0, 2.57, 5.14, 7.71, 10.28, 11.35, 9.42 7.5, 
// 	   5.57, 3.64, 3.57, 4.42, 5.28, 6.14, 7 ] 

//   12.00 ┼  ╭╮      
//    9.60 ┤  │╰╮     
//    7.20 ┤ ╭╯ │   ╭ 
//    4.80 ┤╭╯  ╰╮╭─╯ 
//    2.40 ┤│    ╰╯   
//    0.00 ┼╯         
``

*more documentation needed for following functions*

```js
// interleave multiple arrays into one
Mod.lace([0, 5, 9], [3, 3], [7, 12, 11, -1]); 
//=> [ 0, 3, 7, 5, 3, 12, 9, 11, -1 ]

// merge arrays into a 2D-array
Mod.merge([0, 3, 7], [3, 12], [12, -1, 19, 5]); 
//=> [ [0, 3, 12], [3, 12, -1], [7, 19], [5] ]

// generate a palindrome of an array
Mod.mirror([0, 3, 5, 7]); 
//=> [ 0, 3, 5, 7, 7, 5, 3, 0 ]
// Alternative Mod.palindrome()

// rotate an array in positive or negative direction
Mod.rotate([0, 5, 7, 12], -1); 
//=> [ 5, 7, 12, 0 ] 

// reverse an array
Mod.reverse([0, 5, 7, 12]); 
//=> [ 12, 7, 5, 0 ]

// spray values from one array on the non-zero places of another array
Mod.spray([12, 19, 24], [1, 0, 0, 1, 1, 0, 1, 0.3, 0]);
//=> [ 12, 0, 0, 19, 24, 0, 12, 19, 0 ]

// remove duplicates from an array, leave order of appearance intact
Mod.unique([5, 7, 5, 0, 12, 7, 5]); 
//=> [ 5, 7, 0, 12 ] 
```
