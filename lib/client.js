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

    this.serviceName = getServiceName(endpoint);

    this[this.serviceName] = _.clone(config[this.serviceName]);

};

// .describe()
// -----------
// Mock di una funzine che descrive i metodi del client

FakeClient.prototype.describe = function(){
    return 'This is a fake description';
};

// .setSecurity()
// --------------
// Mock della funzione che setta gli header di username e password

FakeClient.prototype.setSecurity = function(headers){
    
    if(!headers._username || typeof headers._username !== 'string'){
        assert.fail(headers._username, 'String', 'You should provide a username when setting header.');
    }
    if(!headers._password || typeof headers._password !== 'string'){
        assert.fail(headers._password, 'String', 'You should provide a password when setting header.');
    }
    this.security = headers;
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

var preProcessing = function(funcs, f) {
    var processed = {};
    Object.keys(funcs).forEach(function (key) {
        
        if(typeof funcs[key] === 'object'){
            processed[key] = preProcessing(funcs[key], f);
        }
        else{
            processed[key] = function (input) {
                return funcs[key](f(input));
            };
        }
        
    }, {});
    return processed;
}

// exports
// =======
// Rendo disponibile il modulo e tutti i suoi export

module.exports = function(config){

    var processedConfig = preProcessing(config, function (input) {
        console.log('Input' + input);
        return input;
    });
    console.log(processedConfig);
    _config = processedConfig;
    return exports;
};