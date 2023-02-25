FROM --platform=$BUILDPLATFORM node:18-alpine AS base_build
FROM --platform=$TARGETPLATFORM node:18-alpine AS base_target



FROM base_build AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci



FROM base_build AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build



FROM base_target AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app .

USER nextjs

CMD ["npm", "run", "start"]
