FROM node:12-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
COPY server/ /usr/src/app/server/
RUN npm install

EXPOSE 8888

CMD node ./server/index.js
