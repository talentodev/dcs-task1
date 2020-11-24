FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm i -g apidoc
RUN mkdir -p logs

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "prod" ]