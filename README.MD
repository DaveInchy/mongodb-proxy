# MongoDB Atlas (CRUD) Proxy

this project is based on the edge network that mongodb offers with a free tier to host your document based database.

## Installing

1. Make an `.env` file in the project root.
2. Copy this configuration and paste it in the `.env` file.

    ```env
    MDB_PASS='Password123'
    MDB_USER='GeneRick'
    MDB_CLUSTER='clustercore.hz2kdf.mongodb.net'
    MDB_QUERY='test?retryWrites=true&w=majority'
    ```

    You can get the credentials from your atlas edge account on `https://mongodb.com`

3. Run `$ npm i --include=dev && npm run dev;` to install the dependencies and starts the dev server with hot reloading.

<br>

## Models and state management

Im still working on this, but what i want is models to have access to the database and let express handle itself seperatly, also working on state management between the database documents and these models. must find a way to build data schema's with typescripts `type` namespace.

<br>

## Authentication

Option 1: MongoDB Atlas OAuth Methods with third-party authentication service's.

Option 2: Building Authentication from your users collection within the API endpoints as middleware.

<br>

## Release's

None. This is a private project.
