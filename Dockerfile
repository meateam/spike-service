FROM node:10.15-alpine
RUN GRPC_HEALTH_PROBE_VERSION=v0.3.0 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:10.15-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=0 /bin/grpc_health_probe /bin/grpc_health_probe
COPY --from=0 /usr/src/app/package.json /usr/src/app/package-lock.json ./
COPY --from=0 /usr/src/app/dist ./dist
COPY --from=0 /usr/src/app/proto ./proto
COPY --from=0 /usr/src/app/utils ./utils
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]
