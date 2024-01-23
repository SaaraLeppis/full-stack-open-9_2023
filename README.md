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
import ReactDOM from "react-dom/client"
import App from "./App"
ReactDOM.createRoot(document.getElementById("root")).render(<App />)
```

**App.jsx**

```jsx
const App = () => (
  <div>
    <p>Hello world</p>
  </div>
)

export default App
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
