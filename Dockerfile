FROM node:24 AS base

WORKDIR /atdcleaningco.com

RUN apt-get update && apt-get install -y python3 make g++

FROM base AS builder

WORKDIR /atdcleaningco.com

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS prod-deps

WORKDIR /atdcleaningco.com

COPY package*.json ./
RUN npm ci --omit=dev

FROM node:24-slim AS production

WORKDIR /atdcleaningco.com

COPY --from=builder /atdcleaningco.com/build ./build
COPY --from=prod-deps /atdcleaningco.com/node_modules ./node_modules
COPY --from=builder /atdcleaningco.com/drizzle ./drizzle
COPY --from=builder /atdcleaningco.com/data ./data
COPY --from=builder /atdcleaningco.com/package*.json ./

CMD ["node", "build"]