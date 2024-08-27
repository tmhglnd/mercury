# List Methods

Mercury uses the [`total-serialism`](https://www.npmjs.com/package/total-serialism) Node Package to generate and transform numbersequences that are used for melodies, rhythms, parameters and basically anything that can be sequenced in the environment. These numbersequences were originally refered to as `ring`'s, because the sequence (list) is a circular array, but now the keyword `list` can also be used for simplicity. Every step an instrument takes in the sequencer based on the time-interval from `time()` a counter increments (eg 0, 1, 2, 3...n) and uses that as an index to look up the value in the list. When the index is higher then the amount of values in the list it will return to the beginning of the list, hence a circular list or `ring`. 

```
list <unique-list-name> [ value0 v1 v2 ... v-n ] 
```

example

```java
list someNumbers [0 10 20 30]
list someFloats [1.618 3.1415]
list twoDimensional [0 1 [2 3] 4 [5 6 7]]
list someSamples [kick_909 hat_909 snare_909 hat_909]
list count spread(10)
list rands random(5 0 20)
```

**Note:** Some variable names are not allowed because they are part of the built-in namespace for datastructures. These are: ` set, new, list, bang, int, float, mode, zlclear, zlmaxsize`. Using names that are also a function is not advised (eg. `gain`, `shape`, `time` etc.)

[`total-serialism`](https://www.npmjs.com/package/total-serialism) is a set of methods used for procedurally generating and transforming number sequences. This library is mainly designed with algorithmic composition of music in mind, but can surely be useful for other purposes that involve generating and manipulating lists and numbers. The library is a result of my research in algorithmic composition, livecoding and electronic music and was first prototyped with Max/MSP in the Mercury livecoding environment.

# Table of Content

- [Param Glossary](#param-glossary)
- [Generative Methods](#generative-methods)
	- [spread / spreadFloat](#spread-spreadfloat)
	- [spreadInclusive / spreadInclusiveFloat](#spreadinclusive-spreadinclusivefloat)
	- [fill](#fill)
	- [sine / cosine](#sine-cosine)
	- [sineFloat / cosineFloat](#sinefloat-cosinefloat)
	- [saw / sawFloat](#saw-sawfloat)
	- [square / squareFloat](#square-squarefloat)
	- [binaryBeat](#binaryBeat)
	- [spacingBeat](#spacingBeat)
- [Algorithmic Methods](#algorithmic-methods)
	- [euclidean](#euclidean)
	- [hexBeat](#hexbeat)
	- [fibonacci](#fibonacci)
	- [pisano](#pisano)
	- [pell](#pell)
	- [lucas](#lucas)
	- [threeFibonacci](#threefibonacci)
- [Stochastic Methods](#stochastic-methods)
	- [randomSeed](#randomseed)
	- [random](#random)
	- [randomFloat](#randomfloat)
	- [drunk](#drunk)
	- [drunkFloat](#drunkfloat)
	- [urn](#urn)
	- [coin](#coin)
	- [dice](#dice)
	- [clave](#clave)
	- [twelveTone](#twelvetone)
	- [choose](#choose)
	- [pick](#pick)
	- [shuffle](#shuffle)
	- [expand](#expand)
	- [markovTrain](#markovtrain) *MercuryPlayground Only*
	- [markovChain](#markovchain) *MercuryPlayground Only*
- [Transformative Methods](#transformative-methods)
	- [clone](#clone)
	- [join](#join)
	- [copy](#copy)
	- [pad](#pad)
	- [every](#every)
	- [flat](#flat)
	- [invert](#invert)
	- [lace](#lace)
	- [lookup](#lookup)
	- [merge](#merge)
	- [palindrome](#palindrome)
	- [repeat](#repeat)
	- [reverse](#reverse)
	- [rotate](#rotate)
	- [slice](#slice)
	- [split](#split)
	- [cut](#cut)
	- [spray](#spray)
	- [stretch](#stretch)
	- [unique](#unique)
- [Utility Methods](#utility-methods)
	- [wrap](#wrap)
	- [clip](#clip)
	- [fold](#fold)
	- [map](#map)
	- [mod](#mod)
	- [add](#add)
	- [subtract](#subtract)
	- [multiply](#multiply)
	- [divide](#divide)
	- [normalize](#normalize)
	- [equals](#equals) *MercuryPlayground Only*
	- [notEquals](#notequals) *MercuryPlayground Only*
	- [greater](#greater) *MercuryPlayground Only*
	- [greaterEquals](#greaterequals) *MercuryPlayground Only*
	- [less](#less) *MercuryPlayground Only*
	- [lessEquals](#lessequals) *MercuryPlayground Only*
- [Translate Methods](#translate-methods)
	- midiToNote
	- midiToFreq
	- noteToMidi
	- noteToFreq
	- freqToMidi
	- freqToMidi
	- freqToNote
	- relativeToMidi
	- relativeToFreq
	- chromaToRelative 
	- ratioToCent
	- chordsFromNumerals
	- chordsFromNames
	- [divisionToMs](#divisiontoms)
	- divisionToRatio
	- ratioToMs
	- scaleNames
	- toScale
	- [textCode](#textCode)

# Param Glossary

**Values**

- `Value` -> Any Number or Name
	- `Number` -> Int+, Int or Float
		- `Bool` -> 0 or 1 (true or false)
		- `Int+` -> A positive whole number, bigger than 0
		- `Int` -> A whole number, negative or positive, including 0
		- `Float` -> A floating-point number, negative or positive, including 0
	- `Name` -> A combination of letter-characters, may include capital letter, underscores and digits

**Lists**

- `List` -> A list with `Value`'s
	- `NumberList` -> A list with `Number`'s
		- `IntList+` -> A list with `Int+`'s
		- `IntList` -> A list with `Int`'s
		- `FloatList` -> A list with `Float`'s
	- `NameList` -> A list with `Name`'s

# Generative Methods

## spread spreadFloat

Generate a list of n-length of evenly spaced values between a starting number up untill (but excluding) the 3th argument. Flipping the low and high values results in a descending list.

**arguments**
- {Int+} -> Length of list
- {Int/Float} -> Low value
- {Int/Float} -> High value (excluded)

```java
list spr1 spread(5 0 12)
// => [0 2 4 7 9]

list spr2 spreadFloat(5 -1 1)
// => [-1 -0.6 -0.2 0.2 0.6]

list spr3 spreadF(5 0 2)
// => [0 0.4 0.8 1.2 1.6]

list spr4 spread(5 12 0)
// => [9 7 4 2 0]
```

## spreadInclusive spreadInclusiveFloat

Generate a list of n-length of evenly spaced values between a starting number up to (and including) the 3th argument. Flipping the low and high values results in a descending list.

**arguments**
- {Int+} -> Length of list
- {Number} -> Low value
- {Number} -> High value (included)

```java
list spi1 spreadInclusive(5 0 12)
// => [0 3 6 9 12]

list spi2 spreadInclusiveFloat(5 -1 1)
// => [-1 -0.5 0 0.5 1]

list spi3 spreadInclusiveF(5 0 2)
// => [0 0.5 1 1.5 2]

list spi4 spreadInclusive(5 12 0)
// => [12 9 6 3 0]
```

## fill

Fill a list with values. Arguments are in pairs. Every pair consists of `<value, amount>` The value is repeated n-amount of times in the list.

**arguments**
- {Value} -> value to duplicate
- {Int+} -> amount of duplicates

```java
list fll1 fill(10 2 15 3 20 4)
// => [10 10 15 15 15 20 20 20 20]

list fll2 fill(kick_min 2 hat_min 3)
// => [kick_min kick_min hat_min hat_min hat_min]
```

## sine cosine

Generate a list with n-periods of a (co)sine function. Optional last arguments set lo and hi range. Only setting first range argument sets the low-range to 0.

**arguments**
- {Int+} -> Length of list
- {Number} -> Periods of (co)sine-wave (optional, default=1)
- {Number} -> Low range of values (optional, default=0)
- {Number} -> High range of values (optional, default=12)
- {Number} -> Phase offset (optional, default=0)

```java
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

```java
list cos1 cosine(10)
// => [12 10 7 4 1 0 1 4 7 10]

list cos2 cosine(10 1 -12 12)
// => [12 9 3 -3 -9 -12 -9 -3 3 9]

list cos3 cosine(10 2 0 5)
// => [5 3 0 0 3 4 3 0 0 3]
```

## sineFloat cosineFloat

Generate a list with n-periods of a (co)sine function. Optional last arguments set lo and hi range. Only setting first range argument sets the low-range to 0.

**arguments**
- {Int+} -> Length of list
- {Number} -> Periods of (co)sine-wave (optional, default=1)
- {Number} -> Low range of values (optional, default=-1)
- {Number} -> High range of values (optional, default=1)
- {Number} -> Phase offset (optional, default=0)

```java
// generate 16 floats with 1 period of a cosine function
list cos4 cosineFloat(8)
//  1.00 ┼╮               
//  0.60 ┤╰─╮          ╭─ 
//  0.20 ┼  ╰╮        ╭╯  
// -0.20 ┤   ╰╮      ╭╯   
// -0.60 ┤    ╰╮    ╭╯    
// -1.00 ┤     ╰────╯      

// frequency modulation of the period argument with another list
list sin5 sineFloat(40 sineFloat(40 4 1 5))
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
Alias: `sinF()`, `cosF()`

## saw sawFloat

Generate a list with n-periods of a saw/phasor function. Optional last arguments set lo and hi range and phase offset. Only setting first range argument sets the low-range to 0

**arguments**
- {Int} -> Length of output list (resolution)
- {Number/List} -> Periods of the wave (option, default=1)
- {Number} -> Low range of values (optional, default=-1) 
- {Number} -> High range of values (optional, default=1)
- {Number} -> Phase offset (optional, default=0)

```java
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
Alias: `sawF()`

## square squareFloat

Generate a list with n-periods of a square/pulse wave function. Optional last arguments set lo and hi range and pulse width. Only setting first range argument sets the low-range to 0.

**arguments**
- {Int} -> Length of output list (resolution)
- {Number/List} -> Periods of the wave (option, default=1)
- {Number} -> Low range of values (optional, default=0) 
- {Number} -> High range of values (optional, default=1)
- {Number} -> Pulse width (optional, default=0.5)

```java
list sqr1 square(30 4 0 1 0.2)
//=>  1.00 ┼─╮     ╭─╮    ╭─╮     ╭╮           
//    0.00 ┤ ╰─────╯ ╰────╯ ╰─────╯╰─────  
```
Alias: `rect()`

```java
// Frequency Modulation with Gen.sin
list sqr2 squareFloat(30 sinF(30 2 1 5))
//=>  1.00 ┼───╮     ╭──╮╭──╮ ╭─╮  ╭─╮ ╭─ 
//    0.80 ┤   │     │  ││  │ │ │  │ │ │  
//    0.60 ┤   │     │  ││  │ │ │  │ │ │  
//    0.40 ┤   │     │  ││  │ │ │  │ │ │  
//    0.20 ┤   │     │  ││  │ │ │  │ │ │  
//    0.00 ┤   ╰─────╯  ╰╯  ╰─╯ ╰──╯ ╰─╯   
```
Alias: `squareF()`, `rectFloat()`, `rectF()`

## binaryBeat

Generate a binary rhythm from a positive integer number or an array of numbers. Returns the binary value as an array of separated 1's and 0's useful for representing rhythmical patterns.

Alias: `binary`

**arguments**
- {Int+/List} -> List of numbers to convert to binary representation

```js
// generate a binary array from a single number
list bny1 binaryBeat(358);
//=> [1 0 1 1 0 0 1 1 0]

// use an array of numbers and concatenate binary representations
list bny2 binaryBeat([4 3 5]);
//=> [1 0 0 1 1 1 0 1]

// negative values are clipped to 0
list bny3 binaryBeat([-4 4]);
//=> [0 1 0 0]
```

## spacingBeat

Generate an array of 1's and 0's based on a positive integer number or array. Every number in the array will be replaced by a 1 with a specified amount of 0's appended to it. Eg. a 2 => 1 0, a 4 => 1 0 0 0, etc. This technique is useful to generate a rhythm based on spacing length between onsets

Alias: `spacing`, `space`

**arguments**
- {Int+/List} -> List of numbers to convert to spaced rhythm

```js
// generate a rhythm based on numbered spacings
list spc1 spacingBeat(2 3 2)
//=> [1 0 1 0 0 1 0]

// also works with an array as input
list spc2 spacingBeat([4 2 0])
//=> [1 0 0 0 1 0 0]
```

# Algorithmic Methods

## euclidean

Generate a euclidean rhythm evenly spacing n-beats amongst n-steps.Inspired by Godfried Toussaints famous paper "The Euclidean Algorithm Generates Traditional Musical Rhythms".

**arguments**
- {Int+} -> length of list (optional, default=8)
- {Int+} -> beats (optional, default=4)
- {Int} -> rotate (optional, default=0)

```java
list euc1 euclidean()
// => [1 0 1 0 1 0 1 0]

list euc2 euclidean(7 5)
// => [1 1 0 1 1 0 1]

list euc3 euclidean(7 5 2)
// => [0 1 1 1 0 1 1]
```
Alias: `euclid()`

## hexBeat

Generate hexadecimal rhythms. Hexadecimal beats make use of hexadecimal values (0 - f) that are a base-16 number system. Because one digit in a base-16 number system has 16 possible values (0 - 15) these can be converted to 4 bits that therefore can be seen as groups of 4 16th notes. These hexadecimal values will then represent any permutation of 1's and 0's in a 4 bit number, where 0 = 0 0 0 0, 7 = 0 1 1 1, b = 1 0 1 1, f = 1 1 1 1 and all possible values in between.

**arguments**
- {Name} -> hexadecimal characters (0 t/m f) (optional, default=8)

```java
list hex1 hexBeat()
// => [1 0 0 0]

list hex2 hexBeat(a)
// => [1 0 1 0]

list hex3 hexBeat(f9cb)
// => [1 1 1 1 1 0 0 1 1 1 0 0 1 0 1 1]
```
Alias: `hex()`

- [Learn hex beats](https://kunstmusik.github.io/learn-hex-beats/)

## fibonacci

Generate the Fibonacci sequence `F(n) = F(n-1) + F(n-2)`. The ratio between consecutive numbers in the fibonacci sequence tends towards the Golden Ratio (1+√5)/2. 

`OEIS: A000045` (Online Encyclopedia of Integer Sequences)

**arguments**
- {Int+} -> output length of list
- {Int+} -> offset, start the sequence at nth-fibonacci number (optional, default=0)

```java
list fib1 fibonacci(10)
// => [0 1 1 2 3 5 8 13 21 34]

list fib2 fibonacci(3 10)
// => [55 89 144]
```

## pisano

Generate the Pisano period sequence. The pisano period is a result of applying a modulo operation on the Fibonacci sequence `F[n] = (F[n-1] + F[n-2]) mod a`. The length of the period differs per modulus value, but the sequence will always have a repetition.

**arguments**
- {Int+} -> modulus for pisano period (optional, default=12)
- {Int+} -> output length of list (optional, defaults to pisano-period length)

```java
list psn1 pisano()
// => [0 1 1 2 3 5 8 1 9 10 7 5 0 5 5 10 3 1 4 5 9 2 11 1]

list psn2 pisano(3)
// => [0 1 1 2 0 2 2 1]

list psn3 pisano(11)
// => [0 1 1 2 3 5 8 2 10 1]
```

## pell

Generate the Pell numbers `F(n) = 2 * F(n-1) + F(n-2)`. The ratio between consecutive numbers in the pell sequence tends towards the Silver Ratio 1 + √2.

`OEIS: A006190` (Online Encyclopedia of Integer Sequences)

**arguments**
- {Int+} -> output length of list

```java
list pll1 pell(8)
// => [0 1 2 5 12 29 70 169]
```

## lucas

Generate the Lucas numbers `F(n) = F(n-1) + F(n-2), with F0=2 and F1=1`.

`OEIS: A000032` (Online Encyclopedia of Integer Sequences)

**arguments**
- {Int+} -> output length of list

```java
list luc1 lucas(8)
// => [2 1 3 4 7 11 18 29]
```

## threeFibonacci

Generate the Tribonacci numbers `F(n) = 2 * F(n-1) + F(n-2)`. The ratio between consecutive numbers in the 3-bonacci sequence tends towards the Bronze Ratio (3 + √13) / 2.

`OEIS: A000129` (Online Encyclopedia of Integer Sequences)

**arguments**
- {Int+} -> output length of list

```java
list tfi1 threeFibonacci(8)
// => [0 1 3 10 33 109 360 1189]
```

# Stochastic Methods

## randomSeed

Set the seed for the Random Number Genrators. A value of `0` sets to unpredictable seeding. The seed can only be set **once** in the code, and the last value will take effect.

```java
set randomSeed 31415 
// ^^^^^^^^^^^ will be overwritten by 1618 before random() call
list randomValues random(10 0 100)
// ^^^^^^^^^^^ the random() will use the seed from below
set randomSeed 1618
// ^^^^^^^^^^^ 1618 overwrites 31415
```
## random

Generate a list of random integers between a specified range (excluding high value).

**arguments**
- {Int+} -> number of values to output
- {Int} -> minimum range (optional, default=0)
- {Int} -> maximum range (optional, default=2)

```java
set randomSeed 31415

list rnd1 random(5)
// => [1 0 0 1 1]
list rnd2 random(5 12)
// => [0 10 3 2 2]
list rnd3 random(5 -12 12)
// => [-2 -5 -8 -11 6]
```
Alias: `rand()`

## randomFloat

Generate a list of random floating-point values between a specified range (excluding high value).

**arguments**
- {Int+} -> number of values to output
- {Number} -> minimum range (optional, default=0)
- {Number} -> maximum range (optional, default=1)

```java
set randomSeed 31415

list rnf1 randomFloat(5)
// => [0.81 0.32 0.01 0.85 0.88]
list rnf2 randomFloat(5 0 12)
// => [0.16 10.72 3.16 262 2.34]
list rnf3 randomFloat(5 -12 12)
// => [-1.19 -4.21 -7.36 -10.31 6.82]
```
Alias: `randF()`

## drunk

Generate a list of random values but the next random value is within a limited range of the previous value generating a random "drunk" walk, also referred to as brownian motion.

**arguments**

- {Int+} -> number of values to output
- {Int} -> step range for next random value
- {Int} -> minimum range (optional, default=null)
- {Int} -> maximum range (optional, default=null)
- {Int} -> starting point (optional, default=(lo+hi)/2)
- {Bool} -> fold between lo and hi range (optional, default=true)

```java
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

## drunkFloat

Generate a list of random floating-point values but the next random value is within a limited range of the previous value generating a random "drunk" walk, also referred to as brownian motion.

**arguments**

- {Int+} -> number of values to output
- {Number} -> step range for next random value
- {Number} -> minimum range (optional, default=null)
- {Number} -> maximum range (optional, default=null)
- {Number} -> starting point (optional, default=(lo+hi)/2)
- {Bool} -> fold between lo and hi range (optional, default=true)

```java
list dr1 drunkFloat(5)
//=> [ 0.493, 0.459, 0.846, 0.963, 0.400 ] 

//  0.88 ┼╮╭╮  
//  0.76 ┤╰╯│  
//  0.63 ┤  │  
//  0.51 ┤  ╰╮ 
//  0.39 ┤   │ 
//  0.26 ┤   ╰ 
```
Alias: `drunkF()`

## urn

Generate a list of unique random integer values between a certain specified range (excluding high val). An 'urn' is filled with values and when one is picked it is removed from the urn. If the outputlist is longer then the range, the urn refills when empty. On refill it is made sure no repeating value can be picked.

**arguments**
- {Int+} -> number of values to output
- {Number} -> maximum range (optional, default=12)
- {Number} -> minimum range (optional, defautl=0)

```java
set randomSeed 1618

list urn1 urn(5)
// => [3 7 10 0 2]
list urn2 urn(8 4)
// => [0 2 1 3 1 3 0 2]
list urn3 urn(8 10 14)
// => [13 10 12 11 12 10 13 11]
```

## coin

Generate a list of random integer values 0 or 1 like a coin toss, heads/tails. Or 

**arguments**
- {Int+} -> number of coin tosses to output as list

```java
list coin1 coin(8)
// => [1 0 1 0 1 0 1 1]
```

## dice

Generate a list of random integer values 1 to 6 like the roll of a dice.

**arguments**
- {Int+} -> number of dice rolls to output as list

```java
list dice1 dice(8)
// => [5 4 6 4 4 5 4 2]
```

## clave

Generate random clave patterns. The output is a binary list that represents a rhythm, where 1's represent onsets and 0's rests. First argument sets the list length output, second argument sets the maximum gap between onsets, third argument the minimum gap.

**arguments**
- {Int+} -> output length of rhythm (default=8)
- {Int+} -> maximum gap between onsets (default=3)
- {Int+} -> minimum gap between onsets (default=2)

```java
list clv1 clave()
//=> [ 1 0 1 0 0 1 0 1 ] 
//=> █ █  █ █

list clv2 clave(8)
//=> [ 1 0 0 1 0 1 0 1 ] 
//=> █  █ █ █

list clv3 clave(16 4)
//=> [ 1 0 0 0 1 0 1 0 0 0 1 0 0 1 0 1 ] 
//=> █   █ █   █  █ █

list clv4 clave(16 3 1)
//=> [ 1 0 0 1 0 0 1 1 0 0 1 0 1 0 0 1 ] 
//=> █  █  ██  █ █  █  
```

## twelveTone

Generate a list of 12 semitones then shuffle the list based on the random seed. 

**arguments**
- {None}

```java
list twv1 twelveTone()
// => [10 7 6 3 2 9 8 4 1 5 0 11]
```

```java
//Basically a shorthand for: 
list notes spread(12)
list notes shuffle(notes)
```

## choose

Choose random items from a list provided with uniform probability distribution. The default list is a list of 0 and 1.

**arguments**
- {Int+} -> length of list output
- {List} -> items to choose from (optional, default=[0 1])

```java
set randomSeed 62832

list samples [hat snare kick]
list sequence choose(10 samples)
// => [hat kick hat kick hat snare kick hat hat hat]

list notes [0 3 7 5 9 12]
list melody choose(10 notes)
// => [0 5 3 9 0 7 3 12 3 7]
```

## pick

Pick random items from a list provided. An "urn" is filled with values and when one is picked it is removed from the urn. If the outputlist is longer then the range, the urn refills when empty. On refill it is made sure no repeating value can be picked.

**arguments**
- {Int+} -> length of list output
- {List} -> items to choose from (optional, default=[0 1])

```java
set randomSeed 62832

list samples [hat snare kick tom]
list sequence pick(10 samples)
// => [hat kick tom snare tom hat snare kick tom hat]

list notes [0 3 7 5 9 12]
list melody pick(10 notes)
// => [3 0 7 9 12 5 0 7 12 9]
```

## shuffle

Shuffle a list, influenced by the random seed. Based on the Fisher-Yates shuffle algorithm by Ronald Fisher and Frank Yates in 1938. The algorithm has run time complexity of O(n)

**arguments**
- {List} -> List to shuffle

```java
set randomSeed 14142

list samples [hat snare kick tom]
list shf1 shuffle(samples)
// => [snare tom kick hat]

list notes [0 3 7 5 9 12]
list shf2 scramble(notes)
// => [12 0 3 7 5 9]
```

## expand

Expand a list based upon the pattern within a list. The pattern is derived from the rate in change between values by calculating the differences between every consecutive value. The newly generated values are selected randomly from the list of possible changes, but in such a way that every change occurs once in the sequence of total changes before reshuffling and selecting the next one (see the `pick` method for explanation). The resulting output starts with the input list.

**arguments**
- {Int+} -> length of list output
- {List} -> List to expand

```java
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

## markovTrain

Build a Markov Chain transition table from a set of datapoints (a list) and use it together with `markovChain()` to generate a new list of values based on the probabilities of the transitions in the provided training dataset. A Markov Chain is a model that describes possible next events based on a current state (first order) or multiple previous states (2nd, 3rd, ... n-order). The Markov Chain is a broadly used method in algorithmic music to generate new material (melodies, rhythms, but even words) based on a set of provided material, but can also be used in linguistics to analyze word or sentence structures. The first argument is the list to analyze, the second argument is the nth-order (default = 2). In theory, longer chains preserve the original structure of the model, but won't generate as diverse outputs. The output is a 

Alias: `markov()`

**arguments**
- {List} -> List to analyze into transition table
- {Int+} -> Order of the markov-chain (optional, default=2)
- return -> Transition table as a string

```js
list melody [ 0 0 7 7 9 9 7 5 5 4 4 2 2 0 ]
list model markovTrain(melody 2)
```

## markovChain

Generate a list of values of n-length based on a markov transition table (a model) that was trained with `markovTrain()`. The first argument determines the output length, the second input is the reference to the markov model. The resulting output is based on the probabilities that are captured within the transition table. This means the output can also be directed by the `randomSeed`.

```js
list melody [ 0 0 7 7 9 9 7 5 5 4 4 2 2 0 ]
list model markovTrain(melody 3)

set randomSeed 3141

list markovMelody markovChain(16 model)
//=> [9 7 7 5 5 4 4 2 2 0 0 5 4 4 2 2]
```

# Transformative Methods

## clone

Duplicate a list with an offset added to every value

**arguments**
- {IntList} -> List to clone
- {Int, Int2, ... Int-n} -> amount of clones with integer offset

```java
list notes [0 3 7]
list melody clone(notes 0 12 7 -7)
// => [0 3 7 12 15 19 7 10 14 -7 -4 0]
```

## join

Join lists into one list. Using multiple lists as arguments is possible.

**arguments**
- {List-0, List-1, ..., List-n} -> List to combine

```java
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
Alias: `combine()`, `concat()`

## copy

Copy a list a certain amount of times.

**arguments**
- {List} -> List to duplicate
- {Int+} -> amount of duplicates (optional, default=2)

```java
list notes [0 3 7]
list phrase copy(notes 4)
// => [0 3 7 0 3 7 0 3 7 0 3 7]
```

Alias: `duplicate(), dup()`

## pad 

Pad a list with zeroes (or any other value) up to the length specified. The padding value can optionally be changed and the shift argument rotates the list n-steps left or right (negative). This method is similar to `every()` except arguments are not specified in musical bars/divisions.

**arguments**
- {NumberList} -> List to use every n-bars
- {Int} -> output length of list (optional, default=16)
- {Value} -> padding value for the added items (optional, default=0)
- {Number} -> shift in steps (optional, default=0)

```java 
list pad2 pad(pad1 9)
// [ 3 7 11 12 0 0 0 0 0]

list pad3 pad([c f g] 11 - 4)
// [ - - - - c f g - - - - ]
```

## every

Add zeroes to a list with a number sequence. The division determines the amount of values per bar. The total length = bars * div. Very useful for rhythms that must occur once in a while, but can also be use for melodic phrases.

**arguments**
- {IntList} -> List to use every n-bars
- {Int} -> amount of bars
- {Int} -> amount of values per bar

```java
list rhythm [1 0 1 1 0 1 1]
list sequence every(rhythm 2 8)
// => [1 0 1 1 0 1 1 0 0 0 0 0 0 0 0 0]

list melody [12 19 24 27 24]
list phrase every(melody 2 8)
// => [12 19 24 27 24 0 0 0 0 0 0 0 0 0 0 0]
```

## flat

Flatten a multidimensional list. Optionally set the depth for the flattening with the second argument.

**arguments**
- {List} -> list to flatten
- {Number} -> depth of flatten (default=Infinity)

```java 
list fl1 flat([1 [2 3 [ 4 ] 5] 6])
//=> [ 1 2 3 4 5 6 ] 
```

## invert

Invert a list of values by mapping the lowest value to the highest value and vice versa, flipping everything in between.  Second optional argument sets the center to flip values against. Third optional argument sets a range to flip values against.

**arguments**
- {IntList} -> List to invert
- {Int} -> invert center / low range (optional)
- {Int} -> high range (optional)

```java
list notes [0 3 7 12]
list inv1 invert(notes)
// => [12 9 5 0]

list inv2 invert(notes 5)
// => [10 7 3 -2]

list inv3 invert(notes 3 10)
// => [13 10 6 1]
```

Alias: `inverse()`, `flip()`, `inv()`

## lace

Interleave two or more lists. The output length of the is always the length of the longest input list.

**arguments**
- {List0, List1, ..., List-n} -> Lists to interleave

```java
list partA [0 3 7 5 0]
list partB [12 19 15]
list partC [24 22]
list melody lace(partA partB)
// => [0 12 24 3 19 22 7 15 5 0]
```

Alias: `zip()`

## lookup

Build a list of items based on another list of indices 
The values are wrapped within the length of the lookup list

**arguments**
- {NumberList} -> List with indeces to lookup
- {List} -> List with values returned from lookup
- {List} -> Looked up values

```java
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

Alias: `get()`

## merge

Merge all values of two lists on the same index into a 2-dimensional list. Preserves the length of longest input list.

**arguments**
- {List0, List1, ..., List-n} -> Lists to merge

```java
list partA [0 3 7 5 0]
list partB [12 19 15] 
list merged merge(partA partB)
// => [[0 12] [3 19] [7 15] 5 0]
// mix()
```
Alias: `mix()`

## palindrome

Reverse a list and concatenating to the input, creating a palindrome of the list. A second argument 1 will remove the duplicates halfway through and at the end.

**arguments**
- {List} -> list to make palindrome of
- {Bool} -> no-double flag (optional, default=0)

```java
list notes [0 3 7 12]
list melodyA palindrome(notes)
// => [0 3 7 12 12 7 3 0]

list melodyB palindrome(notes 1)
// => [0 3 7 12 7 3]
// palin()
// mirror()
```

Alias: `palin()`, `mirror()`

## repeat

Repeats separate values in a list a certain amount of times. The repeats argument can be a list that will be iterated for every value in the to-repeat list.

**arguments**
- {List} -> List to repeat
- {Int+/IntList} -> amount of repeats per value

```java
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

## reverse

Reverse the order of items in a list.

**arguments**
- {List} -> List to reverse

```java
list melody [0 3 7 5]
list rev reverse(melody)
// => [5 7 3 0]
// retrograde()
// rev()
```
Alias: `retrograde()`, `rev()`

## rotate

Rotate the position of items in a list. positive numbers = direction right, negative numbers = direction left

**arguments**
- {List} -> List to rotate
- {Int} -> Steps to rotate

```java
list melody [0 3 7 5 7 9 12]
list left rotate(melody -2)
// => [7 5 7 9 12 0 3]

list right rotate(melody 2)
// => [9 12 0 3 7 5 7]
// rotate()
// turn()
// rot()
```

Alias: `turn()`, `rot()`

## sort

Sort an list of numbers or strings. sorts ascending or descending in numerical and alphabetical order.

**arguments**
- {List} -> List to sort
- {Int} -> sort direction (positive value is ascending)

```java
list srt1 sort([-5 7 0 3 12 -7 9] -1)
//=> [ 12 9 7 3 0 -5 -7 ] 

// works with strings (but alphabetical order!)
list srt2 sort([e4 g3 c4 f3 b5])
//=> [ b5 c4 e4 f3 g3 ]
```

## slice

Slice a list in one or multiple parts. Slice lengths are determined by the second argument list. Outputs a list of lists of the result

**arguments**
- {List} -> list to slice in parts
- {Number/List} -> slice lengths to slice list into
- {Bool} -> output rest flag (optional, default=false)

```java
list sl1 slice(spread(8) [3 2])
//=> [ [ 0 1 2 ] [ 3 4 ] [ 5 6 7 ] ] 

// set rest-flag to false removes last slice 
list sl2 slice(spread(24) [3 2 -1 5] 0)
//=> [ [ 0 1 2 ] [ 3 4 ] [ 5 6 7 8 9 ] ] 
```

## split

Similar to slice in that it also splits a list, except that slice recursively splits until the list is completely empty. If a list is provided as split sizes it will iterate the lengths.

**arguments**
- {List} -> list to split in parts
- {Number/List} -> split lengths to split list into

```java
list sp1 split(spread(12) 3)
//=> [ [ 0 1 2 ] [ 3 4 5 ] [ 6 7 8 ] [ 9 10 11 ] ] 

list sp2 split(spread(12) [3 2 -1])
//=> [ [ 0 1 2 ] [ 3 4 ] [ 5 6 7 ] [ 8 9 ] [ 10 11 ] ] 
```

## cut

Cut the beginning of a list and return. Slice length is determined by the second argument number. Outputs a list of the result.

**arguments**
- {List} -> list to slice in parts
- {Number} -> slice length to cut list into
- {Bool} -> output rest flag (optional, default=false)

```java
list ct1 cut(spread(8) 3)
//=> [ 0 1 2 ]
```

## spray

"Spray" the values of one list on the places of values of another list if that value is greater than 0. Wraps input list if more places must be set then length of the list.

**arguments**
- {List} -> List to spray
- {List} -> Positions to spray on

```java
list notes [12 19 15 17]
list places [1 0 0 1 1 0 1 0 1 0]
list sprayed spray(notes places)
// => [12 0 0 19 15 0 17 0 12 0]
```

## stretch

Stretch (or shrink) a list to a specified length, linearly interpolating between all values within the list. Minimum output length is 2 (which will be the outmost values from the list). Third optional argument sets the interpolation mode. Available modes are `none` (or `null`, `false`) and `linear`.

**arguments**

```java
list notes [0 12 3 7]
list str stretch(notes 15)
//=> [ 0 2 5 7 10 11 9 7 5 3 3 4 5 6 7 ] 

//   12.00 ┼  ╭╮      
//    9.60 ┤  │╰╮     
//    7.20 ┤ ╭╯ │   ╭ 
//    4.80 ┤╭╯  ╰╮╭─╯ 
//    2.40 ┤│    ╰╯   
//    0.00 ┼╯ 

// use stretchFloat if you want the result to have more precision
list str stretchFloat(notes 15)
```

## unique

Filter duplicate items from a list. does not account for 2-dimensional lists in the list.

**arguments**
- {List} -> List to filter

```java
list notes [0 5 7 3 7 7 0 12 5]
list thinned unique(notes)
// => [0 5 7 3 12]
```

Alias: `thin()`

# Utility Methods

## wrap

Wrap values from a list within a specified low and high range.

**arguments**
- {List} -> List to wrap
- {Number} -> Low value (optional, default=12)
- {Number} -> High value (optional, default=0)

```java
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

## clip

Constrain values from a list within a specified low and high range.

**arguments**
- {List} -> List to constrain
- {Number} -> Low value (optional default=12)
- {Number} -> High value (optional default=0)

```java
list cn1 constrain([0 [1 [2 3]] [4 5] 6] 2 5)
//=> [ 2 [ 2 [ 2 3 ] ] [ 4 5 ] 5 ] 

list cn2 constrain(cosine(30 1) 5 9)
//=>  9.00 ┼─────╮                   ╭─── 
//    8.20 ┤     │                  ╭╯    
//    7.40 ┤     ╰╮                ╭╯     
//    6.60 ┤      ╰╮              ╭╯      
//    5.80 ┤       │              │       
//    5.00 ┤       ╰──────────────╯ 

// Alias: constrain()
```

## fold

Fold values from a list within a specified low and high range.

**arguments**
- {List} -> List to fold
- {Number} -> Low value (optional, default=12)
- {Number} -> High value (optional, default=0)

```java
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

## map

Rescale values from a list from a specified input range to a specified low and high output range.

**arguments**
- {List} -> List to wrap
- {Number} -> Low value (optional, default=1)
- {Number} -> High value (optional, default=0)
- {Number} -> Low value (optional, default=1)
- {Number} -> High value (optional, default=0)
- {Number} -> Exponent value (optional, default=1)

```java
list sc1 scale([0 [1 [2 3]] 4] 0 4 -1 1)
//=> [ -1 [ -0.5 [ 0 0.5 ] ] 1 ] 
```

## mod

Return the remainder after division. Also works in the negative direction, so wrap starts at 0

**arguments**
- {Int/List} -> input value
- {Int/List} -> divisor (optional, default=12)
- {Int/List} -> remainder after division

```js
list vals mod([-2 [4 [3 7]]] 5)
//=> [ 3 [ 4 [ 3 2 ] ] ]
```

## add

Add two lists sequentially

```java
list vals add([1 2 3 4] [1 2 3])
//=> [ 2 4 6 5 ] 

// Works with n-dimensional lists
list vals add([1 [2 3]] [10 [20 30 40]])
//=> [ 11 [ 22 33 42 ] ] 
```

## subtract

Subtract two lists sequentially

```java
list vals subtract([1 2 3 4] [1 2 3])
//=> [ 0 0 0 3 ] 

list vals sub([1 [2 3]] [10 [20 30 40]])
//=> [ -9 [ -18 -27 -38 ] ] 
```

Alias: `sub`

## multiply

Multiply two lists sequentially

```java
list vals multiply([1 2 3 4] [1 2 3])
//=> [ 1 4 9 4 ] 

list vals mul([1 [2 3]] [10 [20 30 40]])
//=> [ 10 [ 40 90 80 ] ] 
```

Alias: `mul`

## divide

Divide two lists sequentially

```java
list vals divide([1 2 3 4] [1 2 3])
//=> [ 1 1 1 4 ] 

list vals div([1 [2 3]] [10 [20 30 40]])
//=> [ 0.1 [ 0.1 0.1 0.05 ] ] 
```

Alias: `div`

## normalize

Normalize all the values in a list between 0. and 1. The highest value will be 1, the lowest value will be 0.

**arguments**
- {Number/List} -> input values
- {Int/List} -> normailzed values

```java
list vals normalize([0 1 2 3 4])
//=> [ 0 0.25 0.5 0.75 1 ]

// works with n-dimensional lists
list vals normalize([5 [12 [4 17]] 3 1])
//=> [ 0.25 [ 0.6875 [ 0.1875 1 ] ] 0.125 0 ]  
```

Alias: `norm()`

## equals

Compare two lists for equals (==)

```js
list vals ([0 1 2 3] [1 10 20 30])
//=> [  ]
```

Alias: `eq`

## notEquals

Compare two list for not equals (!=)

```js
list vals ([0 1 2 3] [1 10 20 30])
//=> [  ]
```

Alias: `neq`

## greater

Compare two lists for left values are greater than right (>)

```js
list vals ([0 1 2 3] [1 10 20 30])
//=> [  ]
```

Alias: `gt`

## greaterEquals

Compare two lists for left values are greater than or equal to right (>=)

```js
list vals ([0 1 2 3] [1 10 20 30])
//=> [  ]
```

Alias: `gte`

## less

Compare two lists for left values are less than right (<)

```js
list vals ([0 1 2 3] [1 10 20 30])
//=> [  ]
```

Alias: `lt`

## lessEquals

Compare two lists for left values less than or equal to right (<=)

```js
list vals ([0 1 2 3] [1 10 20 30])
//=> [  ]
```

Alias: `lte`

# Translate Methods

## Conversion between pitch units

Convert easily between relative-semitones, midinotes, notenames, chord-numerals, chordnames and frequencies with the methods below. Thankfully using the amazing `Tonal.js` package by `@danigb` for various functions.

```java
// Convert Array or Int as midi-number to midi-notenames
midiToNote([60 [63 67 69] [57 65]])
//=> [ c4 [ eb4 g4 a4 ] [ a3 f4 ] ] 
// Alias: mton()

// Convert midi-pitches to frequency (A4 = 440 Hz)
midiToFreq([60 [63 67 69] [57 65]])
//=> [ 261.63 [ 311.13 391.995 440 ] [ 220 349.23 ] ] 
// Alias: mtof()

// Convert Array of String as midi-notenames to midi-pitch
noteToMidi([c4 [eb4 g4 a4] [a3 f4]])
//=> [ 60 [ 63 67 69 ] [ 57 65 ] ] 
// Alias: ntom()

// Convert midi-notenames to frequency (A4 = 440 Hz)
noteToFreq([c4 [eb4 g4 a4] [a3 f4]])
//=> [ 261.63 [ 311.13 391.995 440 ] [ 220 349.23 ] ] 
// Alias: ntof()

// Convert frequency to nearest midi note
freqToMidi([ 261 [ 311 391 440 ] [ 220 349 ] ])
//=> [ 60 [ 63 67 69 ] [ 57 65 ] ] 
// Alias: ftom()

// Set detune flag to true to get floating midi output for pitchbend
freqToMidi([ 261 [ 311 391 440 ] [ 220 349 ] ] true)
//=> [ 59.959 [ 62.993 66.956 69 ] [ 57 64.989 ]] 

// Convert frequency to nearest midi note name
freqToNote([ 261 [ 311 391 440 ] [ 220 349 ] ])
//=> [ c4 [ eb4 g4 a4 ] [ a3 f4 ] ] 
// Alias: fton()

// Convert relative semitone values to midi-numbers
// specify the octave as second argument (default = C4 = 4 => 48)
relativeToMidi([[-12 -9 -5] [0 4 7] [2 5 9]] c4)
//=> [ [ 48 51 55 ] [ 60 64 67 ] [ 62 65 69 ] ]
// Alias: rtom()

// Convert relative semitone values to frequency (A4 = 440 Hz)
// specify the octave as second argument (default = C4 = 4 => 48)
relativeToFreq([[-12 -9 -5] [0 4 7] [2 5 9]] c4)
//=> [ [ 130.81 155.56 196 ] [ 261.62 329.63 392 ] [ 293.66 349.23 440 ] ]
// Alias: rtof()

// Convert a chroma value to a relative note number
// Can also include octave offsets with -/+ case-insensitive
chromaToRelative([c [eb G Ab] [a+ f-]]) 
//=> [ 0 [ 3 7 8 ] [ 21 -7 ] ]
// Alias: ctor()

// Convert ratio to relative cents
ratioToCent([2/1 [3/2 [4/3 5/4]] 9/8])
//=> [ 1200 [ 701.95 [ 498.04 386.31 ] ] 203.91 ] 
// Alias: rtoc()

// Convert a chord progression from roman numerals to semitones
chordsFromNumerals([I IIm IVsus2 V7 VIm9])
// => [[ 0 4 7 ]
//     [ 2 5 9 ]
//     [ 5 7 0 ]
//     [ 7 11 2 5 ]
//     [ 9 0 4 7 11 ]] 
// Alias: chords()

// Convert a chord progression from chordnames to semitones
chordsFromNames([C Dm Fsus2 G7 Am9])
//=> [[ 0 4 7 ]
//    [ 2 5 9 ]
//    [ 5 7 0 ]
//    [ 7 11 2 5 ]
//    [ 9 0 4 7 11 ]] 
```

## Conversion between time units

Convert between rhythmic notation such as divisions or ratios and milliseconds based on the set tempo in the global settings.

### divisionToMs

Convert beat division strings or beat ratio floats to milliseconds using BPM from the global settings. Optional second argument sets BPM and ignores global setting.

**arguments**
- {List} -> beat division or ratio list
- {Number} -> set the BPM (optional, default = global tempo)

```java
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

Alias: `dtoms()`

Other methods:

```java
// convert beat division strings to beat ratio floats
divisionToRatio([1/4 1/8 3/16 1/4 1/6 2])
//=> [ 0.25 0.125 0.1875 0.25 0.167 2 ] 
// Alias: print dtor()

// convert beat ratio floats to milliseconds
ratioToMs([0.25 [0.125 [0.1875 0.25]] 0.1667 2] 100)
//=> [ 600 [ 300 [ 450 600 ] ] 400.08 4800 ] 
// Alias: print rtoms()
```

## Working with fixed scale and root

Convert notes to a fixed scale based on the global settings.

```java
// Set the global scale used with toScale() and toMidi() methods
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

toScale([0 1 2 3 4 5 6 7 8 9 10 11] minor eb);
//=> [ 3 3 5 6 6 8 8 10 11 11 13 13 ]
```

## textToCode

Convert a string or array of strings to their ASCII code integer representation. The ASCII code is the American Standard Code for Information Interchange. In this code every unique character/symbol/number is represented by a whole number (integer). For example `a=97`, but `A=65` and `SPACE=32`.

Alias: `textCode`, `ttoc`

**arguments**
- {String/Array} -> input to convert to ASCII 

```js
// single string input
textCode('bach cage');
//=> [ 98 97 99 104 32 99 97 103 101 ]

// multiple strings in an array results in a 2D array output
textCode([bach cage]);
//=> [ [ 98 97 99 104 ] [ 99 97 103 101 ] ]
```