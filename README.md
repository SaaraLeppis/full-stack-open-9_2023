# Part 9. **TypeScript**

_learning basics and more_

This is [the TypeScript part](https://fullstackopen.com/en/part9) of [Full Stack open course](https://fullstackopen.com/en/#course-contents) <br>
Fun to learn - both front and backend

TypeScript's official playground can be found [here](https://www.typescriptlang.org/play)

## starting project by installing dependencies

```shell
npm install --save-dev ts-node typescript
```

_ts-node_ and _typescript_ can also be installed **globally** by

```shell
npm install --location=global ts-node typescript
```

## tsconfig.json

used to define how the TypeScript compiler should interpret the code.

- [noImplicitAny](https://www.typescriptlang.org/tsconfig#noImplicitAny)

## React with types

start project by

```shell
npm create vite@latest app-name -- --template react-ts
```

run app by

```shell
npm run dev
```

- .jsx files are now .tsx files

- Generally props are defined as **interface**
- React components' return type does not have to be defined as the TypeScript compiler infers the type automatically

### Defining **state**

```typescript
const [notes, setNotes] = useState<Note[]>([]);
```

#### Hint

1.  way to find type of event:
    write event handler inline and hover over the 'event',
    for example:

> ```html
> <form onSubmit={event => console.log(event)}>
> ```

## express with ts

Install

```shell
npm install express
npm install --save-dev @types/express
```

start script to _package.json_

```json
{
  // ..
  "scripts": {
    // ..
    "start": "ts-node index.ts"
  }
  //..
}
```

_index.ts_

```js
import express from 'express';
// const express = require('express');
const app = express();

app.get('/ping', (_req, res) => {
  // _req as req not used
  res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

remember to install **Nodemon**

```shell
npm install --save-dev ts-node-dev
```

and adding script to _package.json_

```json
{
  // ...
  "scripts": {
    // ...
    "dev": "ts-node-dev index.ts"
  }
  // ...
}
```

**... and finally** runing the program

```shell
npm run dev
```

## Other notes

Better understanding of TypeScript in general,
type narrowing (instanceof)

Array can be defined in 2 ways

```typescript
let values: numbers[]; // more used
let otherValues: Array<number>;
```

### Utility types

- **Pick and Omit**
  for example Omit<Type, Keys> (Type is forexample interface, Keys are literals that will be omitted / left out)
  remember that **for unions Omits** special Omit-like function needed!!!
  example:

```tsx
// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
type EntryWithoutId = UnionOmit<Entry, 'id'>;
```

### Other stuff

- **Optional properties** can be marked with _?_ after the property name
- **Type guards** are functions returning booleans and check that for example string (isString()) is string, used for type narrowing
- **type _unions_** A union type is a type formed from two or more other types, representing values that may be any one of those types. Each of these types are refered as union's _member_.
- good way to make type narrowing in union types in _switch case_ expression
  > remember [exhaustive checking](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking)
- communicating with server:  
  **remember to define the parameter** after .get / .post etc (as <Note[]> in below example )

  ```typescript
  useEffect(() => {
    axios.get<Note[]>('http://localhost:3001/notes').then(response => {
      setNotes(response.data);
    });
  }, []);
  ```
