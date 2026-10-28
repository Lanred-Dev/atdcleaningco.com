FROM node:24 AS builder

WORKDIR /atdcleaningco.com

RUN apt-get update && apt-get install -y python3 make g++

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

RUN npm ci --omit=dev

FROM node:24-slim AS production

WORKDIR /atdcleaningco.com

COPY --from=builder /atdcleaningco.com/build ./build
COPY --from=builder /atdcleaningco.com/node_modules ./node_modules
COPY package*.json ./

CMD ["node", "build"]