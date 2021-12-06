const assert = require('assert');
const ganache = require('ganache-cli');

// Constructor function, capitilized
const Web3 = require('web3');

// Instance of web3 to connect to test network
// through the provider (provider depends on network)
const web3 = new Web3(ganache.provider());

