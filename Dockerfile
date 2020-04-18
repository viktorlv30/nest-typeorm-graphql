FROM node:12.14.0

WORKDIR /opt/api-service

COPY . .

RUN apt-get update \
    && npm install --only=production

EXPOSE 4999

CMD ["npm", "run", "start"]
