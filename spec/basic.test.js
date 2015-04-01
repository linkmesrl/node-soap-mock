'use strict';

require('./test_helper.js');

var config = {
    UserService: {        
        UserServicePort: {
            // TODO spread the args
            createUser: function(args){
                args[1](null, args[0]);
            },
        }
    },
    MoneyInService: {
        MoneyInService: {
            chargeEWallet: function(args){
                callback(null, xml);
            }
        }
    }
};

var soap = require('./../index')(config);

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
        _client.UserService.UserServicePort.createUser('fake XML', function(err, res){
            expect(res).not.to.be.null;
            done();
        });
    });

    it('should set setSecurity on a client', function(done){
        soap.createClient('MoneyInService?wsdl', function(err, client){
            expect(client).not.to.be.null;
            expect(client.describe()).not.to.be.null;
            client.setSecurity({_username: 'username', _password: 'password'});
            done();
        });
    });
});
