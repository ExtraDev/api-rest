# Basic API REST project
This REST API lets you manage projects and tasks.

## Technos
- Nodejs
    - Express
    - Typescript
    - SQlite

## Run the API REST localy
First, rename the file ".env.example" to ".env" in the "src" folder.

The install dependences of the project and run it by using this commands:
```
npm install
npm run dev
```

Then search: http://localhost:3000/tasks

Use postman and import collection "API-REST.postman_collection.json" to test you API.

### Run by using docker-compose
Run the API-REST:
```
docker-compose up -d
```

## Stop the project
To stop the application, simply ctrl + c in the terminal


### Stop by using docker-compose
```
docker-compose down
```

# Deploy
## Build container
```
docker build -t api_container . 

```
## Run container
```
docker run -p 3000:3000 api_container
```

## Running by docker-compose
```
docker-compose up -d
```

If modification added:
```
docker-compose up --build
```