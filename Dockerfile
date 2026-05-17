# Stage 1: Build the app
FROM node:20-alpine AS build

RUN apk add --no-cache python3 make g++ build-base sqlite-dev

WORKDIR /app

# Copier les fichiers nécessaires et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code et builder le projet
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Stage 2: Run the app
FROM node:20-alpine

WORKDIR /app

# Copier les dépendances construites depuis l'étape de build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/app.js"]