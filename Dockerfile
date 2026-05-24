FROM node:20.12.2-alpine3.18 AS base

# Configuration de pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# Installation de Python et des outils de compilation
RUN apk add --no-cache python3 make g++

FROM base AS build
WORKDIR /app
ADD package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY ./ .
RUN npm run build

FROM base
ENV PORT=3000
ENV NODE_ENV=production
COPY --from=build /app/.output /app/.output
CMD [ "node", "/app/.output/server/index.mjs" ]