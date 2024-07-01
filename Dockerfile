FROM node:21.7.3-alpine3.20 as builder
LABEL MAINTAINER="Marcus Lin" MAIL="linfengxiang01@corp.netease.com"
WORKDIR /root/buildDir/loops-frontend
COPY package.json /root/buildDir/loops-frontend
RUN --mount=type=cache,target=/root/.cache/npm-cache yarn config set registry https://registry.npmmirror.com/ && yarn install
COPY . /root/buildDir/loops-frontend
RUN yarn build

FROM nginx:latest
LABEL MAINTAINER="Marcus Lin" MAIL="linfengxiang01@corp.netease.com"
WORKDIR /usr/share/nginx/loops-frontend
COPY --from=builder /root/buildDir/loops-frontend/dist  /usr/share/nginx/loops-frontend
COPY nginx.conf /etc/nginx/