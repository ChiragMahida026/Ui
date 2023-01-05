FROM node:14
WORKDIR /srv/app
COPY package*.json  /srv/app
RUN npm install
COPY . /srv/app/
CMD [ "npm", "run", "start" ]