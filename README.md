# Basic API REST project
This REST API lets you manage projects and tasks.

## Technos
- Nodejs
    - Express
    - Typescript
- Docker
    - docker-compose
    - mysql
    - phpMyAdmin

## Run the project
First, rename the file ".env.example" to ".env" in the "src" folder.

Run the database and phpMyAdmin with docker by using this command :
```
docker-compose up -d
```

The install dependences of the project and run it by using this commands:
```
npm install
npm run dev
```

Then search: http://localhost:3000/api/tasks

Access to phpMyAdmin by: http://localhost:8080
- user: admin
- password: admin

Use postman and import collection "API-REST.postman_collection.json" to test you API.

## Stop the project
To stop the database base by docker use:
```
docker-compose down
```

To stop the application, simply ctrl + c in the terminal

To reset the database, remove the volume by:
```
docker volume rm api-rest_mysql_data
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