'use strict';

require('./test_helper.js');

var config = {
    UserService: {        
        UserServicePort: {
            // TODO spread the args
            createUser: function(args){
               return args[1](null, args[0]);
            },
        }
    },
    MoneyInService: {
        MoneyInService: {
            chargeEWallet: function(args){
                if(!args[0].root.property){
                    return args[1]('Property is mandatory!');
                }
                return args[1](null, args[0]);
            }
        }
    }
};

var soap = require('./../src/index')(config);

describe('The Node Soap Mock', function(){

    var _client;
    var _moneyClient;

    it('should create a fake client', function(done){
        soap.createClient('UserService?wsdl', function(err, client){
            expect(client).not.to.be.null;
            expect(client.describe()).not.to.be.null;
            _client = client;
            done();
        });
    });

    it('should respond to a createUser call', function(done){
        _client.UserService.UserServicePort.createUser('<root>SampleXML</root>', function(err, res){
            expect(res).not.to.be.null;
            expect(typeof res).to.equal('object');
            expect(res.root).to.equal('SampleXML');
            done();
        });
    });

    it('should set setSecurity on a client', function(done){
        soap.createClient('MoneyInService?wsdl', function(err, client){
            _moneyClient = client;
            expect(client).not.to.be.null;
            expect(client.describe()).not.to.be.null;
            client.setSecurity({_username: 'username', _password: 'password'});
            done();
        });
    });

    it('should return a validation error', function(done){
        _moneyClient.MoneyInService.MoneyInService.chargeEWallet('<root><property></property></root>', function(err, res){
            expect(err).not.to.be.null;
            expect(err).to.equal('Property is mandatory!');
            done();
        });
    });
});
