const assert = require('assert');
const ganache = require('ganache-cli');
// Constructor function, capitilized
const Web3 = require('web3');
const { abi, evm } = require('../compile');
//import Constants from '../constants.js'
const constants = require('../constants')

// Instance of web3 to connect to test network
// through the provider (provider depends on network)
const web3 = new Web3(ganache.provider());
let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';

// Note the async keyword
beforeEach( async () => {
    // Get a list of all accounts

    // Promise
    // web3.eth.getAccounts().then(fetchedAccounts =>{
    //     console.log(fetchedAccounts);
    // });

    // Async/await
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    // ABI - tells what methods the contract has
    inbox = await new web3.eth.Contract(abi)
        // Deploy a new copy of the contract, arguments call the constructor
        .deploy({
            data: evm.bytecode.object, 
            arguments: [INITIAL_STRING]
        }) 
        // Send out a transaction to create the contract
        .send({from: accounts[0], gas: '1000000'});

});

describe('Inbox', () => {
    it('successfully deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () =>{
        // reference the contract's methods, get message, call with transaction value (if needed)
        // call is read only
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });

    it('can change the message', async () => {
        // Send new message
        // send needs to wait on the blockchain
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });
});