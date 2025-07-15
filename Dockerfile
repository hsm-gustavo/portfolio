# Stage 1: base
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Stage 2: dependencies
FROM base AS deps

COPY package.json pnpm-lock.yaml* .npmrc* ./

RUN corepack enable && pnpm install --frozen-lockfile

# Stage 3: build
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable && pnpm run build

# Stage 4: runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]