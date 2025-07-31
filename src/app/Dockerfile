# Estágio de construção
FROM node:18 as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Estágio de produção
FROM nginx:alpine
COPY --from=build /app/dist/frontend-creditos /usr/share/nginx/html
EXPOSE 80