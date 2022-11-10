# function-argument-to-array-map

Enforce function argument to `Array.map()` instead of anonymous function that passes through arguments.

## Rule Details

This rule aims to prevent redundant anonymous functions as arguments to `Array.map()`

Examples of **incorrect** code for this rule:

```js

[].map(arg => someFunc(arg))

```

Examples of **correct** code for this rule:

```js

[].map(someFunc)

```

## When Not To Use It

If you think that providing an anonymous function improves readability.
