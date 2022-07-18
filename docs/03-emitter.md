# Emitter

Create an emitter object. Use this object to send messages to other platforms. The emitter objects works similarly to the [instruments](./02-instrument.md) in the sense that it also has the `time`, `beat` and `name` functions by default. The `time` determines the time-interval at which messages are send. The `beat` can turn send moments on or off. See under [Synth/Sample](#synthsample-functions) for further detail.

See the shared methods:
- [name](./02-instrument.md#name)
- [group](./02-instrument.md#group)
- [time](./02-instrument.md#time)
- [beat](./02-instrument.md#beat)

## osc

Create an emitter object of type `osc`. The `name(<name>)` method is used to set the opening address of the message to `/<name>`. Any arbitrary function name is used to set as second address in the osc-string. If no name is provided it will default to a unique number for every instrument instance. By adding other functions with any arbitrary name you can send a message with the address in the form of `/<name>/<function> <arguments>`

```java
new emitter osc name(<name>) time(<division><offset>)
```
example
```java
list params [0.25 0.5 0.75]
list values [3 1]

new emitter osc name(myOSC) time(1/4) 
	set myOSC someParam(params) anotherParam(values)

// emits => /myOSC/someParams 0.25
//          /myOSC/anotherParam 3
//          /myOSC/someParams 0.5
//          /myOSC/anotherParam 1
//          /myOSC/someParams 0.75
//          /myOSC/anotherParam 3
//          /myOSC/someParams 0.25
//          etc...
```

The messages also support multiple arguments up to a length of 256. Multiple arguments can be provided as rings, symbols, floats or integers.

```java
list val1 [0.25 0.5 0.75]
list val2 [3 1]

new emitter osc name(myOSC) time(1/4)
	set myOSC aMessage(0.1 val1 val2 100)

// emits => /myOSC/aMessage 0.1 0.25 3 100
//          /myOSC/aMessage 0.1 0.5 1 100
//          /myOSC/aMessage 0.1 0.75 3 100
//          /myOSC/aMessage 0.1 0.25 1 100
//          etc...
```

**Note:** Some variable names are not allowed because they are part of the built-in names for datastructures. These are: `bang, int, float, list, mode, zlclear, zlmaxsize`

## name

Set the name for the OSC emitter. This can be any string of 2 or more characters. The `name` is used as reference to the instrument when the `set` method is used to call methods for a specific object. The `name` is also prepended as first address in the osc-message of the format `/<name>/<function> argument`.

## address

Alternatively, if you want multiple emitters to send to the same address, you can use the `address()` method. The `address` is prepended as first address in the osc-message in the format: `/<address>/<function> argument`. Useful if you want to send messages to the same address, but with different timing-intervals.

```java
list params [0.25 0.5 0.75]
list values [3 1 4]

new emitter osc name(osc1) address(myOSC) time(1/4) 
	set osc1 someParam(params)

new emitter osc name(osc2) address(myOSC) time(1/2)
	set osc2 anotherParam(values)

// emits => /myOSC/someParams 0.25
//          /myOSC/someParams 0.5
//          /myOSC/anotherParam 3
//          /myOSC/someParams 0.75
//          /myOSC/someParams 0.25
//          /myOSC/anotherParam 1
//          etc...
```

## sendOSC

You can enable/disable sending messages with the sendOSC function

```java
new emitter osc name(osc3) sendOSC(0)
```

## receiving

You can use osc adresses as arguments for other functions by putting the address as argument in the form: `/<address>/<tag>/<etc.>`. For example to control the `gain()` of a `sample` and the `note()` value of a `synth` enter the following:

```java
new sample kick_909 time(1/4) gain(/myOSC/sliderValue1)
new synth saw note(/myOSC/sliderValue2) shape(1 100) time(1/8)
```

It is possible to scale the incoming osc value to a different range by using `{}` after the address inputting a low and high output range separated by a colon `:`. The scaling function considers an incoming range of `0 - 1` floatingpoint values. For example to control the `note()` and `shape()` ranges in a `synth` enter the following:

```java
new synth saw note(/myOsc/sliderValue3{2:19} 0) shape(1 /myOsc/sliderValue4{50:500}) 
// => converts incoming slider values from 0-1 to 2-19 for note and 0-1 to 50-500 for note length
```