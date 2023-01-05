FROM node:14 as build
WORKDIR /srv/app
COPY package*.json /srv/app
RUN npm install
COPY . /srv/app
RUN npm run build

FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /srv/app/build /usr/share/nginx/html