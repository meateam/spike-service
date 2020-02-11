import axios from 'axios';
import * as grpc from  'grpc';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { SpikeService, ISpikeServer } from '../proto/spike-service/generated/spike_grpc_pb';
import { SpikeToken, GetSpikeTokenRequest, ValidateTokenResponse, ValidateTokenRequest, Client } from '../proto/spike-service/generated/spike_pb';
import { clientId, clientSecret, redisHost, spikeURL, localSpikePublicKeyFullPath,
     host, port, selfAudience, grantTypeDef, spikePubKeyPath } from './config';
const getTokenCreator = require('spike-get-token');

class Server implements ISpikeServer {
    private tokenFunctionMap: Map<string, any>;
    private spikeKey: Buffer;

    constructor() {
        this.tokenFunctionMap = new Map<string, any>();
        this.spikeKey = new Buffer('');
        this.getSpikePubKey();
    }

    // Function for saving OSpike Public Key locally
    private async getSpikePubKey() {
        if (!fs.existsSync(localSpikePublicKeyFullPath)) {
            try {
                const response = await axios.get(spikePubKeyPath);
                // Checking if the response is ok
                if (response.status === 200) {
                    // In 'axios' the body of the response is in 'data' property, the response should contain the raw file,
                    // so we just need to save it.

                    // Saving the public key locally
                    fs.appendFileSync(localSpikePublicKeyFullPath, response.data);
                    this.spikeKey = fs.readFileSync(localSpikePublicKeyFullPath);
                    console.log(`spike pubkey successfully obtained , and saved to path ${localSpikePublicKeyFullPath}`);
                } else {
                    console.log(`an error occured! ${response.status}`);
                }
            } catch (err) {
                console.log('getSpikePubKey caught error!');
                console.log(err);
            }
        }
    }

    async getSpikeToken(call: grpc.ServerUnaryCall<GetSpikeTokenRequest>, callback: grpc.sendUnaryData<SpikeToken>) {
        const audience = call.request.getAudience();
        const grantType = call.request.getGrantType() || grantTypeDef;
        const client = call.request.getClient();
        console.log(`Getting token for audience = ${audience}, grant_type = ${grantType}`);
        let getToken = this.tokenFunctionMap.get(audience);
        if (!this.tokenFunctionMap.get(audience)) {
            const options = this.buildOptions(audience, grantType, client);
            console.log(`Creating getToken function for audience = ${options.tokenAudience}`);
            getToken = getTokenCreator(options);
            this.tokenFunctionMap.set(audience, getTokenCreator(options));
        }
        const token = await getToken();
        const spikeToken = new SpikeToken();
        spikeToken.setToken(token);

        callback(null, spikeToken);
        console.log(`Got the token: ${token}`);
        return token;
    }

    validateToken(call: grpc.ServerUnaryCall<ValidateTokenRequest>, callback: grpc.sendUnaryData<ValidateTokenResponse>) {
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

    private buildOptions(audience: string, grantType: string, reqClient: Client | undefined) {

        const ClientId =  reqClient?.getId() || clientId;
        const ClientSecret = reqClient?.getSecret() || clientSecret;

        return {
            redisHost,
            ClientId,
            ClientSecret,
            spikeURL,
            localSpikePublicKeyFullPath,
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
