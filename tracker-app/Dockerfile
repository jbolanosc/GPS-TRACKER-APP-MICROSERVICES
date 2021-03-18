### STAGE 1: Build ###
FROM node:12 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run ng-high-memory
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/tracker-app /usr/share/nginx/html
EXPOSE 80