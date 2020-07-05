import axios from 'axios';
import * as grpc from 'grpc';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { GrpcHealthCheck, HealthCheckResponse, HealthService } from 'grpc-ts-health-check';
import { SpikeService, ISpikeServer } from '../proto/spike-service/generated/spike_grpc_pb';
import * as C from './config';
import {
    SpikeToken,
    User,
    GetSpikeTokenRequest,
    ValidateTokenResponse,
    ValidateTokenRequest,
    ValidateAuthCodeTokenRequest,
    ValidateAuthCodeTokenResponse,
    Client,
} from '../proto/spike-service/generated/spike_pb';
const getTokenCreator = require('spike-get-token');

const StatusesEnum = HealthCheckResponse.ServingStatus;

const healthCheckStatusMap = {
    '': StatusesEnum.UNKNOWN,
    serviceName: StatusesEnum.UNKNOWN,
};
const serviceNames: string[] = ['', 'spike.spikeService'];

// Boolean describing if spike public key was obtained.
let isSPBK: boolean = true;

// Boolean describing if spike public key was obtained.
let isRedisOK: boolean = true;

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
        if (!fs.existsSync(C.localSpikePublicKeyFullPath)) {
            try {
                const response = await axios.get(C.spikePubKeyPath);
                // Checking if the response is ok
                if (response.status === 200) {
                    // In 'axios' the body of the response is in 'data' property, the response should contain the raw file,
                    // so we just need to save it.

                    // Saving the public key locally
                    fs.appendFileSync(C.localSpikePublicKeyFullPath, response.data);
                    console.log(`spike pubkey successfully obtained , and saved to path ${C.localSpikePublicKeyFullPath}`);
                    isSPBK = true;
                } else {
                    console.log(`an error occured! ${response.status}`);
                    isSPBK = false;
                }
            } catch (err) {
                console.log('getSpikePubKey caught error!');
                console.log(err);
                isSPBK = false;
            }
        }
        this.spikeKey = fs.readFileSync(C.localSpikePublicKeyFullPath);
        console.log(`spike pubkey found in local files in: ${C.localSpikePublicKeyFullPath}`);
        console.log(this.spikeKey);
        isSPBK = true;
    }

    // getSpikeToken retruns a JWT token from Spike by a givven audience, grantType and client.
    async getSpikeToken(call: grpc.ServerUnaryCall<GetSpikeTokenRequest>, callback: grpc.sendUnaryData<SpikeToken>) {
        try {
            const audience = call.request.getAudience();
            const grantType = call.request.getGrantType() || C.grantTypeDef;
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
            isRedisOK = true;
            return token;

        } catch (err) {
            isRedisOK = false;
            console.log('an error occurred while getting spike token:');
            console.log(err);
        }
    }

    // validateToken validates a givven client-credentials token.
    validateToken(call: grpc.ServerUnaryCall<ValidateTokenRequest>, callback: grpc.sendUnaryData<ValidateTokenResponse>) {
        const token = call.request.getToken();
        console.log(`Checking token = ${token}`);

        const audience = call.request.getAudience() || C.selfAudience;
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

    // validateAuthCodeToken validates a givven authorization-code token.
    // Returns the scope-list and the subject (user).
    validateAuthCodeToken(
        call: grpc.ServerUnaryCall<ValidateAuthCodeTokenRequest>,
        callback: grpc.sendUnaryData<ValidateAuthCodeTokenResponse>) {

        const token = call.request.getToken();
        const audience = call.request.getAudience() || C.selfAudience;
        console.log(`Checking auth-code token = ${token}`);

        jwt.verify(token, this.spikeKey, { audience }, (err, decoded: any) => {
            const response = new ValidateAuthCodeTokenResponse();
            if (err) {
                console.log(`Error + ${err}`);
                response.setValid(false);
                response.setMessage(err.message);
                return callback(null, response);
            }
            if (decoded.scope) {
                console.log(`The scopes are: ${decoded.scope}`);
                response.setValid(true);
                response.setScopesList(decoded.scope);
            }
            if (decoded.user) {
                const user = new User();
                const id = decoded.user.genesisId;
                const firstName = decoded.user.name.firstName || ' ';
                const lastName = decoded.user.name.lastName || ' ';
                user.setId(id);
                user.setFirstname(firstName);
                user.setLastname(lastName);

                response.setUser(user);
            }
            response.setAlias(decoded.clientId);
            return callback(null, response);
        });
    }

    private buildOptions(audience: string, grantType: string, reqClient: Client | undefined) {

        const ClientId = reqClient?.getId() || C.clientId;
        const ClientSecret = reqClient?.getSecret() || C.clientSecret;

        return {
            ClientId,
            ClientSecret,
            redisHost: C.redisHost,
            spikeURL: C.spikeURL,
            spikePublicKeyFullPath: C.localSpikePublicKeyFullPath,
            tokenGrantType: grantType,
            tokenAudience: audience,
            tokenRedisKeyName: `${audience}:token`,
            useRedis: true,
        };
    }

}

export const grpcHealthCheck = new GrpcHealthCheck(healthCheckStatusMap);

function startServer() {
    const server = new grpc.Server();
    const spikeServer = new Server();

    // Register SpikeService
    server.addService(SpikeService, spikeServer);

    // Register the health service
    server.addService(HealthService, grpcHealthCheck);

    setInterval(
        function () {
            const currStatus = (isSPBK && isRedisOK) ? StatusesEnum.SERVING : StatusesEnum.NOT_SERVING;
            setHealthStatus(spikeServer, currStatus);
        },
        1000);

    // setHealthStatus(spikeServer, HealthCheckResponse.ServingStatus.SERVING);
    server.bind(`${C.host}:${C.port}`, grpc.ServerCredentials.createInsecure());
    server.start();
    console.log(`Server is listening on port ${C.port}`);
}

function setHealthStatus(server: Server, status: number): void {
    for (let i = 0; i < serviceNames.length; i++) {
        grpcHealthCheck.setStatus(serviceNames[i], status);
    }
}

startServer();
