import getTokenCreator from 'spike-get-token';
import * as grpc from  'grpc';
import { SpikeService, ISpikeServer } from '../proto/spike-service/generated/spike_grpc_pb';
import { SpikeToken, GetSpikeTokenRequest } from '../proto/spike-service/generated/spike_pb';

class Server implements ISpikeServer {
    private tokenFunctionMap: Map<string, any>;
    constructor() {
        this.tokenFunctionMap = new Map<string, any>();
    }

    getSpikeToken(call: grpc.ServerUnaryCall<GetSpikeTokenRequest>, callback: grpc.sendUnaryData<SpikeToken>) {
        const audience = call.request.getAudience();
        const grantType = call.request.getGrantType();
        let getToken = this.tokenFunctionMap.get(audience);
        if (!getToken) {
            const options = this.buildOptions(audience, grantType);
            getToken = getTokenCreator(options);
        }
        return getToken();
    }

    private buildOptions(audience: string, grantType: string) {
        return {
            redisHost: process.env.REDIS_URL,
            ClientId: process.env.SPIKE_CLIENT_ID,
            ClientSecret: process.env.SPIKE_CLIENT_SECRET,
            spikeURL: process.env.SPIKE_TOKEN_URL,
            tokenGrantType: grantType,
            tokenAudience: audience,
            tokenRedisKeyName: process.env.PHONEBOOK_REDIS_KEY,
            spikePublicKeyFullPath: '../utils/publickey.pem',
            useRedis: true,
        };
    }
}

function startServer() {
    const server = new grpc.Server();
    const host = '0.0.0.0';
    const port = '8080';

    server.addService(SpikeService, new Server());
    server.bind(`${host}:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();
    console.log(`Server is listening on port ${port}`);
}

startServer();
