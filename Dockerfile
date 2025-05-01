FROM node:23-alpine

RUN npm install -g nodemon ts-node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY  . .

RUN ./node_modules/.bin/prisma generate

EXPOSE 5001

CMD [ "npm","run","dev"]