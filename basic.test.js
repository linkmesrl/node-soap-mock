'use strict';

require('../../../test/test_helper');

var config = {
    UserService: {        
        UserServicePort: {
            createUser: function(xml, callback){
                callback(null, xml);
            },
            retrieveUserInformation: {}
        }
    }
};

var soap = require('./index')(config);

describe('The Node Soap Mock', function(){

    var _client;

    it('should create a fake client', function(done){
        soap.createClient('UserService?wsdl', function(err, client){
            expect(client).not.to.be.null;
            expect(client.describe()).not.to.be.null;
            _client = client;
            done();
        });
    });

    it('should respond to a createUser call', function(done){
        console.log(_client);
        _client.UserService.UserServicePort.createUser('fake XML', function(err, res){
            expect(res).not.to.be.null;
            done();
        });
    });
});