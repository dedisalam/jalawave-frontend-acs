# GenieACS v1.2 Dockerfile #
############################

FROM node:22.14.0-alpine3.21
LABEL maintainer="admin@jalawave.net.id"

WORKDIR /app
COPY . /app
RUN npm install --omit-dev

CMD ["npm","run","start"]