var chai = require('chai'),sinonChai = require('sinon-chai');

global.expect = chai.expect;
global.sinon = require('sinon');
chai.use(sinonChai);
chai.config.includeStack = true;
chai.config.showDiff = true;

process.env.NODE_ENV = 'test';