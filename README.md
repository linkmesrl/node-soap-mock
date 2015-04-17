# Node Soap Mock

This is a small module to mock SOAP request made with [Node Soap](https://github.com/vpulim/node-soap).

[![Build Status](https://travis-ci.org/linkmesrl/node-soap-mock.svg?branch=master)](https://travis-ci.org/linkmesrl/node-soap-mock)

## Configuration

You should provide an object with your WSDL methods and functions, es:
```
var config = {
    UserService: {        
        UserServicePort: {
            createUser: function(args){
                args[1](null, args[0]);
            }
        }
    }
};
```

This object should be passed to the mocker

```
var soap = require('./index')(config);
```

This can be executed only in tests in this way (other are possible):

```
var soap = require('soap');
if(process.env.NODE_ENV === 'test'){
    soap = require('./index')(config);
}
```
## How to use:

More examples in `spec` folder.

```
var config = {
    UserService: {        
        UserServicePort: {
            createUser: function(args){

                // check that `args[0]` have the correct properties
                if(!args[0].root){
                    // this will fill the err value
                    return args[1]('Input must have a .root property!');
                }

                return args[1](null, args[0]);
            }
        }
    }
};

var soap = require('./../src/index')(config);

var _client;

soap.createClient('UserService?wsdl', function(err, client){
    _client = client;
});

_client.UserService.UserServicePort.createUser('<root>SampleXML</root>', function(err, res){
    // do your stuff
});
```

### Note on use:

You can provide any kind of function to your configuration, and mange all the validation on received data there inside.

Inside `args`you will find two arguments:

- the provided `XML` parsed to `JSON` (args[0])
- a callback (args[1])

### To do:

- Find a way to spread the `args` of configuration functions
- Translate comment in English
- Add more assertion to prevent configuration errors.
