FROM nginx:1.16.0-alpine

WORKDIR /root
LABEL key="Csilleri Zoltan<zcsilleri@gmail.com>" 

RUN apk update
RUN apk add openrc