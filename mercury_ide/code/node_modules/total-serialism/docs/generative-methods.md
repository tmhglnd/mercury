
# Generative

Basic methods that generate arrays of number sequences, such as methods that generate an ascending array of numbers evenly spread between a low and high value.

## Include

```js
const Gen = require('total-serialism').Generative;
```

```js
const { spread, fill } = require('total-serialism').Generative;
```

# Methods

- [counter](#counter)
- [spread / spreadFloat](#spread-spreadfloat)
- [spreadInclusive / spreadInclusiveFloat](#spreadinclusive-spreadinclusivefloat)
- [spreadExp / spreadExpFloat](#spreadexp-spreadexpfloat)
- [spreadInclusiveExp / spreadInclusiveExpFloat](#spreadinclusiveexp-spreadinclusiveexpfloat)
- [fill](#fill)
- [sine / cosine](#sine--cosine)
- [sineFloat / cosineFloat](#sinefloat--cosinefloat)
- [saw / sawFloat](#saw--sawfloat)
- [square / squareFloat](#square--squarefloat)
- [binaryBeat](#binarybeat)
- [spacing](#spacingbeat)

## counter

The counter function generates an array of ascending or descending integers, counted from a starting value up to an (and including) an ending value. When one argument is provided this value acts as the ending value and the default starting value is 0. If two values are provided the first value is the starting value and the second value the end.

**arguments**
- {Int+} -> count (or count from, default=12)
- {Int+} -> count from (optional, default=undefined)

```js
// count to 8 from 0
Gen.counter(8);
//=> [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]

// count to 10 from 4
Gen.counter(4, 10);
//=> [ 4, 5, 6, 7, 8, 9, 10 ]

// count down from 7 to 2
Gen.counter(7, 2);
//=> [ 7, 6, 5, 4, 3, 2 ]

// count down from 5 to -4
Gen.counter(5, -4);
//=> [ 5, 4, 3, 2, 1, 0, -1, -2, -3, -4 ]
```

Alias: `count()`

## spread spreadFloat

The spread function is similar to the count function, but you can decide on the length of the array output resulting in some numbers being skipped or duplicated depending of the output size should be smaller or larger than the start and ending points. The generated array has n-length of evenly spaced values between a starting number up until (but excluding) the 3th argument. Flipping the low and high range will result in the same values but descending.

Alias: `spreadF`

**arguments**
- {Int+/Array} -> Length of output array (uses length of Array if argument is array)
- {Number} -> Low value (optional, default=0)
- {Number} -> High value (exclusive, optional, default=length)

```js
// generate an array of 5 ints between range 0-5
Gen.spread(5);
//=> [ 0, 1, 2, 3, 4 ] 

// change the range with a second argument to 0-12
Gen.spread(5, 12);
//=> [ 0, 2, 4, 7, 9 ] 

// add a low/high range pair with 3-12
Gen.spread(5, 3, 12);
//=> [ 3, 4, 6, 8, 10 ] 

// reverse the range for descending output with 12-3
Gen.spread(5, 12, 3);
//=> [ 10, 8, 6, 4, 3 ] 

// generate an array of 5 floats between range 0-1
Gen.spreadFloat(5); 
//=> [ 0, 0.2, 0.4, 0.6, 0.8 ]
```

<!-- <iframe src="https://editor.p5js.org/tmhglnd/embed/TT6XGijrR" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe> -->

## spreadInclusive spreadInclusiveFloat

Generate an array of n-length of evenly spaced values between a starting number up to (and including) the 3th argument. Flipping the low and high range will result in the same values but descending.

Alias: `spreadInc`, `spreadIncF`

**arguments**
- {Int+/Array} -> Length of output array (uses length of Array if input)
- {Number} -> Low value (optional)
- {Number} -> High value (inclusive, optional)

```js
// generate an array of 5 ints between range 0-5 (5 inclusive)
Gen.spreadInclusive(5);
//=> [ 0, 1, 2, 3, 5 ]

// change the range with a second argument to 0-12
Gen.spreadInclusive(5, 12);
//=> [ 0, 3, 6, 9, 12 ] 

// add a low/high range pair with 3-12
Gen.spreadInclusive(5, 3, 12);
//=> [ 3, 5, 7, 9, 12 ] 

// reverse the range for descending output with 12-3
Gen.spreadInclusive(5, 12, 3);
//=> [ 12, 9, 7, 5, 3 ] 

// generate an array of 5 floats (inclusive)
Gen.spreadInclusiveFloat(5);
//=> [ 0, 0.25, 0.5, 0.75, 1 ] 
```

## spreadExp spreadExpFloat

Similar to spread and spreadFloat but with an optional exponent as 4th argument.

Alias: `spreadExpF`

**arguments**
- {Int+/Array} -> Length of output array (uses length of Array if input)
- {Number} -> Low value (optional, default=0)
- {Number} -> High value (exclusive, optional, default=length)
- {Number} -> Exponent (optional, default=1)

```js
Gen.spreadExp(10, 0, 10, 2);
//=> [
//   0, 0, 0, 0, 1,
//   2, 3, 4, 6, 8
// ] 

Gen.spreadExpFloat();
```

## spreadInclusiveExp spreadInclusiveExpFloat

Similar to spreadInclusive and spreadInclusiveFloat but with an optional exponent as 4th argument.

Alias: `spreadIncExp`, `spreadIncExpF`

**arguments**
- {Int+/Array} -> Length of output array (uses length of Array if input)
- {Number} -> Low value (optional)
- {Number} -> High value (inclusive, optional)
- {Number} -> Exponent (optional, default=1)

```js
Gen.spreadInclusiveExp(10, 0, 10, 2);
//=> [
//   0, 0, 0, 1,  1,
//   3, 4, 6, 7, 10
// ] 
```

## fill

Fill an array with values. Arguments are in pairs. Every pair consists of `<value, amount>` The value is repeated n-amount of times in the array. Also accepts an array as a single argument containing the pairs.

**arguments**
- {Value} -> value to duplicate
- {Int+} -> amount of duplicates
- ... -> repeat n-times
- {Array} -> array containing value/amount pairs

```js
// fill an array with duplicates of a value
Gen.fill(10, 2, 15, 3, 20, 4); 
//=> [ 10, 10, 15, 15, 15, 20, 20, 20, 20 ]

Gen.fill([10, 2, 15, 3, 20, 4]);
//=> [ 10, 10, 15, 15, 15, 20, 20, 20, 20 ]
```

<!-- <iframe src="https://editor.p5js.org/tmhglnd/embed/-qtEfC8Zm" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe> -->

## sine / cosine

Generate an array with n-periods of a (co)sine function with integer values. Optional last arguments set lo and hi range and phase offset. Default range is 0 to 12. Wave can be inverted by swapping the arguments

**arguments**
- {Int+/Array} -> Length of output array (uses length of Array if input)
- {Number} -> Periods of (co)sine-wave (optional, default=1)
- {Number} -> Low range of values (optional, default=0)
- {Number} -> High range of values (optional, default=12)
- {Number} -> Phase offset (optional, default=0)

```js
// generate 10 ints with 1 period of a sine function
// between a default range of 0-12
Gen.sine(10);
//=> [ 6, 9, 11, 11, 9, 6, 2, 0, 0, 2 ] 
//       11.00 ┼ ╭─╮      
//       10.00 ┤ │ │      
//        9.00 ┤╭╯ ╰╮     
//        8.00 ┤│   │     
//        7.00 ┤│   │     
//        6.00 ┼╯   ╰╮    
//        5.00 ┤     │    
//        4.00 ┤     │    
//        3.00 ┤     │    
//        2.00 ┤     ╰╮ ╭ 
//        1.00 ┤      │ │ 
//        0.00 ┤      ╰─╯  

// generate 10 ints with 4 periods a sine function
Gen.sine(11, 4, 0, 7);
//=> [ 3, 6, 0, 5, 4, 0, 6, 2, 1, 6, 0 ]
//        6.00 ┼╭╮   ╭╮ ╭╮ 
//        5.00 ┤││╭╮ ││ ││ 
//        4.00 ┤│││╰╮││ ││ 
//        3.00 ┼╯││ │││ ││ 
//        2.00 ┤ ││ ││╰╮││ 
//        1.00 ┤ ││ ││ ╰╯│ 
//        0.00 ┤ ╰╯ ╰╯   ╰  
```

<!-- <iframe src="https://editor.p5js.org/tmhglnd/embed/PdywLSgcO" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe> -->

## sineFloat / cosineFloat

Generate an array with n-periods of a (co)sine function with floating-point values. Optional last arguments set lo and hi range and phase offset. Default range is -1 to 1. Only setting first range argument sets the low-range to 0. Wave can be inverted by swapping the arguments.

Alias: `sineF`, `sinF`, `cosineF`, `cosF`

**arguments**
- {Int+/Array} -> Length of output array (uses length of Array if input)
- {Number} -> Periods of (co)sine-wave (optional, default=1)
- {Number} -> Low range of values (optional, default=-1)
- {Number} -> High range of values (optional, default=1)
- {Number} -> Phase offset (optional, default=0)

```js
// generate 16 floats with 1 period of a sine function
Gen.sineFloat(16);
//=> [ 0.00, 0.38, 0.71, 0.92, 1.00, 0.92, 0.71, 0.38, 0.00, -0.38, 
//     -0.71, -0.92, -1.00, -0.92, -0.71, -0.38 ]

//        1.00 ┤   ╭╮           
//        0.60 ┤ ╭─╯╰─╮         
//        0.20 ┼╭╯    ╰╮        
//       -0.20 ┼╯      ╰╮       
//       -0.60 ┤        ╰╮    ╭ 
//       -1.00 ┤         ╰────╯  

// generate 16 floats with 1 period of a cosine function
Gen.cosineFloat(8);
//=> [ 1.00, 0.92, 0.71, 0.38, 0.00, -0.38, -0.71, -0.92, -1.00, 
//     -0.92, -0.71, -0.38, -0.00, 0.38, 0.71, 0.92 ]

//        1.00 ┼╮               
//        0.60 ┤╰─╮          ╭─ 
//        0.20 ┼  ╰╮        ╭╯  
//       -0.20 ┤   ╰╮      ╭╯   
//       -0.60 ┤    ╰╮    ╭╯    
//       -1.00 ┤     ╰────╯      

// frequency modulation of the period argument with another array
Gen.sineFloat(40, Gen.sineFloat(40, 4, 1, 5));
//=>  1.00 ┤ ╭╮  ╭──╮           ╭╮   ╭╮  ╭─╮        
//    0.80 ┤ │╰╮╭╯  │ ╭╮  ╭╮    ││   ││ ╭╯ │        
//    0.60 ┤╭╯ ││   ╰╮││  ││    ││   ││ │  │        
//    0.40 ┤│  ╰╯    │││  ││    ││   ││ │  │        
//    0.20 ┤│        ││╰╮╭╯│╭╮  ││   ││ │  │╭╮   ╭╮ 
//    0.00 ┼╯        ││ ││ ││╰╮╭╯│ ╭╮││ │  │││  ╭╯│ 
//   -0.20 ┤         ││ ││ ││ ││ │ ││││ │  │││  │ │ 
//   -0.40 ┤         ││ ││ ││ ││ │ ││││ │  ╰╯╰╮ │ │ 
//   -0.60 ┤         ││ ╰╯ ││ ││ │ ││││ │     │ │ │ 
//   -0.80 ┤         ││    ││ ╰╯ │ │╰╯│ │     ╰─╯ │ 
//   -1.00 ┤         ╰╯    ╰╯    ╰─╯  ╰─╯         ╰  
```

<!-- <iframe src="https://editor.p5js.org/tmhglnd/embed/CFOwE1yhW" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe> -->

## saw / sawFloat

Generate an array with n-periods of a saw/phasor function. Optional last arguments set lo and hi range and phase offset. Only setting first range argument sets the low-range to 0

Alias: `sawF`

**arguments**
- {Int+/Array} -> Length of output array (uses length of Array if input)
- {Number/Array} -> Periods of the wave (option, default=1)
- {Number} -> Low range of values (optional, default=-1) 
- {Number} -> High range of values (optional, default=1)
- {Number} -> Phase offset (optional, default=0)

```js
Gen.saw(16, 8.5);
//=> 11.00 ┼              ╭ 
//   10.00 ┤          ╭╮╭╮│ 
//    9.00 ┤        ╭╮│││││ 
//    8.00 ┤      ╭╮│││││││ 
//    7.00 ┤  ╭╮╭╮│││││││││ 
//    6.00 ┤╭╮│││││││││││││ 
//    5.00 ┤│││││││││││││╰╯ 
//    4.00 ┤│││││││││││╰╯   
//    3.00 ┤│││││││╰╯╰╯     
//    2.00 ┤│││││╰╯         
//    1.00 ┤│││╰╯           
//    0.00 ┼╯╰╯ 

Gen.sawFloat(25, 2.5);
//=>  0.80 ┤       ╭─╮       ╭─╮     
//    0.44 ┤     ╭─╯ │     ╭─╯ │     
//    0.08 ┤    ╭╯   │    ╭╯   │     
//   -0.28 ┼  ╭─╯    │  ╭─╯    │  ╭─ 
//   -0.64 ┤╭─╯      │╭─╯      │╭─╯  
//   -1.00 ┼╯        ╰╯        ╰╯    

// Modulation on frequency
Gen.saw(34, Gen.sinF(30, 2, 0, 100), 0, 12);
//=> 11.00 ┼         ╭╮             ╭╮╭╮      
//   10.00 ┤         ││╭─╮     ╭╮   ││││      
//    9.00 ┤         │││ │     ││ ╭╮││││      
//    8.00 ┤   ╭─╮   │││ │    ╭╯│ ││││││    ╭ 
//    7.00 ┤  ╭╯ │   │││ │   ╭╯ │ ││││││    │ 
//    6.00 ┤  │  │   │││ │  ╭╯  │ │╰╯││╰╮   │ 
//    5.00 ┤  │  │╭╮╭╯││ │  │   │ │  ││ │   │ 
//    4.00 ┤  │  ││││ ││ │  │   │ │  ││ │   │ 
//    3.00 ┤  │  ││╰╯ ││ │  │   │ │  ││ ╰╮  │ 
//    2.00 ┤  │  ││   ││ ╰╮ │   │ │  ╰╯  │  │ 
//    1.00 ┤ ╭╯  ││   ╰╯  │╭╯   │ │      ╰─╮│ 
//    0.00 ┼─╯   ╰╯       ╰╯    ╰─╯        ╰╯  
```

## square / squareFloat

Generate an array with n-periods of a square/pulse wave function. Optional last arguments set lo and hi range and pulse width. Only setting first range argument sets the low-range to 0.

Alias: `squareF`, `rect`, `rectFloat`, `rectF` 

**arguments**
- {Int+/Array} -> Length of output array (uses length of Array if input)
- {Number/Array} -> Periods of the wave (option, default=1)
- {Number} -> Low range of values (optional, default=0) 
- {Number} -> High range of values (optional, default=1)
- {Number} -> Pulse width (optional, default=0.5)

```js
Gen.square(30, 3, -2, 5, 0.8);
//=>  5.00 ┼───────╮ ╭────────╮╭────────╮ 
//    1.50 ┼       │ │        ││        │ 
//   -2.00 ┤       ╰─╯        ╰╯        ╰  

Gen.square(30, 4, 0, 1, 0.2);
//=>  1.00 ┼─╮     ╭─╮    ╭─╮     ╭╮           
//    0.00 ┤ ╰─────╯ ╰────╯ ╰─────╯╰─────  

// Alias: Gen.rect()

// Frequency Modulation with Gen.sin
Gen.squareFloat(30, Gen.sinF(30, 2, 1, 5));
//=>  1.00 ┼───╮     ╭──╮╭──╮ ╭─╮  ╭─╮ ╭─ 
//    0.80 ┤   │     │  ││  │ │ │  │ │ │  
//    0.60 ┤   │     │  ││  │ │ │  │ │ │  
//    0.40 ┤   │     │  ││  │ │ │  │ │ │  
//    0.20 ┤   │     │  ││  │ │ │  │ │ │  
//    0.00 ┤   ╰─────╯  ╰╯  ╰─╯ ╰──╯ ╰─╯   
```

## binaryBeat

Generate a binary rhythm from a positive integer number or an array of numbers. Returns the binary value as an array of separated 1's and 0's useful for representing rhythmical patterns.

Alias: `binary`

**arguments**
- {Int+/Array} -> Array of numbers to convert to binary representation

```js
// generate a binary array from a single number
Gen.binaryBeat(358);
//=> [1, 0, 0, 0, 0, 1, 1, 0, 1, 0]

// use an array of numbers and concatenate binary representations
Gen.binaryBeat([4, 3, 5]);
//=> [1, 0, 0, 1, 1, 1, 0, 1]

// negative values are clipped to 0
Gen.binaryBeat([-4, 4]);
//=> [0, 1, 0, 0]
```

## spacingBeat

Generate an array of 1's and 0's based on a positive integer number or array. Every number in the array will be replaced by a 1 with a specified amount of 0's appended to it. Eg. a 2 => 1 0, a 4 => 1 0 0 0, etc. This technique is useful to generate a rhythm based on spacing length between onsets

Alias: `spacing`, `space`

**arguments**
- {Int+/Array} -> Array of numbers to convert to spaced rhythm

```js
// generate a rhythm based on numbered spacings
Gen.spacingBeat(2, 3, 2)
//=> [1, 0, 1, 0, 0, 1, 0]

// also works with an array as input
Gen.spacingBeat([4, 2, 0])
//=> [1, 0, 0, 0, 1, 0, 0]
```