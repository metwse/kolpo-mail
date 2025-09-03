FROM node:22-alpine

COPY . .
RUN echo "BACKEND_URL = /api" > .env

RUN npm i
RUN npm i -g serve

RUN npm run build

CMD serve -s dist
