'use strict';

var _config;

var _ = require('lodash');
var assert = require('assert');

// getServiceName
// --------------
// This function return the service name from the request endpoint
// it is later used to match the configuration

var getServiceName = function(endpoint){
    var pieces = endpoint.split('/');
    return pieces[pieces.length - 1].substring(0, pieces[pieces.length - 1].length - 5);
};

// FakeClient
// ==========
// Questo oggetto simula un client SOAP
// Devo configurarlo tramite le opzioni fornite da `_config` 
// in maniera che resituisca i metodi possibili per quel client

var FakeClient = function(endpoint, config){

    if(endpoint.slice(-5) !== '?wsdl'){
        assert.fail(endpoint.slice(-5), '?wsdl', 'You should request a wsdl file to create a client');
    }

    this.endpoint = endpoint;

    var requestedService = getServiceName(endpoint);
    
    this[requestedService] = config[requestedService];

};

// .describe()
// -----------
// Mock di una funzine che descrive i metodi del client

FakeClient.prototype.describe = function(){
    return 'This is a fake description';
};

// createClient
// ============
// Questa funzione istanzia un nuovo client

exports.createClient = function(url, options, callback, endpoint){
    if (typeof options === 'function') {
        endpoint = callback;
        callback = options;
        options = {};
    }

    var client = new FakeClient(url, _config);

    callback(null, client);
};

// esports
// =======
// Rendo disponibile il modulo e tutti i suoi export

module.exports = function(config){
    _config = config;
    return exports;
};