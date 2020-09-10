FROM node:latest

ENV HOME=/home/pandora

COPY package*.json $HOME/app/

WORKDIR $HOME/app

RUN npm config set unsafe-perm true

RUN npm install --silent --progress=false

RUN npm install -g mocha

COPY . $HOME/app/

EXPOSE 3000

CMD ["npm", "test"]