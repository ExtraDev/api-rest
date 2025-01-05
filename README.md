# Basic API REST project

## Technos
- Nodejs
    - Express
    - Typescript
- Docker
    - docker-compose
    - mysql
    - phpMyAdmin

## Run the project
First, rename the file ".env.example" to ".env"

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