import * as grpc from  'grpc';
import { SpikeService, ISpikeServer } from '../proto/spike-service/generated/spike_grpc_pb';
import { SpikeToken, GetSpikeTokenRequest } from '../proto/spike-service/generated/spike_pb';
import { ClientId, ClientSecret, redisHost, spikeURL, spikePublicKeyFullPath, host, port } from './config';
import { timingSafeEqual } from 'crypto';
const getTokenCreator = require('spike-get-token');

class Server implements ISpikeServer {
    private tokenFunctionMap: Map<string, any>;
    constructor() {
        this.tokenFunctionMap = new Map<string, any>();
        console.log('Map created');
    }

    async getSpikeToken(call: grpc.ServerUnaryCall<GetSpikeTokenRequest>, callback: grpc.sendUnaryData<SpikeToken>) {
        console.log('Got request');
        const audience = call.request.getAudience();
        const grantType = call.request.getGrantType();
        let getToken = this.tokenFunctionMap.get(audience);
        if (!getToken) {
            const options = this.buildOptions(audience, grantType);
            console.log('Creating getToken function');
            getToken = getTokenCreator(options);
            this.tokenFunctionMap.set(audience, getToken);
        }
        const token = await getToken();
        const spikeToken = new SpikeToken();
        spikeToken.setToken(token);

        callback(null, spikeToken);
        console.log(`Got the token: ${token}`);
        return token;
    }

    private buildOptions(audience: string, grantType: string) {
        return {
            redisHost,
            ClientId,
            ClientSecret,
            spikeURL,
            spikePublicKeyFullPath,
            tokenGrantType: grantType,
            tokenAudience: audience,
            tokenRedisKeyName: `${audience}:token`,
            useRedis: true,
        };
    }
}

function startServer() {
    const server = new grpc.Server();

    server.addService(SpikeService, new Server());
    server.bind(`${host}:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();
    console.log(`Server is listening on port ${port}`);
}

startServer();
