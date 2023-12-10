# Part 2

Each component declared as separate module already from begining, not as subcomponent to the _Course_ component. All components in src/components-folder.

## to remember

### [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

"To sum up the values contained in an array of objects, you must supply an _initialValue_, so that each item passes through your function."

```js
const sum = objects.reduce(
  (accumulator, currentValue) => accumulator + currentValue.x,
  0
)
```

'objects' is the array of objects.

### [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

- map() creates new array
- provided function will be called on every element in original array

```js
const array1 = [1, 4, 9, 16]

// Pass a function to map
const map1 = array1.map((x) => x * 2)

console.log(map1)
// Expected output: Array [2, 8, 18, 32]
```
