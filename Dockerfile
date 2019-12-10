FROM node:10.15-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:10.15-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app/package.json /usr/src/app/package-lock.json ./
COPY --from=0 /usr/src/app/dist ./dist
COPY --from=0 /usr/src/app/proto ./proto
COPY --from=0 /usr/src/app/proto ./utils
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]
