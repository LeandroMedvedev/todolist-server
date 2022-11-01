FROM node

RUN apt-get update

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . /app
