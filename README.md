This is course repo for University of Helsinki's Full Stack open course

# Vite

## Staring new project

```bash
npm create vite@latest projectname -- --template react
```

... and then

```bash
  cd projectname
  npm install
  npm run dev
```

## Clean project

**Main**

```jsx
import ReactDOM from 'react-dom/client';
import App from './App';
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

**App.jsx**

```jsx
const App = () => (
  <div>
    <p>Hello world</p>
  </div>
);

export default App;
```

**Remove**

- App.css / index.css / assets

## ESLint tool might complain abt props. Add following line to .eslintrc.cjs's **rules**:

'react/prop-types': false

## Notes

### ESLint tool might complain about props.

Add following line to .eslintrc.cjs's **rules**:

```json
'react/prop-types': false
```

### Others

- add components and services under 'src'
- add assets (if used) under 'src'
- favicon.ico under public and following line to index.html
  ```html
  <link rel="icon" type="image/png" href="/favicon.ico" />
  ```

# Express

## res.send, res.json, res.end

source: [Difference by PuntikumarHarsur in Medium](https://medium.com/gist-for-js/use-of-res-json-vs-res-send-vs-res-end-in-express-b50688c0cddf)

### res.send ()

- Buffer, String, Object or Array
- automatically sets **Content-Type** response header (unless otherwise set)
- can send JSON data, and sets Content-Type to app.../json correctly

### res.json()

- Object, Array
- converts non-objects to json, res.json() calls res.send() under the hood

### res.end()

- can be used if we want to end response w/o sending any data
- if we send some data no need to add res.end
- example res.status(404).end();
- does not send ETag Header which in some cases is more efficient

> Conclusion:
>
> - res.json calls res.send at the end,
> - if object or array both can be used,
> - if non objects as response res.json will convert them to objects res.send not (excluding null, undefined ...)
