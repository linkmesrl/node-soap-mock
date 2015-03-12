# Node Soap Mock

This is a small module to mock SOAP request made with [Node Soap](https://github.com/vpulim/node-soap).

## Configuration

You should provide an object with your WSDL methods and functions, es:
```
var config = {
    UserService: {        
        UserServicePort: {
            createUser: function(xml, callback){
                callback(null, xml);
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

### Note on use:

You can provide any kind of function to your configuration, and mange all the validation on received data there inside.

### To do:

- Translate comment in English
- Add more assertion to prevent configuration errors.
- Provide a simpler (but still flexible) method of configuration, in first instace add an XML parser for `xml` input in `config` functions.