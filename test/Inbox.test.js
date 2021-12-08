const assert = require('assert');
const ganache = require('ganache-cli');

// Constructor function, capitilized
const Web3 = require('web3');

// Instance of web3 to connect to test network
// through the provider (provider depends on network)
const web3 = new Web3(ganache.provider());

let accounts;

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


});

describe('Inbox', () => {
    it('deployes a contract', () => {
        console.log(accounts);
    })
})