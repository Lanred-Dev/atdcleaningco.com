FROM node:24 AS builder

WORKDIR /atdcleaningco.com

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:24-slim AS production

WORKDIR /atdcleaningco.com

COPY --from=builder /atdcleaningco.com/build ./build
COPY package*.json ./

RUN npm ci --omit=dev

CMD ["node", "build"]