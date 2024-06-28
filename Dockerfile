FROM node:21.7.3-alpine3.20
LABEL MAINTAINER="Marcus Lin" MAIL="linfengxiang01@corp.netease.com"
WORKDIR /root/buildDir/loops-frontend
COPY . /root/buildDir/loops-frontend
RUN yarn config set registry https://registry.npmmirror.com/ && yarn install && yarn build
ENTRYPOINT yarn serve