FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system demo && \
  adduser --system -G demo demo

COPY dist/apps/demo demo
RUN chown -R demo:demo .

RUN npm --ignore-scripts --omit=dev -f install

CMD [ "node", "auto" ]
