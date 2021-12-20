const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require('web3');
const {interface, bytecode} = require ('./compile');
const constants = require('./constants');
const { default: Web3 } = require('web3');

const provider = new HDWalletProvider(
    constants.MNEMONIC,
    constants.INFURA_RINKEBY_ENDPOINT,
);

const web3 = new Web3(provider);