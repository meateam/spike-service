import * as grpc from  'grpc';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { SpikeService, ISpikeServer } from '../proto/spike-service/generated/spike_grpc_pb';
import { SpikeToken, GetSpikeTokenRequest, ValidateTokenResponse, ValidateTokenResquest } from '../proto/spike-service/generated/spike_pb';
import { ClientId, ClientSecret, redisHost, spikeURL, spikePublicKeyFullPath, host, port, selfAudience } from './config';
const getTokenCreator = require('spike-get-token');

class Server implements ISpikeServer {
    private tokenFunctionMap: Map<string, any>;
    private spikeKey: Buffer;

    constructor() {
        this.tokenFunctionMap = new Map<string, any>();
        this.spikeKey = fs.readFileSync(spikePublicKeyFullPath);
    }

    async getSpikeToken(call: grpc.ServerUnaryCall<GetSpikeTokenRequest>, callback: grpc.sendUnaryData<SpikeToken>) {
        const audience = call.request.getAudience();
        const grantType = call.request.getGrantType();
        console.log(`Getting token for audience = ${audience}, grant_type = ${grantType}`);
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

    validateToken(call: grpc.ServerUnaryCall<ValidateTokenResquest>, callback: grpc.sendUnaryData<ValidateTokenResponse>) {
        const token = call.request.getToken();
        console.log(`Checking token = ${token}`);

        const audience = call.request.getAudience() || selfAudience;
        jwt.verify(token, this.spikeKey, { audience }, (err, decoded: any) => {
            const response = new ValidateTokenResponse();
            if (err) {
                console.log(err);
                response.setValid(false);
                response.setMessage(err.message);
                return callback(null, response);
            }
            if (decoded.scope) {
                console.log(`The scopes are: ${decoded.scope}`);
                response.setValid(true);
                response.setScopesList(decoded.scope);
                return callback(null, response);
            }
            console.log('Unexpected Error');
            const e: grpc.ServiceError = {
                code: grpc.status.INTERNAL,
                message: 'Unexpected Error',
                name: 'Unexpected error',
            };
            return callback(e, null);
        });

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
