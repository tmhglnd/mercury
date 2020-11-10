# Stochastic Methods

Methods for procedurally generating number sequences based on various types of randomness, such as white noise (evenly distributed), rolling dice, flipping a coin and more. Also includes Markov Chain.

- [seed](#seed)
- [random](#random)
- [drunk](#drunk)
- [coin](#coin)
- [dice](#dice)
- [urn](#urn)
- [twelveTone](#twelvetone)
- [shuffle](#shuffle)
- [choose](#choose)
- [pick](#pick)
- [expand](#expand)
- [MarkovChain](#markovchain)

## Include

```js
const Rand = require('total-serialism').Stochastic;
```

## seed

Set the seed for the Random Number Genrators. A value of `0` sets to unpredictable seeding. The seed can only be set **once** for every import of the library.

```js
// set the random number generator seed
Rand.seed(19374);
```

## random

Generate a ring of random integers between a specified range (excluding high value).

**arguments**
- {Int+} -> number of values to output
- {Number} -> minimum range (optional, default=0)
- {Number} -> maximum range (optional, default=2)

```js
// generate an array of random floats in range -1 to 1
Rand.randomFloat(3, -1, 1); 
//=> [ 0.6291111850577886, 0.15153786227276944, 0.32814801081039646 ]
// Alternative Rand.randomF();

// generate an array of random integers in range
Rand.random(5, 0, 12); 
//=> [ 3, 3, 7, 1, 0 ]
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/gzWOFUorY" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## drunk

Generate a list of random float values but the next random value is within a limited range of the previous value generating a random "drunk" walk, also referred to as brownian motion. Inspired by the [drunk]-object in MaxMSP

**arguments**

- {Int} -> number of values to output
- {Number} -> step range for next random value
- {Number} -> minimum range (optional, default=null)
- {Number} -> maximum range (optional, default=null)
- {Number} -> starting point (optional, default=(lo+hi)/2)
- {Bool} -> fold between lo and hi range (optional, default=true)

```js 
Rand.drunkFloat(5);
//=> [ 0.493, 0.459, 0.846, 0.963, 0.400 ] 

//  0.88 ┼╮╭╮  
//  0.76 ┤╰╯│  
//  0.63 ┤  │  
//  0.51 ┤  ╰╮ 
//  0.39 ┤   │ 
//  0.26 ┤   ╰ 

Rand.drunk(10, 5, 0, 24);
//=> [ 13, 10, 14, 13, 14, 13, 15, 10, 8, 4 ] 

// 22.00 ┼       ╭╮ 
// 17.80 ┼─╮╭─╮  ││ 
// 13.60 ┤ ││ ╰╮╭╯│ 
//  9.40 ┤ ││  ╰╯ │ 
//  5.20 ┤ ╰╯     │ 
//  1.00 ┤        ╰ 

Rand.drunk(10, 4, 0, 12, 6, false);
//=> [ 2, -2, 2, 1, -3, -1, -2, -1, 3, 6 ] 

//  2.00 ┤╭╮        
// -0.20 ┤│╰╮     ╭ 
// -2.40 ┼╯ ╰╮    │ 
// -4.60 ┤   │╭╮ ╭╯ 
// -6.80 ┼   ╰╯│╭╯  
// -9.00 ┤     ╰╯  
```

## coin

Generate a list of random integer values 0 or 1 like a coin toss, heads/tails. Or 

**arguments**
- {Int+} -> number of coin tosses to output as list

```js
// generate an array of coin tosses
Rand.coin(10); 
//=> [ 0, 1, 0, 1, 0, 1, 0, 0, 1, 0 ]
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/kz7YmtUr4" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## dice

Generate a list of random integer values 1 to 6 like the roll of a dice.

**arguments**
- {Int+} -> number of dice rolls to output as list

```js
// generate an array of dice rolls
Rand.dice(4); 
//=> [ 4, 4, 2, 3 ] 
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/cVZU239Ez" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## urn

Generate a list of unique random integer values between a certain specified range (excluding high val). An 'urn' is filled with values and when one is picked it is removed from the urn. If the outputlist is longer then the range, the urn refills when empty. On refill it is made sure no repeating value can be picked.

**arguments**
- {Int+} -> number of values to output
- {Number} -> maximum range (optional, default=12)
- {Number} -> minimum range (optional, defautl=0)

```js
// generate an array with random values picked from an urn
// with default range 0 to 12 (exclusive)
Rand.urn(5);
//=> [ 3, 6, 2, 8, 7 ] 

// set the range with a second argument to 0-7 (exclusive)
// when more values then range are requested the urn 
// refills and reshuffles
Rand.urn(10, 7);
//=> [ 6, 4, 3, 2, 0, 5, 1, 4, 2, 1 ] 

// A third argument sets a lower range replacing the default 0
Rand.urn(12, -3, 3);
//=> [ -3, 1, -1, 2, 0, -2, 2, -2, 0, -1, -3, 1 ]
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/rEIdr2nWx" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## twelveTone

Generate a list of 12 semitones then shuffle the list based on the random seed. 

**arguments**
- {None}

```js
// generate a twelve-tone series, influenced by the random seed
// basically the same as: Mod.shuffle(Gen.spread(12));
Rand.twelveTone(); 
//=> [ 11, 0, 8, 2, 4, 9, 1, 6, 3, 5, 7, 10 ]
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/IEIoLt9cZ" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## shuffle

Shuffle an array, influenced by the random seed. Based on the Fisher-Yates shuffle algorithm by Ronald Fisher and Frank Yates in 1938. The algorithm has run time complexity of O(n)

**arguments**
- {Array} -> Array to shuffle

```js
// shuffle the items in an array, influenced by the random seed
Rand.shuffle([0, 5, 7, 12]); 
//=> [ 7, 5, 0, 12 ]
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/S5zPwX6B0" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## choose 

Choose random items from an array provided with uniform probability distribution. The default array is an array of 0 and 1.

**arguments**
- {Int+} -> length of array output
- {Array} -> items to choose from (optional, default=[0 1])

```js
// Choose random items from an array provided, uniform distribution
Rand.choose(5, [0, 1, 2, 3, 5, 8, 13]);
//=> [ 3, 0, 13, 3, 2 ] 

// Array can have any datatype
Rand.choose(5, ['c', 'e', 'g']);
//=> [ 'c', 'c', 'g', 'e', 'g' ] 
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/lz7RgC4tS" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## pick

Pick random items from an array provided. An "urn" is filled with values and when one is picked it is removed from the urn. If the outputlist is longer then the range, the urn refills when empty. On refill it is made sure no repeating value can be picked.

**arguments**
- {Int+} -> length of array output
- {Array} -> items to choose from (optional, default=[0 1])

```js
// Pick random items from an array similar to urn
// no repeating values untill urn is empty
Rand.pick(5, [0, 1, 2, 3, 5, 8, 13]);
//=> [ 2, 5, 8, 1, 3 ] 

// Array can have any datatype
Rand.pick(5, ['c', 'e', ['g', 'd']]);
//=> [ 'e', [ 'g', 'd' ], 'c', [ 'g', 'd' ], 'e' ] 
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/6QcjbpzNr" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## expand

Expand an array based upon the pattern within an array. The pattern is derived from the rate in change between values by calculating the differences between every consecutive value. The newly generated values are selected randomly from the list of possible changes, but in such a way that every change occurs once in the sequence of total changes before reshuffling and selecting the next one (see the `pick` method for explanation). The resulting output starts with the input array.

**arguments**
- {Int+} -> length of array output
- {Array} -> Array to expand

```js 
Rand.seed(3141);
Rand.expand(30, [0, 9, 7, 3, 5, 0, -1]);

//=>  9.00 ┤╭╮      ╭╮                    
//    6.80 ┤│╰╮     ││                    
//    4.60 ┤│ │╭╮   ││                    
//    2.40 ┤│ ╰╯│   │╰─╮             ╭─╮  
//    0.20 ┼╯   ╰─╮╭╯  │             │ │╭ 
//   -2.00 ┤      ╰╯   ╰╮   ╭─╮      │ ╰╯ 
//   -4.20 ┼            │   │ │    ╭╮│    
//   -6.40 ┤            ╰╮  │ │    │╰╯    
//   -8.60 ┤             │╭╮│ ╰─╮  │      
//  -10.80 ┤             ╰╯╰╯   │╭╮│      
//  -13.00 ┤                    ╰╯╰╯       

Rand.seed(6181);
Rand.expand(30, [0, 9, 7, 3, 5, 0, -1]);

//=>  9.00 ┤╭╮                            
//    6.80 ┤│╰╮                           
//    4.60 ┤│ │╭╮                         
//    2.40 ┤│ ╰╯│        ╭╮╭╮             
//    0.20 ┼╯   ╰─╮╭╮    │╰╯╰╮        ╭── 
//   -2.00 ┤      ╰╯│  ╭╮│   ╰╮       │   
//   -4.20 ┼        ╰╮ │││    ╰╮   ╭╮ │   
//   -6.40 ┤         │ │╰╯     │╭╮ ││ │   
//   -8.60 ┤         ╰╮│       ╰╯╰╮│╰╮│   
//  -10.80 ┤          ╰╯          ││ ╰╯   
//  -13.00 ┤                      ╰╯      
```

### Markov Chain

Build a Markov Chain from a set of data and use it to generate new values or an array of values based on the probabilities of the transitions in the provided training dataset. A Markov Chain is a model that describes possible next events based on a current state (first order) and sometimes previous states (2nd, 3rd, ... n-order). The Markov Chain is a broadly used method in algorithmic music to generate new material (melodies, rhythms, but even words) based on a set of provided material.

```js
const Rand = require('total-serialism').Stochastic;

var melody = ['c', 'e', 'f', 'e', 'g', 'f', 'a', 'c'];
// make a MarkovChain instance and optionally train with array
let markov = new Rand.MarkovChain(melody);

// add more to the training
var melody2 = ['g', 'a', 'b', 'g', 'a', 'f', 'd', 'e'];
markov.train(melody2);

// view the transition table (stored as dictionary)
console.log(markov.table);
// { c: [ 'e' ],
//   e: [ 'f', 'g' ],
//   f: [ 'e', 'a', 'd' ],
//   g: [ 'f', 'a', 'a' ],
//   a: [ 'c', 'b', 'f' ],
//   b: [ 'g' ],
//   d: [ 'e' ] }

// set the state of the model used as initial value
markov.state('c');

// set the seed for the scoped random number generator
markov.seed(31415);

// go to the next state based on the model probabilities
markov.next();
// => 'e'

// generate an array of 10 values 
markov.chain(10);
// => [ 'f', 'd', 'e', 'g', 'a', 'b', 'g', 'a', 'c', 'e' ]

// clear the model
markov.clear();
```
