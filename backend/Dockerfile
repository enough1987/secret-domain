# ----------- Build Stage -----------
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# ----------- Production Stage -----------
FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY prisma ./prisma
RUN npm install --omit=dev --registry=https://registry.npmjs.org/
RUN npx prisma generate

COPY --from=build /app/dist ./dist
COPY --from=build /app/nest-cli.json ./nest-cli.json

ENV NODE_OPTIONS=--max-old-space-size=512

EXPOSE 3001

CMD ["node", "dist/main.js"]

