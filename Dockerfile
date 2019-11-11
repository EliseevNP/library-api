FROM node:10-alpine
WORKDIR /usr/library_backend
COPY ./ ./
RUN npm install --only=production
CMD npm run init-db:fill ; npm run start
