---
sidebar_position: 5
---

# List Functions

Mercury finds its roots in the concept of *Serialism*, a musical composition style where all parameters such as pitch, rhythm and dynamics are expressed in a series of values that adjust the instruments state over time. This series in Mercury is refered to as a `list`.

Every instance of an instrument has an internal counter. This counter increments (0, 1, 2, 3,... etc) when an instrument triggers an event based on the time-interval from `time()`. This is also called a step-sequencer. When a `list` is added as argument to an `instrument-function` the instrument uses its count as a lookup-position (index) taking the corresponding value from the list. As soon as the index is higher then the amount of values in the `list` it will return to the beginning and start over, therefore the `list` is circular/looping.

Mercury makes use of the [`total-serialism`](https://www.npmjs.com/package/total-serialism) NodeJS Package to generate and transform numbersequences that are used for melodies, rhythms, parameters and basically anything that can be sequenced in the environment. `total-serialism` is a set of functions used for procedurally generating and transforming lists. This library is mainly designed with algorithmic composition of music in mind, but can be useful for other purposes that involve generating and manipulating lists and numbers.

**List Function Categories:**

- [Generative](#generative-functions)
<!-- - [Algorithmic](#algorithmic-functions) -->
- [Stochastic](#stochastic-functions)
- [Transform](#transformative-functions)
- [Translate](#translate-functions)
- [Utility & Math](#utility-functions)

## Syntax Overview

```js
list <name> [ value0 value1 ... value-n ]
list <name> function()
```

For detailed explanation of the syntax see: [Syntax](syntax) and [`list`](actions#list) under [Actions](actions).

## Function Types

There are 4 overall types of `list-functions`: `Generators`, `Transformers`, `Analysers`, `Translators`

### Generators

Generators are `list-functions` that generate a list based on a specific process. The process can be deterministic (the output will always be the same for a specific combination of arguments) or stochastic (the output has some form of psuedo-randomness that can be controlled with a seed). Generators can be found in different categories such as: `Generative`, `Algorithmic` and `Stochastic`.

:::note
A generator always has the `output-length` of the list as the first argument and always outputs a `list`.
:::

```js
list <name> generator(<output-length> <additional-arguments>)
```

```js title="example"
list rand random(20) // generates 20 random numbers
list cosi cosine(32) // generates 32 values of a period of a cosine wave
```

### Transformers

Transformers are `list-functions` that take one or more lists as input, transform them with some process and output the processed result. The process can be deterministic (the output will always be the same for a specific combination of arguments) or stochastic (the output has some form of psuedo-randomness that can be controlled with a seed, more on that under [`randomSeed`](global#randomseed)).

:::note
A transformer always has an `input-list` as the first argument and always outputs a `list`.
:::

```js
list <name> transformer(<input-list> <additional-arguments>)
```

```js title="example"
list values [0 2 3 5 7 8 11 12]

list shuf shuffle(values) // shuffle the values
list revs rotate(values 4) // rotate the values by 4 steps
```

### Analysers

Analysers are `list-functions` that take one (or more) lists as input and analyse their content based on some process and output a single value as a result.

:::note
An analyser always has an `input-list` as the first argument and always outputs a single `value`.
:::

```js
list <name> analyser(<input-list> <additional-arguments>)
```

```js title="example"
list values [0 2 3 5 7 8 11 12]

list amnt size(values) // get the amount of items in the list
list avg average(values) // get the average value from the list
```

### Translators

Translators are `list-functions` that translate from one input to some other output. For example midi-note values can be translated to frequencies, or roman numerals can be translated to chord progression semitone values. Translatores can be found in different categories.

:::note
A translator can have various `input` datatypes (`list`, `number`, `name`) and different `output` datatypes as well. Please refer to the function to see what these are.
:::

```js title="example"
list numerals [I IIm IV]
list chords chordsFromNumerals(numerals)

list hex "8fa9"
list beat hexBeat(hex)
```

## Generative Functions

The generative list functions are functions that procedurally create a list from an algorithm and based on a set of arguments provided to the function.

### spread (spreadFloat)

Generate a list of n-length of evenly spaced values between a starting number up untill (but excluding) the 3th argument. Flipping the low and high values results in a descending list. By adding `Float/F` to the function it outputs `float` numbers.

**type: `generator`**

**arguments**
- `Int+` -> Length of list
- `Int/Float` -> Start value (default=0)
- `Int/Float` -> End value (excluded, default=length)

```js
list spr1 spread(5 0 12)
// => [0 2 4 7 9]

list spr4 spread(5 12 0)
// => [9 7 4 2 0]

list spr2 spreadFloat(5 -1 1)
// => [-1 -0.6 -0.2 0.2 0.6]

list spr3 spreadF(5 0 2)
// => [0 0.4 0.8 1.2 1.6]
```

Alias: `spreadF`

### spreadInclusive (spreadInclusiveFloat)

Generate a list of n-length of evenly spaced values between a starting number up to (and including) the 3th argument. Flipping the low and high values results in a descending list. By adding `Float/F` to the function it outputs `float` numbers.

**type: `generator`**

**arguments**
- `Int+` -> Length of list
- `Number` -> Start value (default=0)
- `Number` -> End value (included, default=length)

```js
list spi1 spreadInclusive(5 0 12)
// => [0 3 6 9 12]

list spi4 spreadInclusive(5 12 0)
// => [12 9 6 3 0]

list spi2 spreadInclusiveFloat(5 -1 1)
// => [-1 -0.5 0 0.5 1]

list spi3 spreadIncF(5 0 2)
// => [0 0.5 1 1.5 2]
```

Alias: `spreadInc`, `spreadIncF`

### fill

Fill a list with values. Arguments are provided in pairs. Every pair consists of `value amount`. The value is repeated n-amount of times in the list.

**arguments**
- `Value` -> value to duplicate
- `Int+` -> amount of duplicates

```js
list fll1 fill(10 2 15 3 20 4)
// => [10 10 15 15 15 20 20 20 20]

list fll2 fill(kick_min 2 hat_min 3)
// => [kick_min kick_min hat_min hat_min hat_min]
```

### sine (sineFloat)

Generate a list with n-periods of a sine function. Optional last arguments set the lo and hi range. Only setting first range argument sets the low-range to 0. The sine and cosine waves are interesting functions to use for creating melodic or rhythmic/dynamic patterns. By adding `Float/F` to the function it outputs `float` numbers.

**type: `generator`**

**arguments**
- `Int+` -> Length of list
- `Number(List)` -> Periods of (co)sine-wave (optional, default=1)
- `Number` -> Low range of values (optional, default=0, default=-1 for Float)
- `Number` -> High range of values (optional, default=12, default=1 for Float)
- `Number` -> Phase offset (optional, default=0)

```js
list sin1 sine(10)
// => [6 9 11 11 9 6 2 0 0 2]

list sin2 sine(10 1 -12 12)
// => [0 7 11 11 7 0 -7 -11 -11 -7]

list sin3 sine(10 2 0 5)
// => [2 4 3 1 0 2 4 3 1 0]

// generate 10 ints with 4 periods a sine function
list sin4 sine(11 4 0 7)
// 6.00 ┼╭╮   ╭╮ ╭╮ 
// 5.00 ┤││╭╮ ││ ││ 
// 4.00 ┤│││╰╮││ ││ 
// 3.00 ┼╯││ │││ ││ 
// 2.00 ┤ ││ ││╰╮││ 
// 1.00 ┤ ││ ││ ╰╯│ 
// 0.00 ┤ ╰╯ ╰╯   ╰  
```

Alias: `sineF`

### cosine (cosineFloat)

Like [`sine`](#sine-sinefloat) but using the cosine function.

**type: `generator`**

**arguments**
- `Int+` -> Length of list
- `Number(List)` -> Periods of (co)sine-wave (optional, default=1)
- `Number` -> Low range of values (optional, default=0, default=-1 for Float)
- `Number` -> High range of values (optional, default=12, default=1 for Float)
- `Number` -> Phase offset (optional, default=0)

```js
list cos1 cosine(10)
// => [12 10 7 4 1 0 1 4 7 10]

list cos2 cosine(10 1 -12 12)
// => [12 9 3 -3 -9 -12 -9 -3 3 9]

list cos3 cosine(10 2 0 5)
// => [5 3 0 0 3 4 3 0 0 3]

// generate 16 floats with 1 period of a cosine function
list cos4 cosineFloat(8)
//  1.00 ┼╮               
//  0.60 ┤╰─╮          ╭─ 
//  0.20 ┼  ╰╮        ╭╯  
// -0.20 ┤   ╰╮      ╭╯   
// -0.60 ┤    ╰╮    ╭╯    
// -1.00 ┤     ╰────╯  
```

Alias: `cosineF`

### saw (sawFloat)

Generate a list with n-periods of a saw/phasor function. Optional last arguments set lo and hi range and phase offset. Only setting first range argument sets the low-range to 0

**type: `generator`**

**arguments**
- `Int` -> Length of output list (resolution)
- `Number(List)` -> Periods of the wave (option, default=1)
- `Number` -> Low range of values (optional, default=-1) 
- `Number` -> High range of values (optional, default=1)
- `Number` -> Phase offset (optional, default=0)

```js
list saw1 sawFloat(25 2.5)
//=>  0.80 ┤       ╭─╮       ╭─╮     
//    0.44 ┤     ╭─╯ │     ╭─╯ │     
//    0.08 ┤    ╭╯   │    ╭╯   │     
//   -0.28 ┼  ╭─╯    │  ╭─╯    │  ╭─ 
//   -0.64 ┤╭─╯      │╭─╯      │╭─╯  
//   -1.00 ┼╯        ╰╯        ╰╯    

// Modulation on frequency
list saw2 saw(34 sinF(30 2 0 100) 0 12)
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
Alias: `sawF`

### square (squareFloat)

Generate a list with n-periods of a square/pulse wave function. Optional last arguments set lo and hi range and pulse width. Only setting first range argument sets the low-range to 0.

**type: `generator`**

**arguments**
- `Int` -> Length of output list (resolution)
- `Number(List)` -> Periods of the wave (option, default=1)
- `Number` -> Low range of values (optional, default=0) 
- `Number` -> High range of values (optional, default=1)
- `Number` -> Pulse width (optional, default=0.5)

```js
list sqr1 square(30 4 0 1 0.2)
//=>  1.00 ┼─╮     ╭─╮    ╭─╮     ╭╮           
//    0.00 ┤ ╰─────╯ ╰────╯ ╰─────╯╰─────  
```

```js
// Frequency Modulation with Gen.sin
list sqr2 squareFloat(30 sinF(30 2 1 5))
//=>  1.00 ┼───╮     ╭──╮╭──╮ ╭─╮  ╭─╮ ╭─ 
//    0.80 ┤   │     │  ││  │ │ │  │ │ │  
//    0.60 ┤   │     │  ││  │ │ │  │ │ │  
//    0.40 ┤   │     │  ││  │ │ │  │ │ │  
//    0.20 ┤   │     │  ││  │ │ │  │ │ │  
//    0.00 ┤   ╰─────╯  ╰╯  ╰─╯ ╰──╯ ╰─╯   
```

Alias: `squareF`

### binaryBeat

Generate a binary sequence (which can be used as a rhythm) from a positive integer `number` or a `list` of numbers. Returns the binary value as a list of separated 1's and 0's useful for representing rhythmical patterns.

**type: `translator`**

**arguments**
- `Int+(List)` -> List of numbers to convert to binary representation

```js
// generate a binary list from a single number
list bny1 binaryBeat(358)
//=> [1 0 1 1 0 0 1 1 0]

// use a list of numbers and concatenate binary representations
list bny2 binaryBeat([4 3 5])
//=> [1 0 0 1 1 1 0 1]

// negative values are clipped to 0
list bny3 binaryBeat([-4 4])
//=> [0 1 0 0]
```

Alias: `binary`

### spacingBeat

Generate a list of 1's and 0's based on a positive integer `number` or `list`. Every number in the list will be replaced by a 1 with a specified amount of 0's appended to it. Eg. a 2 => 1 0, a 4 => 1 0 0 0, etc. This technique is useful to generate a rhythm based on spacing length between onsets.

**arguments**
- `Int+(List)` -> List of numbers to convert to spaced rhythm

```js
// generate a rhythm based on numbered spacings
list spc1 spacingBeat(2 3 2)
//=> [1 0 1 0 0 1 0]

// also works with a list as input
list spc2 spacingBeat([4 2 0])
//=> [1 0 0 0 1 0 0]
```

Alias: `spacing`

<!-- ## Algorithmic Functions -->

### euclidean

Generate a euclidean rhythm evenly spacing n-hits amongst n-steps. Inspired by Godfried Toussaints famous paper "The Euclidean Algorithm Generates Traditional Musical Rhythms". This implementation is however a faster method that uses the downsampling of a line drawn between two points in a 2-dimensional grid to divide the squares into an evenly distributed amount of steps refered to as "Bresenham's Line Algorithm". 

**type: `generator`**

**arguments**
- `Int+` -> length of list (optional, default=8)
- `Int+` -> hits to distribute (optional, default=4)
- `Int` -> rotate n-steps left or right (optional, default=0)

```js
list euc1 euclidean()
// => [1 0 1 0 1 0 1 0]

list euc2 euclidean(7 5)
// => [1 1 0 1 1 0 1]

list euc3 euclidean(7 5 2)
// => [0 1 1 1 0 1 1]
```

Alias: `euclid`

### hexBeat

Generate rhythms from hexadecimal values. Hexadecimal beats make use of hexadecimal values (0 - f) that are a base-16 number system. Because one digit in a base-16 number system has 16 possible values (0 - 15) these can be converted to 4 bits that therefore can be seen as groups of 4 16th notes. These hexadecimal values will then represent any permutation of 1's and 0's in a 4 bit number, where 0 = 0 0 0 0, 7 = 0 1 1 1, b = 1 0 1 1, f = 1 1 1 1 and all possible values in between. Inspired by a workshop from Steven Yi at the ICLC 2020 in Limerick. [Learn hex beats here](https://kunstmusik.github.io/learn-hex-beats/).


**type: `translator`**

**arguments**
- `Name` -> `string`/`name`/`number` of hexadecimal characters (0 t/m f) (optional, default=8)

```js
list hex1 hexBeat()
// => [1 0 0 0]

list hex2 hexBeat(a)
// => [1 0 1 0]

list hex3 hexBeat(f9cb)
// => [1 1 1 1 1 0 0 1 1 1 0 0 1 0 1 1]
```
Alias: `hex`

:::info
In the MercuryPlayground writing `hex(82fc)` causes an error because the value `82fc` starts with a number so it is nota valid `name`. To be able to use it anyways change that value into a string by adding quotes: `hex('82fc')`
:::

### fibonacci

Generate the Fibonacci sequence `F(n) = F(n-1) + F(n-2)`. The ratio between consecutive numbers in the fibonacci sequence tends towards the Golden Ratio (1+√5)/2. 

`OEIS: A000045` (Online Encyclopedia of Integer Sequences)

**type: `generator`**

**arguments**
- `Int+` -> output length of list
- `Int+` -> offset, start the sequence at nth-fibonacci number (optional, default=0)

```js
list fib1 fibonacci(10)
// => [0 1 1 2 3 5 8 13 21 34]

list fib2 fibonacci(3 10)
// => [55 89 144]
```

:::info
The numbers in the fibonacci sequence grow big quite fast! If you like to use these for melodic material consider using `wrap()`, `fold()`, `clip()` or `mod()`, or have a look at the `pisano()` function below.
:::

### pisano

Translate the fibonacci sequence to the Pisano period sequence with a modulus operation. The pisano period is a result of applying a modulo (`%`) operation on the Fibonacci sequence `F[n] = (F[n-1] + F[n-2]) mod a`. The length of the period differs per modulus value, but the sequence will always have a repetition at some point.

**type: `translator`**

**arguments**
- `Int+` -> modulus for pisano period (optional, default=12)
- `Int+` -> output length of list (optional, defaults to pisano-period length)

```js
list psn1 pisano()
// => [0 1 1 2 3 5 8 1 9 10 7 5 0 5 5 10 3 1 4 5 9 2 11 1]

list psn2 pisano(3)
// => [0 1 1 2 0 2 2 1]

list psn3 pisano(11)
// => [0 1 1 2 3 5 8 2 10 1]
```

### pell

Generate the Pell numbers `F(n) = 2 * F(n-1) + F(n-2)`. The ratio between consecutive numbers in the pell sequence tends towards the Silver Ratio 1 + √2.

`OEIS: A006190` (Online Encyclopedia of Integer Sequences)

**type: `generator`**

**arguments**
- `Int+` -> output length of list

```js
list pll1 pell(8)
// => [0 1 2 5 12 29 70 169]
```

### lucas

Generate the Lucas numbers `F(n) = F(n-1) + F(n-2), with F0=2 and F1=1`.

`OEIS: A000032` (Online Encyclopedia of Integer Sequences)

**type: `generator`**

**arguments**
- `Int+` -> output length of list

```js
list luc1 lucas(8)
// => [2 1 3 4 7 11 18 29]
```

### threeFibonacci

Generate the Tribonacci (3bonacci or threebonacci) numbers `F(n) = 2 * F(n-1) + F(n-2)`. The ratio between consecutive numbers in the 3-bonacci sequence tends towards the Bronze Ratio (3 + √13) / 2.

`OEIS: A000129` (Online Encyclopedia of Integer Sequences)

**type: `generator`**

**arguments**
- `Int+` -> output length of list

```js
list tfi1 threeFibonacci(8)
// => [0 1 3 10 33 109 360 1189]
```

## Stochastic Functions

The stochastic list functions are functions that create or transform a list with some form of randomness involved. This is psuedo-randomess that can be controlled with the random seed.

### randomSeed

Set the seed for the Random Number Generators. The RNG's are part of all the Stochastic Functions. This is not a list function but part of the `global` settings. A value of `0` sets to unpredictable seeding (which is the default). Read more about the [`randomSeed` here](global#randomseed).

```js
set randomSeed 3141
```

### random (randomFloat)

Generate a list of random integers between a specified range (excluding the high value!). By adding `Float/F` to the function it outputs `float` numbers.

**type: `generator`**

**arguments**
- `Int+` -> number of values to output as a list
- `Int` -> minimum range (optional, default=0)
- `Int` -> maximum range (optional, default=2, default=1 for Float)

```js
set randomSeed 31415

list rnd1 random(5)
// => [1 0 0 1 1]
list rnd2 random(5 12)
// => [0 10 3 2 2]
list rnd3 random(5 -12 12)
// => [-2 -5 -8 -11 6]
```

```js
set randomSeed 31415

list rnf1 randomFloat(5)
// => [0.81 0.32 0.01 0.85 0.88]
list rnf2 randomFloat(5 0 12)
// => [0.16 10.72 3.16 262 2.34]
list rnf3 randomFloat(5 -12 12)
// => [-1.19 -4.21 -7.36 -10.31 6.82]
```

Alias: `rand`, `randF`

### drunk (drunkFloat)

Generate a list of random values but the next random value is within a limited range of the previous value generating a random "drunk" walk, also referred to as brownian motion. By adding `Float/F` to the function it outputs `float` numbers.

**type: `generator`**

**arguments**

- `Int+` -> number of values to output as a list
- `Int` -> step range for next random value
- `Int` -> minimum range (optional, default=null)
- `Int` -> maximum range (optional, default=null)
- `Int` -> starting point (optional, default=(lo+hi)/2)
- `Bool` -> fold between lo and hi range (optional, default=true)

```js
list dr1 drunk(10 5 0 24)
//=> [ 13 10 14 13 14 13 15 10 8 4 ] 

// 22.00 ┼       ╭╮ 
// 17.80 ┼─╮╭─╮  ││ 
// 13.60 ┤ ││ ╰╮╭╯│ 
//  9.40 ┤ ││  ╰╯ │ 
//  5.20 ┤ ╰╯     │ 
//  1.00 ┤        ╰ 

list dr2 drunk(10 4 0 12 6 false)
//=> [ 2 -2 2 1 -3 -1 -2 -1 3 6 ] 

//  2.00 ┤╭╮        
// -0.20 ┤│╰╮     ╭ 
// -2.40 ┼╯ ╰╮    │ 
// -4.60 ┤   │╭╮ ╭╯ 
// -6.80 ┼   ╰╯│╭╯  
// -9.00 ┤     ╰╯  
```

```js
list dr1 drunkFloat(5)
//=> [ 0.493 0.459 0.846 0.963 0.400 ] 

//  0.88 ┼╮╭╮  
//  0.76 ┤╰╯│  
//  0.63 ┤  │  
//  0.51 ┤  ╰╮ 
//  0.39 ┤   │ 
//  0.26 ┤   ╰ 
```

Alias: `drunkF`

### urn

Generate a list of unique random integer values between a certain specified range (excluding high val). An 'urn' is filled with values and when one is picked it is removed from the urn. If the outputlist is longer then the range, the urn refills when empty. On refill it is made sure no repeating value can be picked.

**type: `generator`**

**arguments**
- `Int+` -> number of values to output as a list
- `Number` -> maximum range (optional, default=12)
- `Number` -> minimum range (optional, defautl=0)

```js
set randomSeed 1618

list urn1 urn(5)
// => [3 7 10 0 2]
list urn2 urn(8 4)
// => [0 2 1 3 1 3 0 2]
list urn3 urn(8 10 14)
// => [13 10 12 11 12 10 13 11]
```

### coin

Generate a list of random integer values 1 or 0 like a coin toss, heads/tails. Useful for generating random rhythms. `coin()` is basically a `random()` with a range of 2.

**type: `generator`**

**arguments**
- `Int+` -> number of coin tosses to output as list

```js
list coin1 coin(8)
// => [1 0 1 0 1 0 1 1]
```

### dice

Generate a list of random integer values 1 till 6 (inclusive) like you would roll some dice.

**type: `generator`**

**arguments**
- `Int+` -> number of dice rolls to output as list

```js
list dice1 dice(8)
// => [5 4 6 4 4 5 4 2]
```

### clave

Generate random clave patterns. The output is a binary list that represents a rhythm, where 1's can represent onsets and 0's rests. The first argument sets the list length output, second argument sets the maximum gap between onsets, third argument the minimum gap.

**type: `generator`**

**arguments**
- `Int+` -> output length of list (default=8)
- `Int+` -> maximum gap between onsets (default=3)
- `Int+` -> minimum gap between onsets (default=2)

```js
list clv1 clave()
//=> [ 1 0 1 0 0 1 0 1 ] 

list clv2 clave(8)
//=> [ 1 0 0 1 0 1 0 1 ] 

list clv3 clave(16 4)
//=> [ 1 0 0 0 1 0 1 0 0 0 1 0 0 1 0 1 ] 

list clv4 clave(16 3 1)
//=> [ 1 0 0 1 0 0 1 1 0 0 1 0 1 0 0 1 ]
```

### twelveTone

Generate a list of all 12 semitones in one octave (12-TET) then shuffle the list based on the random seed.

**type: `generator`**

**arguments**
- `None`

```js
list twv1 twelveTone()
// => [10 7 6 3 2 9 8 4 1 5 0 11]
```

```js
//Basically a shorthand for: 
list notes spread(12)
list notes shuffle(notes)
```

### choose

Choose random items from a list provided with uniform probability distribution. The default list is a list of 0 and 1.

**type: `generator`**

**arguments**
- `Int+` -> length of list output
- `List` -> items to choose from (optional, default=[0 1])

```js
set randomSeed 62832

list samples [hat snare kick]
list sequence choose(10 samples)
// => [hat kick hat kick hat snare kick hat hat hat]

list notes [0 3 7 5 9 12]
list melody choose(10 notes)
// => [0 5 3 9 0 7 3 12 3 7]
```

### pick

Pick random items from a list provided. An "urn" is filled with values and when one is picked it is removed from the urn. If the outputlist is longer then the range, the urn refills when empty. On refill it is made sure no repeating value can be picked.

**type: `generator`**

**arguments**
- `Int+` -> length of list output
- `List` -> items to choose from (optional, default=[0 1])

```js
set randomSeed 62832

list samples [hat snare kick tom]
list sequence pick(10 samples)
// => [hat kick tom snare tom hat snare kick tom hat]

list notes [0 3 7 5 9 12]
list melody pick(10 notes)
// => [3 0 7 9 12 5 0 7 12 9]
```

### shuffle

Shuffle a list, influenced by the random seed. Based on the Fisher-Yates shuffle algorithm by Ronald Fisher and Frank Yates in 1938. The algorithm has run time complexity of O(n).

**type: `transformer`**

**arguments**
- `List` -> List to shuffle

```js
set randomSeed 14142

list samples [hat snare kick tom]
list shf1 shuffle(samples)
// => [snare tom kick hat]

list notes [0 3 7 5 9 12]
list shf2 scramble(notes)
// => [12 0 3 7 5 9]
```

### expand

Expand a list based on the pattern/progression within a list. The pattern is derived from the rate of change between values by calculating the differences between every consecutive value. The newly generated values are selected randomly from the list of possible changes, but in such a way that every change occurs once in the sequence of total changes before reshuffling and selecting the next one (see the `pick` method for explanation). The resulting output starts with the input list.

**type: `transformer`**

**arguments**
- `List` -> list to expand
- `Int+` -> length of list output

```js
set randomSeed 3141
list notes [0 9 7 3 5 0 -1]
list exp expand(notes 30)

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

set randomSeed 6181
list exp2 expand(notes 30)

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

### markovTrain

Build a Markov Chain transition table from a set of datapoints (a list) and use it together with `markovChain()` to generate a new list of values based on the probabilities of the transitions in the provided training dataset. A Markov Chain is a model that describes possible next events based on a current state (first order) or multiple previous states (2nd, 3rd, ... n-order). The Markov Chain is a broadly used method in algorithmic music to generate new material (melodies, rhythms, but even words) based on a set of provided material, but can also be used in linguistics to analyze word or sentence structures. The first argument is the list to analyze, the second argument is the nth-order (default = 2). In theory, longer chains preserve the original structure of the model, but won't generate as diverse outputs. The output is a 

**type: `translator`**

**arguments**
- `List` -> List to analyze into transition table
- `Int+` -> Order of the markov-chain (optional, default=2)
- `return` -> Transition table as a string

```js
list melody [ 0 0 7 7 9 9 7 5 5 4 4 2 2 0 ]
list model markovTrain(melody 2)
```

Alias: `markov`

### markovChain

Generate a list of values of n-length based on a markov transition table (a model) that was trained with `markovTrain()`. The first argument determines the output length, the second input is the reference to the markov model. The resulting output is based on the probabilities that are captured within the transition table. This means the output can also be directed by the `randomSeed`.

**type: `generator`**

```js
list melody [ 0 0 7 7 9 9 7 5 5 4 4 2 2 0 ]
list model markovTrain(melody 3)

set randomSeed 3141

list markovMelody markovChain(16 model)
//=> [9 7 7 5 5 4 4 2 2 0 0 5 4 4 2 2]
```

## Transform Functions

The transform list-functions are functions that take one or multiple lists as input and transform them based on a procedure. The output is again a list with the result of the process.

### clone

Duplicate a list with an offset added to every value.

**type: `transformer`**

**arguments**
- `IntList` -> List to clone
- `Int, Int2, ... Int-n` -> amount of clones with integer offset

```js
list notes [0 3 7]
list melody clone(notes 0 12 7 -7)
// => [0 3 7 12 15 19 7 10 14 -7 -4 0]
```

### join

Join lists into one list. Using multiple lists as arguments is possible.

**type: `transformer`**

**arguments**
- `List-0, List-1, ..., List-n` -> List to combine

```js
list partA [0 3 7]
list partB [24 19 12]
list partC [-7 -3 -5]
list phrase join(partA partB partC)
// => [0 3 7 24 19 12 -7 -5 -3]

list partD [kick hat snare hat]
list partE [hat hat hat snare]
list sequence join(partD partE)
// => [kick hat snare hat hat hat hat snare]
```

Alias: `combine`

### copy

Copy a list a certain amount of times.

**type: `transformer`**

**arguments**
- `List` -> List to duplicate
- `Int+` -> amount of duplicates (optional, default=2)

```js
list notes [0 3 7]
list phrase copy(notes 4)
// => [0 3 7 0 3 7 0 3 7 0 3 7]
```

Alias: `duplicate`

### pad 

Pad a list with zeroes (or any other value) up to the length specified. The padding value can optionally be changed and the shift argument rotates the list n-steps left or right (negative). This method is similar to `every()` except arguments are not specified in musical bars/divisions.

**type: `transformer`**

**arguments**
- `NumberList` -> List to use every n-bars
- `Int` -> output length of list (optional, default=16)
- `Value` -> padding value for the added items (optional, default=0)
- `Number` -> shift in steps (optional, default=0)

```js 
list pad2 pad(pad1 9)
// [ 3 7 11 12 0 0 0 0 0]

list pad3 pad([c f g] 11 - 4)
// [ - - - - c f g - - - - ]
```

### every

Add zeroes to a list with a number sequence. The division determines the amount of values per bar. The total length = bars * div. This function is very useful for rhythms that must occur once in a while, but can also be use for melodic phrases or other things.

**type: `transformer`**

**arguments**
- `IntList` -> List to use every n-bars
- `Int` -> amount of bars (optional, default=4)
- `Int` -> amount of values per bar (optional, default=16)

```js
list rhythm [1 0 1 1 0 1 1]
list sequence every(rhythm 2 8)
// => [1 0 1 1 0 1 1 0 0 0 0 0 0 0 0 0]

list melody [12 19 24 27 24]
list phrase every(melody 2 8)
// => [12 19 24 27 24 0 0 0 0 0 0 0 0 0 0 0]
```

### flat

Flatten a multidimensional list. Optionally set the depth for the flattening with the second argument. Flattening a list removes the multi-dimensionality of a list and outputs only a 1D-list.

**type: `transformer`**

**arguments**
- `List` -> list to flatten
- `Number` -> depth of flatten (default=Infinity)

```js 
list fl1 flat([1 [2 3 [ 4 ] 5] 6])
//=> [ 1 2 3 4 5 6 ] 
```

### invert

Invert a list of values by mapping the lowest value to the highest value and vice versa, flipping everything in between.  Second optional argument sets the center to flip values around. Third optional argument sets a range to flip values against.

**type: `transformer`**

**arguments**
- `IntList` -> list to invert
- `Int` -> invert center / lower range (optional)
- `Int` -> upper range (optional)

```js
list notes [0 3 7 12]
list inv1 invert(notes)
// => [12 9 5 0]

list inv2 invert(notes 5)
// => [10 7 3 -2]

list inv3 invert(notes 3 10)
// => [13 10 6 1]
```

Alias: `inverse`, `flip`, `inv`

### lace

Interleave, lace, zip two or more lists. The output length of the list is always the length of the longest input list.

**type: `transformer`**

**arguments**
- `List0, List1, ..., List-n` -> Lists to interleave

```js
list partA [0 3 7 5 0]
list partB [12 19 15]
list partC [24 22]
list melody lace(partA partB)
// => [0 12 24 3 19 22 7 15 5 0]
```

Alias: `zip`

### lookup

Build a list of items based on another list of indices. The values are wrapped within the length of the lookup list.

**type: `transformer`**

**arguments**
- `NumberList` -> List with indeces to lookup
- `List` -> List with values returned from lookup
- `List` -> Looked up values

```js
list items [c e f g]
list indices [0 1 1 2 0 2 2 1]

// first list is the index, second list are the items to lookup
list notes lookup(indices items)
//=> [ c e e f c f f e ]

// indices are wrapped between listlength
list indices [8 -5 144 55]
list notes lookup(indices items)
//=> [ g e c e ]
```

Alias: `get`

### merge

Merge all values of two lists on the same index into a 2-dimensional list. Preserves the length of longest input list.

**type: `transformer`**

**arguments**
- `List0, List1, ..., List-n` -> Lists to merge

```js
list partA [0 3 7 5 0]
list partB [12 19 15] 
list merged merge(partA partB)
// => [[0 12] [3 19] [7 15] 5 0]
```
Alias: `mix`

### palindrome

Reverse a list and concatenate it to the input list, creating a palindrome of the list. A second argument `1` will remove the duplicates halfway through and at the end.

**type: `transformer`**

**arguments**
- `List` -> list to make palindrome of
- `Bool` -> no-double flag (optional, default=0)

```js
list notes [0 3 7 12]
list melodyA palindrome(notes)
// => [0 3 7 12 12 7 3 0]

list melodyB palindrome(notes 1)
// => [0 3 7 12 7 3]
```

Alias: `palin`, `mirror`

### repeat

Repeats separate values in a list a certain amount of times. The repeat-er argument can be a list that will be iterated for every value in the to-repeat list.

**type: `transformer`**

**arguments**
- `List` -> List to repeat
- `Int+/Int(List)` -> amount of repeats per value

```js
list notes [0 3 7]
list phrase repeat(notes 4)
// => [0 0 0 0 3 3 3 3 7 7 7 7]

list repeats [2 5 3]
list phraseB repeat(notes repeats)
// => [0 0 3 3 3 3 3 7 7 7]

// also works with strings
list samples [kick snare hat]
list beats repeat(samples repeats)
// => [kick kick snare snare snare snare hat hat hat]
```

### reverse

Reverse the order of items in a list.

**type: `transformer`**

**arguments**
- `List` -> List to reverse

```js
list melody [0 3 7 5]
list rev reverse(melody)
// => [5 7 3 0]
```

Alias: `rev`

### rotate

Rotate the position of items in a list. positive numbers = direction right, negative numbers = direction left

**type: `transformer`**

**arguments**
- `List` -> List to rotate
- `Int` -> Steps to rotate

```js
list melody [0 3 7 5 7 9 12]
list left rotate(melody -2)
// => [7 5 7 9 12 0 3]

list right rotate(melody 2)
// => [9 12 0 3 7 5 7]
```

Alias: `rot`

### sort

Sort a list of numbers or strings. sorts ascending or descending in numerical and alphabetical order.

**type: `transformer`**

**arguments**
- `List` -> List to sort
- `Int` -> sort direction (positive value is ascending, default=1)

```js
list srt1 sort([-5 7 0 3 12 -7 9] -1)
//=> [ 12 9 7 3 0 -5 -7 ] 

// works with strings (but alphabetical order!)
list srt2 sort([e4 g3 c4 f3 b5])
//=> [ b5 c4 e4 f3 g3 ]
```

### slice

Slice a list in one or multiple parts. Slice lengths are determined by the second argument list. Outputs a list of lists of the result

**type: `transformer`**

**arguments**
- `List` -> list to slice in parts
- `Number(List)` -> slice lengths to slice list into
- `Bool` -> output rest flag (optional, default=false)

```js
list sl1 slice(spread(8) [3 2])
//=> [ [ 0 1 2 ] [ 3 4 ] [ 5 6 7 ] ] 

// set rest-flag to false removes last slice 
list sl2 slice(spread(24) [3 2 -1 5] 0)
//=> [ [ 0 1 2 ] [ 3 4 ] [ 5 6 7 8 9 ] ] 
```

### split

Similar to slice in that it also splits a list, except that slice recursively splits until the list is completely empty. If a list is provided as split sizes it will iterate the lengths.

**type: `transformer`**

**arguments**
- `List` -> list to split in parts
- `Number(List)` -> split lengths to split list into

```js
list sp1 split(spread(12) 3)
//=> [ [ 0 1 2 ] [ 3 4 5 ] [ 6 7 8 ] [ 9 10 11 ] ] 

list sp2 split(spread(12) [3 2 -1])
//=> [ [ 0 1 2 ] [ 3 4 ] [ 5 6 7 ] [ 8 9 ] [ 10 11 ] ] 
```

### cut

Cut the beginning of a list and return. Slice length is determined by the second argument number. Outputs a list of the result.

**type: `transformer`**

**arguments**
- `List` -> list to slice in parts
- `Number` -> slice length to cut list into
- `Bool` -> output rest flag (optional, default=false)

```js
list ct1 cut(spread(8) 3)
//=> [ 0 1 2 ]
```

### spray

"Spray" the values of one list on the places of values of another list if that value is greater than 0. Wraps input list if more places must be set then length of the list. This function is interesting to use for melodic material that needs some rhythmic aspect too.

**type: `transformer`**

**arguments**
- `List` -> List to spray
- `List` -> Positions to spray on

```js
list notes [12 19 15 17]
list places [1 0 0 1 1 0 1 0 1 0]
list sprayed spray(notes places)
// => [12 0 0 19 15 0 17 0 12 0]
```

### stretch (stretchFloat)

Stretch (or shrink) a list to a specified length, linearly interpolating between all values within the list. Minimum output length is 2 (which will be the outmost values from the list). Third optional argument sets the interpolation mode. Available modes are `none` (or `null`, `false`) and `linear`.

**type: `transformer`**

**arguments**

```js
list notes [0 12 3 7]
list str stretch(notes 15)
//=> [ 0 2 5 7 10 11 9 7 5 3 3 4 5 6 7 ] 

//   12.00 ┼  ╭╮      
//    9.60 ┤  │╰╮     
//    7.20 ┤ ╭╯ │   ╭ 
//    4.80 ┤╭╯  ╰╮╭─╯ 
//    2.40 ┤│    ╰╯   
//    0.00 ┼╯ 
```
```js
// use stretchFloat if you want the result to have more precision
list str stretchFloat(notes 15)
```

Alias: `stretchF`

### unique

Filter duplicate items from a list. It does not account for 2-dimensional lists in the list.

**type: `transformer`**

**arguments**
- `List` -> List to filter

```js
list notes [0 5 7 3 7 7 0 12 5]
list thinned unique(notes)
// => [0 5 7 3 12]
```

Alias: `thin`

## Utility Functions

The utility list-functions are a set of functions that are mainly helpful in combination with other lists. Like performing basic arithmetic such as adding, subtracting or performing some other functionality like wrapping values between a range or mapping the input list to an output range.

### add

Add a single value to a list or add two lists sequentially.

**type: `transformer`**

**arguments**
- Number(List) -> Input number or list on left-hand side of equation
- Number(List) -> Input number or list on right-hand side of equation

```js
list vals add([1 2 3 4] [1 2 3])
//=> [ 2 4 6 5 ] 

// Works with n-dimensional lists
list vals add([1 [2 3]] [10 [20 30 40]])
//=> [ 11 [ 22 33 42 ] ] 
```

### subtract

Subtract a single value from a list or subtract two lists sequentially.

**type: `transformer`**

**arguments**
- Number(List) -> Input number or list on left-hand side of equation
- Number(List) -> Input number or list on right-hand side of equation

```js
list vals subtract([1 2 3 4] [1 2 3])
//=> [ 0 0 0 3 ] 

list vals sub([1 [2 3]] [10 [20 30 40]])
//=> [ -9 [ -18 -27 -38 ] ] 
```

Alias: `sub`

### multiply

Multiply a single value to a list or multiply two lists sequentially.

**type: `transformer`**

**arguments**
- Number(List) -> Input number or list on left-hand side of equation
- Number(List) -> Input number or list on right-hand side of equation

```js
list vals multiply([1 2 3 4] [1 2 3])
//=> [ 1 4 9 4 ] 

list vals mul([1 [2 3]] [10 [20 30 40]])
//=> [ 10 [ 40 90 80 ] ] 
```

Alias: `mul`

### divide

Divide a single value from a list or multiply two lists sequentially.

**type: `transformer`**

**arguments**
- Number(List) -> Input number or list on left-hand side of equation
- Number(List) -> Input number or list on right-hand side of equation

```js
list vals divide([1 2 3 4] [1 2 3])
//=> [ 1 1 1 4 ] 

list vals div([1 [2 3]] [10 [20 30 40]])
//=> [ 0.1 [ 0.1 0.1 0.05 ] ] 
```

Alias: `div`

### mod

Return the remainder after division. Also works in the negative direction, so the wrapping starts at 0.

**type: `transformer`**

**arguments**
- `Int(List)` -> Input value
- `Int(List)` -> Divisor (optional, default=12)
- `Int(List)` -> Remainder after division

```js
list vals mod([-2 [4 [3 7]]] 5)
//=> [ 3 [ 4 [ 3 2 ] ] ]
```

### clip

Constrain values from a list within a specified low and high range.

**type: `transformer`**

**arguments**
- `List` -> List to constrain
- `Number` -> Low value (optional default=12)
- `Number` -> High value (optional default=0)

```js
list cn1 constrain([0 [1 [2 3]] [4 5] 6] 2 5)
//=> [ 2 [ 2 [ 2 3 ] ] [ 4 5 ] 5 ] 

list cn2 constrain(cosine(30 1) 5 9)
//=>  9.00 ┼─────╮                   ╭─── 
//    8.20 ┤     │                  ╭╯    
//    7.40 ┤     ╰╮                ╭╯     
//    6.60 ┤      ╰╮              ╭╯      
//    5.80 ┤       │              │       
//    5.00 ┤       ╰──────────────╯ 

```

Alias: `constrain`

### wrap

Wrap values from a list within a specified lower and upper range.

**type: `transformer`**

**arguments**
- `List` -> List to wrap
- `Number` -> Lower value (optional, default=12)
- `Number` -> Upper value (optional, default=0)

```js
list wr1 wrap([0 [1 [2 3]] [4 5] 6] 2 5)
//=> [ 3 [ 4 [ 2 3 ] ] [ 4 2 ] 3 ] 

list wr2 wrap(spread(30) 2 8)
//=>  7.00 ┤╭╮    ╭╮    ╭╮    ╭╮    ╭╮    
//    6.00 ┼╯│   ╭╯│   ╭╯│   ╭╯│   ╭╯│    
//    5.00 ┤ │  ╭╯ │  ╭╯ │  ╭╯ │  ╭╯ │  ╭ 
//    4.00 ┤ │ ╭╯  │ ╭╯  │ ╭╯  │ ╭╯  │ ╭╯ 
//    3.00 ┤ │╭╯   │╭╯   │╭╯   │╭╯   │╭╯  
//    2.00 ┤ ╰╯    ╰╯    ╰╯    ╰╯    ╰╯    
```

### fold

Fold values from a list within a specified lower and upper range. Folding "bounces" the number back when it reaches the limit, instead of wrapping back to the other side or clipping.

**type: `transformer`**

**arguments**
- `List` -> List to fold
- `Number` -> Low value (optional, default=12)
- `Number` -> High value (optional, default=0)

```js
list fl1 fold([0 [1 [2 3]] [4 5] 6] 2 5)
//=> [ 4 [ 3 [ 2 3 ] ] [ 4 5 ] 4 ]

list fl2 fold(spreadFloat(30 -9 13) 0 1)
//=>  1.00 ┼╮         ╭╮      ╭╮          
//    0.80 ┤│ ╭╮   ╭╮ ││ ╭╮╭╮ ││ ╭╮   ╭╮  
//    0.60 ┤│ ││╭─╮││ ││╭╯││╰╮││ ││╭─╮││  
//    0.40 ┤│╭╯││ ││╰─╯││ ││ ││╰─╯││ ││╰╮ 
//    0.20 ┤╰╯ ││ ╰╯   ╰╯ ││ ╰╯   ╰╯ ││ ╰ 
//    0.00 ┤   ╰╯         ╰╯         ╰╯    
```

### map

Rescale values in a list from a specified input range to a specified low and high output range.

**type: `transformer`**

**arguments**
- `List` -> List to wrap
- `Number` -> Low value (optional, default=0)
- `Number` -> High value (optional, default=1)
- `Number` -> Low value (optional, default=0)
- `Number` -> High value (optional, default=1)
- `Number` -> Exponent value (optional, default=1)

```js
list sc1 scale([0 [1 [2 3]] 4] 0 4 -1 1)
//=> [ -1 [ -0.5 [ 0 0.5 ] ] 1 ] 
```

### normalize

Normalize all the values in a list between `0` and `1`. The highest value will be 1, the lowest value will be 0.

**type: `transformer`**

**arguments**
- `Number(List)` -> Input list to normalize

```js
list vals normalize([0 1 2 3 4])
//=> [ 0 0.25 0.5 0.75 1 ]

// works with n-dimensional lists
list vals normalize([5 [12 [4 17]] 3 1])
//=> [ 0.25 [ 0.6875 [ 0.1875 1 ] ] 0.125 0 ]  
```

Alias: `norm`

### equals

Compare two lists for equals (`==`).

**type: `transformer`**

**arguments**
- Number(List) -> Input number or list on left-hand side of equation
- Number(List) -> Input number or list on right-hand side of equation

```js
list vals eq([0 10 20 30] [20 0 30 30])
//=> [0 0 0 1]
```

Alias: `eq`

### notEquals

Compare two list for not equals (`!=`).

**type: `transformer`**

**arguments**
- Number(List) -> Input number or list on left-hand side of equation
- Number(List) -> Input number or list on right-hand side of equation

```js
list vals neq([0 10 20 30] [20 0 30 30])
//=> [1 1 1 0]
```

Alias: `neq`

### greater

Compare two lists for left values are greater than right (`>`).

**type: `transformer`**

**arguments**
- Number(List) -> Input number or list on left-hand side of equation
- Number(List) -> Input number or list on right-hand side of equation

```js
list vals gt([0 10 20 30] [20 0 30 30])
//=> [0 1 0 0]
```

Alias: `gt`

### greaterEquals

Compare two lists for left values are greater than or equal to right (`>=`).

**type: `transformer`**

**arguments**
- Number(List) -> Input number or list on left-hand side of equation
- Number(List) -> Input number or list on right-hand side of equation

```js
list vals gte([0 10 20 30] [20 0 30 30])
//=> [0 1 0 1]
```

Alias: `gte`

### less

Compare two lists for left values are less than right (`<`).

**type: `transformer`**

**arguments**
- Number(List) -> Input number or list on left-hand side of equation
- Number(List) -> Input number or list on right-hand side of equation

```js
list vals lt([0 10 20 30] [20 0 30 30])
//=> [1 0 1 0]
```

Alias: `lt`

### lessEquals

Compare two lists for left values less than or equal to right (`<=`).

**type: `transformer`**

**arguments**
- Number(List) -> Input number or list on left-hand side of equation
- Number(List) -> Input number or list on right-hand side of equation

```js
list vals lte([0 10 20 30] [20 0 30 30])
//=> [1 0 1 1]
```

Alias: `lte`

## size

Return the length/size of a list as a `number` if the argument is a list. If the argument is a number return the number as a positive integer greater than 0. If the argument is not a number return 1. The method can be used to input lists as arguments for other functions.

**type: `analyser`**

**arguments**
- `Value(List)` -> input list to check size of

```js
size([5 7 3 2 9])
//=> 5

size(8)
//=> 8

size(3.1415)
//=> 3

size('foo')
//=> 1

```

Alias: `length`

## sum

Return the sum of all values in a list as a `number`. The function ignores all non-numeric values. Works recursively with n-dimensional lists.

**type: `analyser`**

**arguments**
- `Value(List)` -> input list to check size of

```js
sum([1 2 3 4])
//=> 10 

sum([10 'foo' 11 'bar' 22])
//=> 43 

sum([1 2 [3 4 [5 6] 7] 8])
//=> 36
```

## Translate Functions

### Conversion between pitch units

Convert easily between relative-semitones, midinotes, notenames, chord-numerals, chordnames and frequencies with the functions below. Thankfully using the amazing `Tonal.js` package by `@danigb` for various functions.

```js
// Convert list or Int as midi-number to midi-notenames
midiToNote([60 [63 67 69] [57 65]])
//=> [ c4 [ eb4 g4 a4 ] [ a3 f4 ] ] 
// Alias: mton

// Convert midi-pitches to frequency (A4 = 440 Hz)
midiToFreq([60 [63 67 69] [57 65]])
//=> [ 261.63 [ 311.13 391.995 440 ] [ 220 349.23 ] ] 
// Alias: mtof

// Convert list of String as midi-notenames to midi-pitch
noteToMidi([c4 [eb4 g4 a4] [a3 f4]])
//=> [ 60 [ 63 67 69 ] [ 57 65 ] ] 
// Alias: ntom

// Convert midi-notenames to frequency (A4 = 440 Hz)
noteToFreq([c4 [eb4 g4 a4] [a3 f4]])
//=> [ 261.63 [ 311.13 391.995 440 ] [ 220 349.23 ] ] 
// Alias: ntof

// Convert frequency to nearest midi note
freqToMidi([ 261 [ 311 391 440 ] [ 220 349 ] ])
//=> [ 60 [ 63 67 69 ] [ 57 65 ] ] 
// Alias: ftom

// Set detune flag to true to get floating midi output for pitchbend
freqToMidi([ 261 [ 311 391 440 ] [ 220 349 ] ] true)
//=> [ 59.959 [ 62.993 66.956 69 ] [ 57 64.989 ]] 

// Convert frequency to nearest midi note name
freqToNote([ 261 [ 311 391 440 ] [ 220 349 ] ])
//=> [ c4 [ eb4 g4 a4 ] [ a3 f4 ] ] 
// Alias: fton

// Convert relative semitone values to midi-numbers
// specify the octave as second argument (default = C4 = 4 => 48)
relativeToMidi([[-12 -9 -5] [0 4 7] [2 5 9]] c4)
//=> [ [ 48 51 55 ] [ 60 64 67 ] [ 62 65 69 ] ]
// Alias: rtom

// Convert relative semitone values to frequency (A4 = 440 Hz)
// specify the octave as second argument (default = C4 = 4 => 48)
relativeToFreq([[-12 -9 -5] [0 4 7] [2 5 9]] c4)
//=> [ [ 130.81 155.56 196 ] [ 261.62 329.63 392 ] [ 293.66 349.23 440 ] ]
// Alias: rtof

// Convert a chroma value to a relative note number
// Can also include octave offsets with -/+ case-insensitive
chromaToRelative([c [eb G Ab] [a+ f-]]) 
//=> [ 0 [ 3 7 8 ] [ 21 -7 ] ]
// Alias: ctor

// Convert ratio to relative cents
ratioToCent([2/1 [3/2 [4/3 5/4]] 9/8])
//=> [ 1200 [ 701.95 [ 498.04 386.31 ] ] 203.91 ] 
// Alias: rtoc

// Convert a chord progression from roman numerals to semitones
chordsFromNumerals([I IIm IVsus2 V7 VIm9])
// => [[ 0 4 7 ]
//     [ 2 5 9 ]
//     [ 5 7 0 ]
//     [ 7 11 2 5 ]
//     [ 9 0 4 7 11 ]] 
// Alias: chords

// Convert a chord progression from chordnames to semitones
chordsFromNames([C Dm Fsus2 G7 Am9])
//=> [[ 0 4 7 ]
//    [ 2 5 9 ]
//    [ 5 7 0 ]
//    [ 7 11 2 5 ]
//    [ 9 0 4 7 11 ]] 
```

### Conversion between time units

Convert between rhythmic notation such as divisions or ratios and milliseconds based on the set tempo in the global settings.

#### divisionToMs

Convert beat division strings or beat ratio floats to milliseconds using BPM from the global settings. Optional second argument sets BPM and ignores global setting.

**arguments**
- `List` -> beat division or ratio list
- `Number` -> set the BPM (optional, default = global tempo)

```js
set tempo 120
list divs [1/4 1/2 1/8 3/16 1/4 1/6 2]
list ms1 divisionToMs(divs)
// => [500 1000 250 375 500 333.33 4000]
list ms2 divisionToMs(divs 100)
// => [600 1200 300 450 600 400 4800]

list ratios [0.25 0.125 0.1875 0.25 0.16667 2]
list ms3 divisionToMs(ratios)
// => [500 1000 250 375 500 333.33 4000]
```

Alias: `dtoms`

Other functions:

```js
// convert beat division strings to beat ratio floats
divisionToRatio([1/4 1/8 3/16 1/4 1/6 2])
//=> [ 0.25 0.125 0.1875 0.25 0.167 2 ] 
// Alias: print dtor

// convert beat ratio floats to milliseconds
ratioToMs([0.25 [0.125 [0.1875 0.25]] 0.1667 2] 100)
//=> [ 600 [ 300 [ 450 600 ] ] 400.08 4800 ] 
// Alias: print rtoms
```

### Working with fixed scale and root

Convert notes to a fixed scale based on the global settings.

```js
// Set the global scale used with toScale() and toMidi() functions
set scale minor a

// Set only the root for the global scale
set root c

// Return all the available scale names
print scaleNames()
//=> [ chromatic major etc... ] 

// Map relative numbers to a specified scale class (excluding root)
toScale([0 1 2 3 4 5 6 7 8 9 10 11])
//=> [0 0 2 3 3 5 5 7 8 8 10 10]

// Works with negative relative values
toScale([8 13 -1 20 -6 21 -4 12])
//=> [8 12 -2 20 -7 20 -4 12]

// Preserves floating point for detune/microtonality
toScale([0 4.1 6.5 7.1 9.25])
//=> [0 3.1 5.5 7.1 8.25] 

// Optionally add a scale name and root to use a scale other 
// than the global one
toScale([0 1 2 3 4 5 6 7 8 9 10 11] major)
//=> [ 0 0 2 2 4 5 5 7 7 9 9 11 ]

toScale([0 1 2 3 4 5 6 7 8 9 10 11] minor eb)
//=> [ 3 3 5 6 6 8 8 10 11 11 13 13 ]
```

### textToCode

Convert a string or list of strings to their ASCII code integer representation. The ASCII code is the American Standard Code for Information Interchange. In this code every unique character/symbol/number is represented by a whole number (integer). For example `a=97`, but `A=65` and `SPACE=32`.

**type: `translator`**

**arguments**
- `String(List)` -> input to convert to ASCII 

```js
// single string input
textCode('bach cage')
//=> [ 98 97 99 104 32 99 97 103 101 ]

// multiple strings in a list results in a 2D list output
textCode([bach cage])
//=> [ [ 98 97 99 104 ] [ 99 97 103 101 ] ]
```

Alias: `textCode`, `ttoc`