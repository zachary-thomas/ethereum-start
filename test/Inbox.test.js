const assert = require('assert');
const ganache = require('ganache-cli');
// Constructor function, capitilized
const Web3 = require('web3');
const {interface, bytecode} = require('../compile');


// Instance of web3 to connect to test network
// through the provider (provider depends on network)
const web3 = new Web3(ganache.provider());
let accounts;
let inbox;

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
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        // Deploy a new copy of the contract, arguments call the constructor
        .deploy({data: bytecode, arguments: ['Hi there!']}) 
        // Send out a transaction to create the contract
        .send({from: accounts[0], gas: '1000000'})

});

describe('Inbox', () => {
    it('successfully deploys a contract', () => {
        assert.ok(inbox.options.address);
    })
})