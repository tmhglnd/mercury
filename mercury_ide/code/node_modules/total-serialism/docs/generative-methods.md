
# Generative

Basic methods that generate arrays of number sequences, such as methods that generate an ascending array of numbers evenly spread between a low and high value.

## Include

```js
const Gen = require('total-serialism').Generative;
```

# Methods

- [spread / spreadFloat](#spread)
- [spreadInclusive / spreadInclusiveFloat](#spreadinclusive)
- [spreadExp / spreadExpFloat](#spreadExp)
- [spreadInclusiveExp / spreadInclusiveExpFloat](spreadInclusiveExp)
- [fill](#fill)
- [sine / cosine](#sine--cosine)
- [sineFloat / cosineFloat](#sineFloat--cosineFloat)
- [saw / sawFloat](#saw--sawFloat)

## spread

Generate an array of n-length of evenly spaced values between a starting number up until (but excluding) the 3th argument. Flipping the low and high range will result in the same values but descending.

**arguments**
- {Int+} -> Length of array
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
// Alternative: Gen.spreadF()

```

<iframe src="https://editor.p5js.org/tmhglnd/embed/TT6XGijrR" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## spreadInclusive

Generate an array of n-length of evenly spaced values between a starting number up to (and including) the 3th argument. Flipping the low and high range will result in the same values but descending.

**arguments**
- {Int+} -> Length of array
- {Number} -> Low value (optional)
- {Number} -> High value (inclusive, optional)

```js
// generate an array of 5 ints between range 0-5 (5 inclusive)
Gen.spreadInclusive(5);
//=> [ 0, 1, 2, 3, 5 ] 
// Alternative: Gen.spreadInc()

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
// Alternative: Gen.spreadIncF()

```

## spreadExp

Similar to spread and spreadFloat but with an optional exponent as 4th argument.

**arguments**
- {Int+} -> Length of array
- {Number} -> Low value (optional, default=0)
- {Number} -> High value (exclusive, optional, default=length)
- {Number} -> Exponent (optional, default=1)

```js
Gen.spreadExp(10, 0, 10, 2);
//=> [
//   0, 0, 0, 0, 1,
//   2, 3, 4, 6, 8
// ] 
```

## spreadInclusiveExp

Similar to spreadInclusive and spreadInclusiveFloat but with an optional exponent as 4th argument.

**arguments**
- {Int+} -> Length of array
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

Fill an array with values. Arguments are in pairs. Every pair consists of `<value, amount>` The value is repeated n-amount of times in the array.

**arguments**
- {Value} -> value to duplicate
- {Int+} -> amount of duplicates
- ... -> repeat n-times

```js
// fill an array with duplicates of a value
Gen.fill(10, 2, 15, 3, 20, 4); 
//=> [ 10, 10, 15, 15, 15, 20, 20, 20, 20 ]
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/-qtEfC8Zm" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## sine / cosine

Generate an array with n-periods of a (co)sine function with integer values. Optional last arguments set lo and hi range and phase offset. Default range is 0 to 12. Wave can be inverted by swapping the arguments

**arguments**
- {Int+} -> Length of array
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

<iframe src="https://editor.p5js.org/tmhglnd/embed/PdywLSgcO" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## sineFloat / cosineFloat

Generate an array with n-periods of a (co)sine function with floating-point values. Optional last arguments set lo and hi range and phase offset. Default range is -1 to 1. Only setting first range argument sets the low-range to 0. Wave can be inverted by swapping the arguments.

**arguments**
- {Int+} -> Length of array
- {Number} -> Periods of (co)sine-wave (optional, default=1)
- {Number} -> Low range of values (optional, default=-1)
- {Number} -> High range of values (optional, default=1)
- {Number} -> Phase offset (optional, default=0)

```js
// generate 7 ints of 1.5 period a cosine function
Gen.cosine(7, 1.5);
//=> [ 12, 7, 0, 2, 9, 11, 4 ] 
//       12.00 ┼╮      
//       11.00 ┤│   ╭╮ 
//       10.00 ┤│   ││ 
//        9.00 ┤│  ╭╯│ 
//        8.00 ┤│  │ │ 
//        7.00 ┤╰╮ │ │ 
//        6.00 ┤ │ │ │ 
//        5.00 ┤ │ │ │ 
//        4.00 ┤ │ │ ╰ 
//        3.00 ┤ │ │   
//        2.00 ┤ │╭╯   
//        1.00 ┤ ││    
//        0.00 ┤ ╰╯     

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

<iframe src="https://editor.p5js.org/tmhglnd/embed/CFOwE1yhW" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## saw / sawFloat

Generate an array with n-periods of a saw/phasor function. Optional last arguments set lo and hi range and phase offset. Only setting first range argument sets the low-range to 0

**arguments**
- {Int} -> Length of output array (resolution)
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
```