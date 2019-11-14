FROM node:10-alpine

WORKDIR /usr/library_backend

COPY ./ ./

RUN npm install --only=production

# 'shuffle-array' npm-package is needed only for 'init-db:fill' script
RUN npm install -D shuffle-array

CMD npm run init-db:fill ; npm run start
