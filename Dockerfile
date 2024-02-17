FROM node:20.11.1-slim as install

WORKDIR /srv

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . . 

FROM node:20.11.1-slim as build

WORKDIR /srv

COPY --from=install /srv/. .

RUN yarn && yarn build

FROM node:20.11.1-slim as run

WORKDIR /srv

COPY --from=install /srv/. .
COPY --from=build /srv/dist/. .

CMD ["node", "main.js"]
