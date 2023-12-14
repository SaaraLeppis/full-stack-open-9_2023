## Part 2

### c

create db.json -file to root

start JSON server

```shell
npx json-server --port=3001 --watch db.json
```

install axios (will load to package.json's
"dependencies")

```shell
npm install axios
```

install JSON Server to devDependencies:

```shell
npm install json-server --save-dev
```

add to _package.json_ "scripts"

```json
 "server": "json-server -p3001 --watch db.json"
```

to start JSON server with

```shell
npm run server
```

### Note

"Nykyään lähes kaikki JavaScript-projektit määritellään node "pakkausmanagerin" eli npm:n avulla. Myös Viten avulla generoidut projektit ovat npm-muotoisia projekteja."
