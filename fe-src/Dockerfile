FROM node:alpine AS builder

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps && mkdir /app && mv ./node_modules ./app
WORKDIR /app
COPY . .
RUN npm run build

FROM nginx:alpine

#!/bin/sh
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 3000

ENTRYPOINT ["nginx", "-g", "daemon off;"]

# WORKDIR /app
# COPY package.json .
# RUN npm install --legacy-peer-deps
# COPY . .

# EXPOSE 3000
# CMD npm start