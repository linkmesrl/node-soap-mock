'use strict';

var assert = require('assert');

module.exports = function SoapMock(config){

    if(!config){
        // TODO fix this, is not asserting
        assert.fail(config, 'Object', 'You should provide a configuration Object.');
    }

    var client = require('./lib/client')(config);
    return client;
};