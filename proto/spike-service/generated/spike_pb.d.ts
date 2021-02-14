// package: spike
// file: spike.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Client extends jspb.Message { 
    getId(): string;
    setId(value: string): Client;

    getSecret(): string;
    setSecret(value: string): Client;


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
    setGrantType(value: string): GetSpikeTokenRequest;

    getAudience(): string;
    setAudience(value: string): GetSpikeTokenRequest;


    hasClient(): boolean;
    clearClient(): void;
    getClient(): Client | undefined;
    setClient(value?: Client): GetSpikeTokenRequest;


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
    setToken(value: string): SpikeToken;


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

export class ValidateTokenRequest extends jspb.Message { 
    getToken(): string;
    setToken(value: string): ValidateTokenRequest;

    getAudience(): string;
    setAudience(value: string): ValidateTokenRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidateTokenRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ValidateTokenRequest): ValidateTokenRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidateTokenRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidateTokenRequest;
    static deserializeBinaryFromReader(message: ValidateTokenRequest, reader: jspb.BinaryReader): ValidateTokenRequest;
}

export namespace ValidateTokenRequest {
    export type AsObject = {
        token: string,
        audience: string,
    }
}

export class ValidateTokenResponse extends jspb.Message { 
    getValid(): boolean;
    setValid(value: boolean): ValidateTokenResponse;

    clearScopesList(): void;
    getScopesList(): Array<string>;
    setScopesList(value: Array<string>): ValidateTokenResponse;
    addScopes(value: string, index?: number): string;

    getMessage(): string;
    setMessage(value: string): ValidateTokenResponse;

    getAlias(): string;
    setAlias(value: string): ValidateTokenResponse;


    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): ValidateTokenResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidateTokenResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ValidateTokenResponse): ValidateTokenResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidateTokenResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidateTokenResponse;
    static deserializeBinaryFromReader(message: ValidateTokenResponse, reader: jspb.BinaryReader): ValidateTokenResponse;
}

export namespace ValidateTokenResponse {
    export type AsObject = {
        valid: boolean,
        scopesList: Array<string>,
        message: string,
        alias: string,
        user?: User.AsObject,
    }
}

export class ValidateAuthCodeTokenRequest extends jspb.Message { 
    getToken(): string;
    setToken(value: string): ValidateAuthCodeTokenRequest;

    getAudience(): string;
    setAudience(value: string): ValidateAuthCodeTokenRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidateAuthCodeTokenRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ValidateAuthCodeTokenRequest): ValidateAuthCodeTokenRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidateAuthCodeTokenRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidateAuthCodeTokenRequest;
    static deserializeBinaryFromReader(message: ValidateAuthCodeTokenRequest, reader: jspb.BinaryReader): ValidateAuthCodeTokenRequest;
}

export namespace ValidateAuthCodeTokenRequest {
    export type AsObject = {
        token: string,
        audience: string,
    }
}

export class ValidateAuthCodeTokenResponse extends jspb.Message { 
    getValid(): boolean;
    setValid(value: boolean): ValidateAuthCodeTokenResponse;

    clearScopesList(): void;
    getScopesList(): Array<string>;
    setScopesList(value: Array<string>): ValidateAuthCodeTokenResponse;
    addScopes(value: string, index?: number): string;

    getMessage(): string;
    setMessage(value: string): ValidateAuthCodeTokenResponse;

    getAlias(): string;
    setAlias(value: string): ValidateAuthCodeTokenResponse;


    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): ValidateAuthCodeTokenResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidateAuthCodeTokenResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ValidateAuthCodeTokenResponse): ValidateAuthCodeTokenResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidateAuthCodeTokenResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidateAuthCodeTokenResponse;
    static deserializeBinaryFromReader(message: ValidateAuthCodeTokenResponse, reader: jspb.BinaryReader): ValidateAuthCodeTokenResponse;
}

export namespace ValidateAuthCodeTokenResponse {
    export type AsObject = {
        valid: boolean,
        scopesList: Array<string>,
        message: string,
        alias: string,
        user?: User.AsObject,
    }
}

export class User extends jspb.Message { 
    getId(): string;
    setId(value: string): User;

    getFirstname(): string;
    setFirstname(value: string): User;

    getLastname(): string;
    setLastname(value: string): User;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): User.AsObject;
    static toObject(includeInstance: boolean, msg: User): User.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): User;
    static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
    export type AsObject = {
        id: string,
        firstname: string,
        lastname: string,
    }
}
