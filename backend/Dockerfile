# ----------- Build Stage -----------
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build --loglevel verbose

# ----------- Production Stage -----------
FROM node:22-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/db.json ./db.json
COPY --from=build /app/nest-cli.json ./nest-cli.json

EXPOSE 3001

CMD ["node", "dist/main.js"]

