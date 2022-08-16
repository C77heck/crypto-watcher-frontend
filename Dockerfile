FROM node:16

MAINTAINER Csilleri Zoltan <zcsilleri@gmail.com>

WORKDIR /var/www

COPY package*.json ./

RUN npm install

COPY . .

# we set the port to run the application
ENV PORT=34558
# expose the port where the application is running
EXPOSE 34558
# docker run -p 34558:34558 -d <containerID>

CMD [ "npm", "start" ]

# docker build -t <image-name/and-tag> .
