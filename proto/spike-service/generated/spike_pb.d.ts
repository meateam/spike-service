// package: spike
// file: spike.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Client extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getSecret(): string;
    setSecret(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Client.AsObject;
    static toObject(includeInstance: boolean, msg: Client): Client.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Client, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Client;
    static deserializeBinaryFromReader(message: Client, reader: jspb.BinaryReader): Client;
}

export namespace Client {
    export type AsObject = {
        id: string,
        secret: string,
    }
}

export class GetSpikeTokenRequest extends jspb.Message { 
    getGrantType(): string;
    setGrantType(value: string): void;

    getAudience(): string;
    setAudience(value: string): void;


    hasClient(): boolean;
    clearClient(): void;
    getClient(): Client | undefined;
    setClient(value?: Client): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSpikeTokenRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetSpikeTokenRequest): GetSpikeTokenRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSpikeTokenRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSpikeTokenRequest;
    static deserializeBinaryFromReader(message: GetSpikeTokenRequest, reader: jspb.BinaryReader): GetSpikeTokenRequest;
}

export namespace GetSpikeTokenRequest {
    export type AsObject = {
        grantType: string,
        audience: string,
        client?: Client.AsObject,
    }
}

export class SpikeToken extends jspb.Message { 
    getToken(): string;
    setToken(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SpikeToken.AsObject;
    static toObject(includeInstance: boolean, msg: SpikeToken): SpikeToken.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SpikeToken, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SpikeToken;
    static deserializeBinaryFromReader(message: SpikeToken, reader: jspb.BinaryReader): SpikeToken;
}

export namespace SpikeToken {
    export type AsObject = {
        token: string,
    }
}
