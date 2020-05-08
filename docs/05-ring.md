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

- [Generative Methods](#generative-methods)
- [Algorithmic Methods](#algorithmic-methods)
	- Euclidean Rhythm
	- Hexadecimal Rhythm
	- Fibonacci, Lucas, Pell Numbers
	- Lindenmayer System (coming soon)
- Stochastic Methods (wip)
- Transformative Methods (wip)
- Translate Methods (wip)

# Param Explanation

**Values**

- `Value` -> Number or String
	- `Number` -> Int+, Int or Float
		- `Int+` -> A positive whole number, bigger than 0
		- `Int` -> A whole number, negative or positive, including 0
		- `Float` -> A floating-point number, negative or positive, including 0
	- `String` -> A combination of letter-characters, may include capital letter, underscores and digits, but may not start with a digit

**Rings**

- `Ring` -> A ring with `Value`'s
	- `NumberRing` -> A ring with `Number`'s
		- `IntRing+` -> A ring with `Int+`'s
		- `IntRing` -> A ring with `Int`'s
		- `FloatRing` -> A ring with `Float`'s
	- `StringRing` -> A ring with `String`'s

# Generative Methods

## spread / spreadFloat

Generate a ring of n-length of evenly spaced values between a starting number up untill (but excluding) the 3th argument.

**params**
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

**params**
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

**params**
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

**params**
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

**params**
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

## Algorithmic Methods



## random

```
ring myRing random(<listlength> <low-bound> <high-bound>)
```

## randomFloat

```
ring myRing randomFloat(<listlength> <low-bound> <high-bound>)
```

## euclid

```
ring myRing euclid(<listlength> <amount-of-hits> <rotate>)
```

# Ring Methods Transformational

## join

```
ring joined join(<ring1> <ring2> ... <ring-n>)
```

## thin

```
ring thined thin(<ring>)
```

## palin

```
ring palinated palin(<ring>)
```

## duplicate

```
ring duped duplicate(<ring> <amount>)
```

## clone

```
ring cloned clone(<ring> <dup-offset1> <dup-offset2> ... <dup-offset-n>) 
```

## spray

```
ring sprayed spray(<ring-beat> <ring-melody>)
```

## every

```
ring sometimes every(<ring> <when> <beat-division>)
```

