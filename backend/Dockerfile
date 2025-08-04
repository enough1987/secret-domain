# ----------- Build Stage -----------
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json ./
RUN npm install --registry=https://registry.npmjs.org/

COPY . .

RUN npx prisma generate
RUN npm run build

# ----------- Production Stage -----------
FROM node:22-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev --registry=https://registry.npmjs.org/

COPY --from=build /app/dist ./dist
COPY --from=build /app/nest-cli.json ./nest-cli.json
COPY --from=build /app/generated ./generated

ENV NODE_OPTIONS=--max-old-space-size=512

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]

