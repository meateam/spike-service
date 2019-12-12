// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var spike_pb = require('./spike_pb.js');

function serialize_spike_GetSpikeTokenRequest(arg) {
  if (!(arg instanceof spike_pb.GetSpikeTokenRequest)) {
    throw new Error('Expected argument of type spike.GetSpikeTokenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_spike_GetSpikeTokenRequest(buffer_arg) {
  return spike_pb.GetSpikeTokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_spike_SpikeToken(arg) {
  if (!(arg instanceof spike_pb.SpikeToken)) {
    throw new Error('Expected argument of type spike.SpikeToken');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_spike_SpikeToken(buffer_arg) {
  return spike_pb.SpikeToken.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_spike_ValidateTokenResponse(arg) {
  if (!(arg instanceof spike_pb.ValidateTokenResponse)) {
    throw new Error('Expected argument of type spike.ValidateTokenResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_spike_ValidateTokenResponse(buffer_arg) {
  return spike_pb.ValidateTokenResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_spike_ValidateTokenResquest(arg) {
  if (!(arg instanceof spike_pb.ValidateTokenResquest)) {
    throw new Error('Expected argument of type spike.ValidateTokenResquest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_spike_ValidateTokenResquest(buffer_arg) {
  return spike_pb.ValidateTokenResquest.deserializeBinary(new Uint8Array(buffer_arg));
}


var SpikeService = exports.SpikeService = {
  getSpikeToken: {
    path: '/spike.Spike/GetSpikeToken',
    requestStream: false,
    responseStream: false,
    requestType: spike_pb.GetSpikeTokenRequest,
    responseType: spike_pb.SpikeToken,
    requestSerialize: serialize_spike_GetSpikeTokenRequest,
    requestDeserialize: deserialize_spike_GetSpikeTokenRequest,
    responseSerialize: serialize_spike_SpikeToken,
    responseDeserialize: deserialize_spike_SpikeToken,
  },
  validateToken: {
    path: '/spike.Spike/ValidateToken',
    requestStream: false,
    responseStream: false,
    requestType: spike_pb.ValidateTokenResquest,
    responseType: spike_pb.ValidateTokenResponse,
    requestSerialize: serialize_spike_ValidateTokenResquest,
    requestDeserialize: deserialize_spike_ValidateTokenResquest,
    responseSerialize: serialize_spike_ValidateTokenResponse,
    responseDeserialize: deserialize_spike_ValidateTokenResponse,
  },
};

exports.SpikeClient = grpc.makeGenericClientConstructor(SpikeService);
