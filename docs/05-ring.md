# Ring Methods

Mercury uses the `total-serialism` Node Package to generate and transform numbersequences that are used for melodies, rhythms, parameters and basically anything that can be sequenced in the environment. These numbersequences are refered to as `ring`'s, because the sequence (array) is circular. Every step an instrument takes in the sequencer based on the speed from `time()` it will increment a counter and use that as an index to take the value in the array. When the index is higher then the amount of values in the array it will return to the begin and start over, hence a circular array or `ring`. 

```
ring <the-ring-name> [ v0 v1 v2 ... v-n ] 
```

example

```java
ring someInts [0 10 20 30]
ring someFloats [1.618 3.1415]
ring twoDimensional [0 1 [2 3] 4 [5 6 7]]
ring someSamples [kick_909 hat_909 snare_909 hat_909]
```

**Note:** Some variable names are not allowed because they are part of the built-in names for datastructures. These are: `bang, int, float, list, mode, zlclear, zlmaxsize`

[`total-serialism`](https://www.npmjs.com/package/total-serialism) is a set of methods used for procedurally generating and transforming number sequences. This library is mainly designed with algorithmic composition of music in mind, but can surely be useful for other purposes that involve generation and manipulation of arrays and numbers. The library is a result of my research in algorithmic composition, livecoding and electronic music and was first prototyped with Max/MSP in the Mercury livecoding environment.

# Table of Content

- [Param Glossary](#param-glossary)
- [Generative Methods](#generative-methods)
	- [spread / spreadFloat](#spread--spreadFloat)
	- [spreadInclusive / spreadInclusiveFloat](#spreadInclusive--spreadInclusiveFloat)
	- [fill](#fill)
	- [sine / cosine](#sine--cosine)
	- [sineFloat / cosineFloat](#sineFloat--cosineFloat)
- [Algorithmic Methods](#algorithmic-methods)
	- [euclidean](#euclidean--euclid)
	- [hexBeat](#hexbeat--hex)
	- [fibonacci](#fibonacci)
	- [pisano](#pisano)
	- [pell](#pell)
	- [lucas](#lucas)
	- [threeFibonacci](#threefibonacci)
	- lindenmayerStringExpansion (coming soon...)
- [Stochastic Methods](#stochastic-methods)
	- [randomSeed](#randomseed)
	- [random](#random)
	- [randomFloat](#randomfloat)
	- [urn](#urn)
	- [coin](#coin)
	- [dice](#dice)
	- [twelveTone](#twelvetone)
	- [choose](#choose)
	- [pick](#pick)
	- [shuffle](#shuffle)
- Transformative Methods (w.i.p.)
- Translate Methods (w.i.p.)

# Param Glossary

**Values**

- `Value` -> Number or Name
	- `Number` -> Int+, Int or Float
		- `Int+` -> A positive whole number, bigger than 0
		- `Int` -> A whole number, negative or positive, including 0
		- `Float` -> A floating-point number, negative or positive, including 0
	- `Name` -> A combination of letter-characters, may include capital letter, underscores and digits

**Rings**

- `Ring` -> A ring with `Value`'s
	- `NumberRing` -> A ring with `Number`'s
		- `IntRing+` -> A ring with `Int+`'s
		- `IntRing` -> A ring with `Int`'s
		- `FloatRing` -> A ring with `Float`'s
	- `NameRing` -> A ring with `Name`'s

# Generative Methods

## spread / spreadFloat

Generate a ring of n-length of evenly spaced values between a starting number up untill (but excluding) the 3th argument.

**arguments**
- {Int+} -> Length of ring
- {Int/Float} -> Low value
- {Int/Float} -> High value (excluded)

```java
ring spr1 spread(5 0 12)
// => [0 2 4 7 9]

ring spr2 spreadFloat(5 -1 1)
// => [-1 -0.6 -0.2 0.2 0.6]

ring spr3 spreadF(5 0 2)
// => [0 0.4 0.8 1.2 1.6]
```

## spreadInclusive / spreadInclusiveFloat

Generate a ring of n-length of evenly spaced values between a starting number up to (and including) the 3th argument.

**arguments**
- {Int+} -> Length of ring
- {Number} -> Low value
- {Number} -> High value (included)

```java
ring spi1 spreadInclusive(5 0 12)
// => [0 3 6 9 12]

ring spi2 spreadInclusiveFloat(5 -1 1)
// => [-1 -0.5 0 0.5 1]

ring spi3 spreadInclusiveF(5 0 2)
// => [0 0.5 1 1.5 2]
```

## fill

Fill a ring with values. Arguments are in pairs. Every pair consists of `<value, amount>` The value is repeated n-amount of times in the ring.

**arguments**
- {Value} -> value to duplicate
- {Int+} -> amount of duplicates

```java
ring fll1 fill(10 2 15 3 20 4)
// => [10 10 15 15 15 20 20 20 20]

ring fll2 fill(kick_min 2 hat_min 3)
// => [kick_min kick_min hat_min hat_min hat_min]
```

## sine / cosine

Generate an array with n-periods of a (co)sine function. Optional last arguments set lo and hi range. Only setting first range argument sets the low-range to 0.

**arguments**
- {Int+} -> Length of ring
- {Number} -> Periods of (co)sine-wave (optional, default=1)
- {Number} -> Low range of values (optional, default=0)
- {Number} -> High range of values (optional, default=12)
- {Number} -> Phase offset (optional, default=0)

```java
ring sin1 sine(10)
// => [6 9 11 11 9 6 2 0 0 2]

ring sin2 sine(10 1 -12 12)
// => [0 7 11 11 7 0 -7 -11 -11 -7]

ring sin3 sine(10 2 0 5)
// => [2 4 3 1 0 2 4 3 1 0]
```

```java
ring cos1 cosine(10)
// => [12 10 7 4 1 0 1 4 7 10]

ring cos2 cosine(10 1 -12 12)
// => [12 9 3 -3 -9 -12 -9 -3 3 9]

ring cos3 cosine(10 2 0 5)
// => [5 3 0 0 3 4 3 0 0 3]
```

## sineFloat / cosineFloat

Generate an array with n-periods of a (co)sine function. Optional last arguments set lo and hi range. Only setting first range argument sets the low-range to 0.

**arguments**
- {Int+} -> Length of ring
- {Number} -> Periods of (co)sine-wave (optional, default=1)
- {Number} -> Low range of values (optional, default=-1)
- {Number} -> High range of values (optional, default=1)
- {Number} -> Phase offset (optional, default=0)

```java
ring sin4 sineFloat(8)
// => [0 0.707 1 0.707 0 -0.707 -1 -0.707]

ring sin5 sineF(12 3 -1 1)
// => [0 1 0 -1 0 1 0 -1 0 1 0 -1]
```
```java
ring cos4 cosineFloat(8)
// => [1 0.707 0 -0.707 -1 -0.707 0 0.707]

ring cos5 cosineF(12 3 -1 1)
// => [1 0 -1 0 1 0 -1 0 1 0 -1 0]
```

# Algorithmic Methods

# euclidean / euclid

Generate a euclidean rhythm evenly spacing n-beats amongst n-steps.Inspired by Godfried Toussaints famous paper "The Euclidean Algorithm Generates Traditional Musical Rhythms".

**arguments**
- {Int+} -> length of ring (optional, default=8)
- {Int+} -> beats (optional, default=4)
- {Int} -> rotate (optional, default=0)

```java
ring euc1 euclidean()
// => [1 0 1 0 1 0 1 0]

ring euc2 euclid(7 5)
// => [1 1 0 1 1 0 1]

ring euc3 euclid(7 5 2)
// => [0 1 1 1 0 1 1]
```

## hexBeat / hex

Generate hexadecimal rhythms. Hexadecimal beats make use of hexadecimal values (0 - f) that are a base-16 number system. Because one digit in a base-16 number system has 16 possible values (0 - 15) these can be converted to 4 bits that therefore can be seen as groups of 4 16th notes. These hexadecimal values will then represent any permutation of 1's and 0's in a 4 bit number, where 0 = 0 0 0 0, 7 = 0 1 1 1, b = 1 0 1 1, f = 1 1 1 1 and all possible values in between.

**arguments**
- {Name} -> hexadecimal characters (0 t/m f) (optional, default=8)

```java
ring hex1 hexBeat()
// => [1 0 0 0]

ring hex2 hex(a)
// => [1 0 1 0]

ring hex3 hex(f9cb)
// => [1 1 1 1 1 0 0 1 1 1 0 0 1 0 1 1]
```

- [Learn hex beats](https://kunstmusik.github.io/learn-hex-beats/)

## fibonacci

Generate the Fibonacci sequence `F(n) = F(n-1) + F(n-2)`. The ratio between consecutive numbers in the fibonacci sequence tends towards the Golden Ratio (1+√5)/2. 

`OEIS: A000045` (Online Encyclopedia of Integer Sequences)

**arguments**
- {Int+} -> output length of ring
- {Int+} -> offset, start the sequence at nth-fibonacci number (optional, default=0)

```java
ring fib1 fibonacci(10)
// => [0 1 1 2 3 5 8 13 21 34]

ring fib2 fibonacci(3 10)
// => [55 89 144]
```

## pisano

Generate the Pisano period sequence. The pisano period is a result of applying a modulo operation on the Fibonacci sequence `F[n] = (F[n-1] + F[n-2]) mod a`. The length of the period differs per modulus value, but the sequence will always have a repetition.

**arguments**
- {Int+} -> modulus for pisano period (optional, default=12)
- {Int+} -> output length of ring (optional, defaults to pisano-period length)

```java
ring psn1 pisano()
// => [0 1 1 2 3 5 8 1 9 10 7 5 0 5 5 10 3 1 4 5 9 2 11 1]

ring psn2 pisano(3)
// => [0 1 1 2 0 2 2 1]

ring psn3 pisano(11)
// => [0 1 1 2 3 5 8 2 10 1]
```

## pell

Generate the Pell numbers `F(n) = 2 * F(n-1) + F(n-2)`. The ratio between consecutive numbers in the pell sequence tends towards the Silver Ratio 1 + √2.

`OEIS: A006190` (Online Encyclopedia of Integer Sequences)

**arguments**
- {Int+} -> output length of ring

```java
ring pll1 pell(8)
// => [0 1 2 5 12 29 70 169]
```

## lucas

Generate the Lucas numbers `F(n) = F(n-1) + F(n-2), with F0=2 and F1=1`.

`OEIS: A000032` (Online Encyclopedia of Integer Sequences)

**arguments**
- {Int+} -> output length of ring

```java
ring luc1 lucas(8)
// => [2 1 3 4 7 11 18 29]
```

## threeFibonacci

Generate the Tribonacci numbers `F(n) = 2 * F(n-1) + F(n-2)`. The ratio between consecutive numbers in the 3-bonacci sequence tends towards the Bronze Ratio (3 + √13) / 2.

`OEIS: A000129` (Online Encyclopedia of Integer Sequences)

**arguments**
- {Int+} -> output length of ring

```java
ring tfi1 threeFibonacci(8)
// => [0 1 3 10 33 109 360 1189]
```

# Stochastic Methods

## randomSeed

Set the seed for the Random Number Genrators. A value of `0` sets to unpredictable seeding. The seed can only be set **once** in the code, and the last value will take effect.

```java
set randomSeed 31415 
// ^^^^^^^^^^^ will be overwritten by 1618 before random() call
ring randomValues random(10 0 100)
// ^^^^^^^^^^^ the random() will use the seed from below
set randomSeed 1618
// ^^^^^^^^^^^ 1618 overwrites 31415
```
## random

Generate a ring of random integers between a specified range (excluding high value).

**arguments**
- {Int+} -> number of values to output
- {Int} -> minimum range (optional, default=0)
- {Int} -> maximum range (optional, default=2)

```java
set randomSeed 31415

ring rnd1 random(5)
// => [1 0 0 1 1]
ring rnd2 random(5 12)
// => [0 10 3 2 2]
ring rnd3 rand(5 -12 12)
// => [-2 -5 -8 -11 6]
```

## randomFloat

Generate a ring of random floating-point values between a specified range (excluding high value).

**arguments**
- {Int+} -> number of values to output
- {Number} -> minimum range (optional, default=0)
- {Number} -> maximum range (optional, default=1)

```java
set randomSeed 31415

ring rnf1 randomFloat(5)
// => [0.81 0.32 0.01 0.85 0.88]
ring rnf2 randomF(5 0 12)
// => [0.16 10.72 3.16 262 2.34]
ring rnf3 randF(5 -12 12)
// => [-1.19 -4.21 -7.36 -10.31 6.82]
```

## urn

Generate a list of unique random integer values between a certain specified range (excluding high val). An 'urn' is filled with values and when one is picked it is removed from the urn. If the outputlist is longer then the range, the urn refills when empty. On refill it is made sure no repeating value can be picked.

**arguments**
- {Int+} -> number of values to output
- {Number} -> maximum range (optional, default=12)
- {Number} -> minimum range (optional, defautl=0)

```java
set randomSeed 1618

ring urn1 urn(5)
// => [3 7 10 0 2]
ring urn2 urn(8 4)
// => [0 2 1 3 1 3 0 2]
ring urn3 urn(8 10 14)
// => [13 10 12 11 12 10 13 11]
```

## coin

Generate a list of random integer values 0 or 1 like a coin toss, heads/tails. Or 

**arguments**
- {Int+} -> number of coin tosses to output as ring

```java
ring coin1 coin(8)
// => [1 0 1 0 1 0 1 1]
```

## dice

Generate a list of random integer values 1 to 6 like the roll of a dice.

**arguments**
- {Int+} -> number of dice rolls to output as ring

```java
ring dice1 dice(8)
// => [5 4 6 4 4 5 4 2]
```

## twelveTone

Generate a list of 12 semitones then shuffle the list based on the random seed. 

**arguments**
- {None}

```java
ring twv1 twelveTone()
// => [10 7 6 3 2 9 8 4 1 5 0 11]
```

```java
//Basically a shorthand for: 
ring notes spread(12)
ring notes shuffle(notes)
```

## choose

Choose random items from an array provided with uniform probability distribution. The default array is an array of 0 and 1.

**arguments**
- {Int+} -> length of ring output
- {Ring} -> items to choose from (optional, default=[0 1])

```java
set randomSeed 62832

ring samples [hat snare kick]
ring sequence choose(10 samples)
// => [hat kick hat kick hat snare kick hat hat hat]

ring notes [0 3 7 5 9 12]
ring melody choose(10 notes)
// => [0 5 3 9 0 7 3 12 3 7]
```

## pick

Pick random items from an array provided. An "urn" is filled with values and when one is picked it is removed from the urn. If the outputlist is longer then the range, the urn refills when empty. On refill it is made sure no repeating value can be picked.

**arguments**
- {Int+} -> length of ring output
- {Ring} -> items to choose from (optional, default=[0 1])

```java
set randomSeed 62832

ring samples [hat snare kick tom]
ring sequence pick(10 samples)
// => [hat kick tom snare tom hat snare kick tom hat]

ring notes [0 3 7 5 9 12]
ring melody pick(10 notes)
// => [3 0 7 9 12 5 0 7 12 9]
```

## shuffle

Shuffle a ring, influenced by the random seed. Based on the Fisher-Yates shuffle algorithm by Ronald Fisher and Frank Yates in 1938. The algorithm has run time complexity of O(n)

**arguments**
- {Ring} -> Ring to shuffle

```java
set randomSeed 14142

ring samples [hat snare kick tom]
ring shf1 shuffle(samples)
// => [snare tom kick hat]

ring notes [0 3 7 5 9 12]
ring shf2 scramble(notes)
// => [12 0 3 7 5 9]
```

# Transformative Methods

## clone

Duplicate a ring with an offset added to every value

**arguments**
- {IntRing} -> Ring to clone
- {Int, Int2, ... Int-n} -> amount of clones with integer offset

```java
ring notes [0 3 7]
ring melody clone(notes 0 12 7 -7)
// => [0 3 7 12 15 19 7 10 14 -7 -4 0]
```

## combine

Combine rings into one ring. Multiple rings as arguments is possible.

**arguments**
- {Ring-0, Ring-1, ..., Ring-n} -> Ring to combine

```java
ring partA [0 3 7]
ring partB [24 19 12]
ring partC [-7 -3 -5]
ring phrase combine(partA partB partC)
// => [0 3 7 24 19 12 -7 -5 -3]

ring partD [kick hat snare hat]
ring partE [hat hat hat snare]
ring sequence join(partD partE)
// => [kick hat snare hat hat hat hat snare]
```
Alternative: `join()`, `concat()`

## duplicate

Duplicate an array a certain amount of times.

**arguments**
- {Ring} -> Ring to duplicate
- {Int+} -> amount of duplicates (optional, default=2)

```java
ring notes [0 3 7]
ring phrase duplicate(notes 4)
// => [0 3 7 0 3 7 0 3 7 0 3 7]
```

Alternative: `repeat()`, `dup()`

## every

Add zeroes to a ring with a number sequence. The division determines the amount of values per bar. The total length = bars * div. Very useful for rhythms that must occur once in a while, but can also be use for melodic phrases.

**arguments**
- {IntRing} -> Ring to use every n-bars
- {Int} -> amount of bars
- {Int} -> amount of values per bar

```java
ring rhythm [1 0 1 1 0 1 1]
ring sequence every(rhythm 2 8)
// => [1 0 1 1 0 1 1 0 0 0 0 0 0 0 0 0]
```

**arguments**
```java
ring melody [12 19 24 27 24]
ring phrase every(melody 2 8)
// => [12 19 24 27 24 0 0 0 0 0 0 0 0 0 0 0]
```



## thin

```
ring thined thin(<ring>)
```

## palin

```
ring palinated palin(<ring>)
```

## spray

```
ring sprayed spray(<ring-beat> <ring-melody>)
```