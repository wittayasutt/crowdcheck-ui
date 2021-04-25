FROM node:14-alpine AS base
WORKDIR /base
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD npm run dev
