FROM node:20-alpine

WORKDIR /app

COPY . .

RUN rm -rf node_modules

RUN npm install

CMD ["node", "index.js"]