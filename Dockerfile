FROM node:18.2.0
RUN mkdir -p /app
WORKDIR /app
COPY ./package*.json /app
RUN npm install && npm cache clean --force
COPY ./ /app
EXPOSE 4173
RUN npm run docs:build
CMD ["npm","run","docs:serve"]
