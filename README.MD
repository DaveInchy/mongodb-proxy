# MongoDB Atlas (CRUD) Proxy

this project is based on the edge network that mongodb offers with a free tier to host your document based database.

## Installing

1. Make an `.env` file in the project root.
2. Copy this configuration and paste it in the `.env` file.

    ```env
    AUTH_KEY=your_static_secret_key
    ```

3. Run `$ npm i --include=dev && npm run dev;` to install the dependencies and starts the dev server with hot reloading.

<br>

# Build Redistributables
```bash
npm run build
```

# Using the api

## 1. Key-Value Pair Tables
### CREATE
```bash
curl -X POST http://localhost:8080/api/kv/table/mytable \
-H "Bearer: <YOUR_AUTH_KEY>"
```

### DELETE
```bash
curl -X DELETE http://localhost:8080/api/kv/table/mytable \
-H "Bearer: <YOUR_AUTH_KEY>"
```
<hr></hr>

## 2. Key-Value Pairs
### LIST 
```bash
curl -X GET http://localhost:8080/api/kv/mytable \
-H "Bearer: <YOUR_AUTH_KEY>"
```

### CREATE
```bash
curl -X POST http://localhost:8080/api/kv/mytable/mykey \
-H "Content-Type: application/json" -H "Bearer: <YOUR_AUTH_KEY>" -d '{"value":"some value"}'
```

### READ
```bash
curl -X GET http://localhost:8080/api/kv/mytable/mykey \
-H "Bearer: <YOUR_AUTH_KEY>"
```

### UPDATE
```bash
curl -X PUT http://localhost:8080/api/kv/mytable/mykey \
-H "Content-Type: application/json" \
-H "Bearer: <YOUR_AUTH_KEY>" -d '{"value":"new value"}'
```

### DELETE
```bash
curl -X DELETE http://localhost:8080/api/kv/mytable/mykey \
-H "Bearer: <YOUR_AUTH_KEY>"
```

Signed by Dave.