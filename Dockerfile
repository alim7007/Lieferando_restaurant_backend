FROM node:15.10.0-alpine3.10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

EXPOSE 8000

CMD ["pm2-runtime", "./server/server.js"]