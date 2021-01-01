const path = require('path');

const bunyan = require('bunyan');
// Load package.json
const pjs = require('../package.json');

// get some meta info from the package.json
const { name, version } = pjs;

// set up a logger
const getLogger = (serviceName, serviceVersion, level) => bunyan.createLogger({ name })

// Configuration options for different environments
module.exports = {
  development: {
    name,
    version,
    serviceTimeout: 30,
    data:{
      speakers: path.join(__dirname, '../data/speakers.json'),
    },
    log:()=>getLogger(name, version,'debug'),
  },
  production:{
    name,
    version,
    serviceTimeout: 30,
    data:{
      speakers: path.join(__dirname, '../data/speakers.json'),
    },
    log:()=>getLogger(name, version, 'debug')
  },
  test:{
    name,
    version,
    serviceTimeout: 30,
    data:{
      speakers: path.join(__dirname, '../data/speakers.json'),
    },
    log: ()=> getLogger(name, version, 'fatal')
  },
}