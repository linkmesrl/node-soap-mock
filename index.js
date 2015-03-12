'use strict';

module.exports = function SoapMock(config){
    var client = require('./lib/client')(config);
    return client;
};