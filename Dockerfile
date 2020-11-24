FROM node:12

WORKDIR /opt/app

COPY package*.json ./

RUN npm install --production
RUN npm i -g apidoc
RUN mkdir -p logs

ENV PORT=80

COPY . .

CMD [ "npm", "run", "prod" ]