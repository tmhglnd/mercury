
# Generative Methods

Basic methods that generate arrays of number sequences, such as methods that generate an ascending array of numbers evenly spread between a low and high value.

- [spread](#spread)
- [spreadInclusive](#spreadinclusive)
- [fill](#fill)
- [sine / cosine](#sine--cosine)

## Include

```js
const Gen = require('total-serialism').Generative;
```

## spread

Generate an array of n-length of evenly spaced values between a starting number up untill (but excluding) the 3th argument.

**arguments**
- {Int+} -> Length of array
- {Number} -> Low value (optional)
- {Number} -> High value (exclusive, optional)

```js
// generate an array of 7 ints between range 0-7
Gen.spread(7); 
//=> [ 0, 1, 2, 3, 4, 5, 6 ]

// generate an array of 5 floats between range 0-1
Gen.spreadFloat(5); 
//=> [ 0, 0.2, 0.4, 0.6, 0.8 ]
// Alternative: Gen.spreadF()
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/TT6XGijrR" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## spreadInclusive

Generate an array of n-length of evenly spaced values between a starting number up to (and including) the 3th argument.

**arguments**
- {Int+} -> Length of array
- {Number} -> Low value (optional)
- {Number} -> High value (inclusive, optional)

```js
// generate an array of 5 ints between range 7-19 (19 inclusive)
Gen.spreadInclusive(5, 7, 19); 
//=> [ 7, 10, 13, 16, 19 ] 
// Alternative: Gen.spreadInc()

// generate an array of 9 floats between -1 - 1 (inclusive)
Gen.spreadInclusiveFloat(9, -1, 1); 
//=> [ -1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1 ]
// Alternative: Gen.spreadIncF()
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/WSv9b8sjc" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

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

```

<iframe src="https://editor.p5js.org/tmhglnd/embed/CFOwE1yhW" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>