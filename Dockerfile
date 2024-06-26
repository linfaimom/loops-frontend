FROM harbor.cloud.netease.com/qzlowcode/node:21.7.3-alpine3.20-multi as builder
LABEL MAINTAINER="Marcus Lin" MAIL="linfengxiang01@corp.netease.com"
WORKDIR /root/buildDir/loops-frontend
COPY package.json /root/buildDir/loops-frontend
RUN yarn config set registry https://registry.npmmirror.com/ && yarn install
COPY . /root/buildDir/loops-frontend
RUN yarn build

FROM harbor.cloud.netease.com/qzlowcode/nginx:1.27.0-multi
LABEL MAINTAINER="Marcus Lin" MAIL="linfengxiang01@corp.netease.com"
WORKDIR /usr/share/nginx/loops-frontend
COPY --from=builder /root/buildDir/loops-frontend/dist  /usr/share/nginx/loops-frontend
COPY nginx.conf /etc/nginx/