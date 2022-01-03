const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi, evm} = require ('./compile');
const constants = require('./constants');

const provider = new HDWalletProvider(
    constants.MNEMONIC,
    constants.INFURA_RINKEBY_ENDPOINT,
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account: ', accounts[0])

    const resultContract = await new web3.eth.Contract(abi)
        .deploy({data: evm.bytecode.object, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', resultContract.options.address);
    provider.engine.stop();
};

// Helper to make async
deploy();