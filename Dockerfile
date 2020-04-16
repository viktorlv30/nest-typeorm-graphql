FROM node:12.14.0

WORKDIR /opt/api-service

COPY . .

RUN apt-get update \
    && npm install \
    && npm run build \
    && npm prune --production \
    && rm -rf ./src

EXPOSE 3000

CMD npm run start:prod
