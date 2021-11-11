FROM node:14-alpine AS builder

WORKDIR /app

COPY . /app

ENV LANG en_US.utf8

# Install project dependencies
RUN npm ci && \
    npm run test && \
    npm run release

FROM node:14-alpine AS runtime

ENV NODE_ENV=production
ENV PM2_HOME=/app/.pm2

EXPOSE 8443

WORKDIR /app

COPY --from=builder \
    /app/package.json \
    /app/package-lock.json \
    /app/.pm2-docker.json \
    ./

RUN npm ci --production && \
    npm cache clean --force && \
    mkdir databases

COPY --from=builder /app/dist dist

RUN chown -R node:"$(id -u node)" /app

USER node

CMD ["npm", "run", "start-docker"]
