# Do the npm install or yarn install in the full image
FROM mhart/alpine-node AS builder

RUN apk add --no-cache \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm

WORKDIR /app
COPY . .
RUN yarn

RUN yarn build:local

# And then copy over node_modules, etc from that stage to the smaller base image
FROM mhart/alpine-node:12
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/src/public ./public
EXPOSE 3000
# CMD ["node_modules/.bin/next", "start"]