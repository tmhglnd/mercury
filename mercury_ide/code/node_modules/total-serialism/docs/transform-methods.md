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
- {Int} -> amount of bars
- {Int} -> amount of values per bar

```js
// add zeroes to a rhythm to make it play once over a certain amount of bars
Mod.every([1, 0, 1, 0, 1, 1, 0, 1], 2, 8)); 
//=> [ 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ]
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

## invert

```js
// invert an array around a center point
Mod.invert([0, 2, 5, 10, 13], 5); 
//=> [ 10, 8, 5, 0, -3 ]
```



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
