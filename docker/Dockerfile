FROM node:22-slim AS builder

RUN apt-get update && apt-get upgrade -y
WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps 

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
