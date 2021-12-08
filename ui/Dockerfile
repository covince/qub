FROM node:lts-alpine as build
USER node
WORKDIR /home/node
COPY . .
ARG TRUSTED_QUERY_PARAM_ORIGINS
ENV TRUSTED_QUERY_PARAM_ORIGINS=$TRUSTED_QUERY_PARAM_ORIGINS
RUN yarn --production && yarn build

FROM nginx:stable-alpine
COPY --from=build /home/node/dist /usr/share/nginx/html
COPY default.conf.template /etc/nginx/templates/
