ARG QUB_API_TAG=latest
ARG TSV_FILE=input.tsv

FROM ghcr.io/covince/qub/api:${QUB_API_TAG} as data
ARG TSV_FILE

COPY generate-data-sql.js .
COPY ${TSV_FILE} .

RUN node ./generate-data-sql.js $TSV_FILE

FROM postgres:14-alpine

COPY *.sql /docker-entrypoint-initdb.d/

COPY --from=data /home/node/02-data.sql /docker-entrypoint-initdb.d/
