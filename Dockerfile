FROM node:26.7.0-alpine3.24
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
