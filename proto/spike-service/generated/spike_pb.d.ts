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

export class ValidateTokenRequest extends jspb.Message { 
    getToken(): string;
    setToken(value: string): void;

    getAudience(): string;
    setAudience(value: string): void;


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
    setValid(value: boolean): void;

    clearScopesList(): void;
    getScopesList(): Array<string>;
    setScopesList(value: Array<string>): void;
    addScopes(value: string, index?: number): string;

    getMessage(): string;
    setMessage(value: string): void;

    getAlias(): string;
    setAlias(value: string): void;


    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): void;


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
    setToken(value: string): void;

    getAudience(): string;
    setAudience(value: string): void;


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
    setValid(value: boolean): void;

    clearScopesList(): void;
    getScopesList(): Array<string>;
    setScopesList(value: Array<string>): void;
    addScopes(value: string, index?: number): string;

    getMessage(): string;
    setMessage(value: string): void;

    getAlias(): string;
    setAlias(value: string): void;


    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): void;


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
    setId(value: string): void;

    getFirstname(): string;
    setFirstname(value: string): void;

    getLastname(): string;
    setLastname(value: string): void;


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
