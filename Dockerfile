# Stage 1: Build the app
FROM node:18-alpine AS build

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

# Copier package.json pour pouvoir installer les dépendances de prod
COPY package*.json ./
RUN npm install

# Copier les fichiers buildés depuis l'étape précédente
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/app.js"]