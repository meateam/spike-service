// package: spike
// file: spike.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as spike_pb from "./spike_pb";

interface ISpikeService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getSpikeToken: ISpikeService_IGetSpikeToken;
    validateToken: ISpikeService_IValidateToken;
    validateAuthCodeToken: ISpikeService_IValidateAuthCodeToken;
}

interface ISpikeService_IGetSpikeToken extends grpc.MethodDefinition<spike_pb.GetSpikeTokenRequest, spike_pb.SpikeToken> {
    path: string; // "/spike.Spike/GetSpikeToken"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<spike_pb.GetSpikeTokenRequest>;
    requestDeserialize: grpc.deserialize<spike_pb.GetSpikeTokenRequest>;
    responseSerialize: grpc.serialize<spike_pb.SpikeToken>;
    responseDeserialize: grpc.deserialize<spike_pb.SpikeToken>;
}
interface ISpikeService_IValidateToken extends grpc.MethodDefinition<spike_pb.ValidateTokenRequest, spike_pb.ValidateTokenResponse> {
    path: string; // "/spike.Spike/ValidateToken"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<spike_pb.ValidateTokenRequest>;
    requestDeserialize: grpc.deserialize<spike_pb.ValidateTokenRequest>;
    responseSerialize: grpc.serialize<spike_pb.ValidateTokenResponse>;
    responseDeserialize: grpc.deserialize<spike_pb.ValidateTokenResponse>;
}
interface ISpikeService_IValidateAuthCodeToken extends grpc.MethodDefinition<spike_pb.ValidateAuthCodeTokenRequest, spike_pb.ValidateAuthCodeTokenResponse> {
    path: string; // "/spike.Spike/ValidateAuthCodeToken"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<spike_pb.ValidateAuthCodeTokenRequest>;
    requestDeserialize: grpc.deserialize<spike_pb.ValidateAuthCodeTokenRequest>;
    responseSerialize: grpc.serialize<spike_pb.ValidateAuthCodeTokenResponse>;
    responseDeserialize: grpc.deserialize<spike_pb.ValidateAuthCodeTokenResponse>;
}

export const SpikeService: ISpikeService;

export interface ISpikeServer {
    getSpikeToken: grpc.handleUnaryCall<spike_pb.GetSpikeTokenRequest, spike_pb.SpikeToken>;
    validateToken: grpc.handleUnaryCall<spike_pb.ValidateTokenRequest, spike_pb.ValidateTokenResponse>;
    validateAuthCodeToken: grpc.handleUnaryCall<spike_pb.ValidateAuthCodeTokenRequest, spike_pb.ValidateAuthCodeTokenResponse>;
}

export interface ISpikeClient {
    getSpikeToken(request: spike_pb.GetSpikeTokenRequest, callback: (error: grpc.ServiceError | null, response: spike_pb.SpikeToken) => void): grpc.ClientUnaryCall;
    getSpikeToken(request: spike_pb.GetSpikeTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: spike_pb.SpikeToken) => void): grpc.ClientUnaryCall;
    getSpikeToken(request: spike_pb.GetSpikeTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: spike_pb.SpikeToken) => void): grpc.ClientUnaryCall;
    validateToken(request: spike_pb.ValidateTokenRequest, callback: (error: grpc.ServiceError | null, response: spike_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
    validateToken(request: spike_pb.ValidateTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: spike_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
    validateToken(request: spike_pb.ValidateTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: spike_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
    validateAuthCodeToken(request: spike_pb.ValidateAuthCodeTokenRequest, callback: (error: grpc.ServiceError | null, response: spike_pb.ValidateAuthCodeTokenResponse) => void): grpc.ClientUnaryCall;
    validateAuthCodeToken(request: spike_pb.ValidateAuthCodeTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: spike_pb.ValidateAuthCodeTokenResponse) => void): grpc.ClientUnaryCall;
    validateAuthCodeToken(request: spike_pb.ValidateAuthCodeTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: spike_pb.ValidateAuthCodeTokenResponse) => void): grpc.ClientUnaryCall;
}

export class SpikeClient extends grpc.Client implements ISpikeClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getSpikeToken(request: spike_pb.GetSpikeTokenRequest, callback: (error: grpc.ServiceError | null, response: spike_pb.SpikeToken) => void): grpc.ClientUnaryCall;
    public getSpikeToken(request: spike_pb.GetSpikeTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: spike_pb.SpikeToken) => void): grpc.ClientUnaryCall;
    public getSpikeToken(request: spike_pb.GetSpikeTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: spike_pb.SpikeToken) => void): grpc.ClientUnaryCall;
    public validateToken(request: spike_pb.ValidateTokenRequest, callback: (error: grpc.ServiceError | null, response: spike_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
    public validateToken(request: spike_pb.ValidateTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: spike_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
    public validateToken(request: spike_pb.ValidateTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: spike_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
    public validateAuthCodeToken(request: spike_pb.ValidateAuthCodeTokenRequest, callback: (error: grpc.ServiceError | null, response: spike_pb.ValidateAuthCodeTokenResponse) => void): grpc.ClientUnaryCall;
    public validateAuthCodeToken(request: spike_pb.ValidateAuthCodeTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: spike_pb.ValidateAuthCodeTokenResponse) => void): grpc.ClientUnaryCall;
    public validateAuthCodeToken(request: spike_pb.ValidateAuthCodeTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: spike_pb.ValidateAuthCodeTokenResponse) => void): grpc.ClientUnaryCall;
}
