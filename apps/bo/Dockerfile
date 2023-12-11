FROM node:18-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install --global turbo
COPY . .
RUN turbo prune bo --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lockjson
RUN npm install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN  npx turbo run build --filter=bo

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs

COPY --from=installer ./app .
WORKDIR /app/apps/bo

CMD [ "node", ".output/server/index.mjs" ]
