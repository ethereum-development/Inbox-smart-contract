const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');//UpperCase Web3 is the constructor
const { interface, bytecode } = require('../compile');// import interface and bytecode
const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
};
const provider = ganache.provider();
const web3 = new Web3(provider, null, OPTIONS);

//web3 is the portal into the ethereum wolrd, there exitsts two groups of version
//version 0 and vestion 1, most out in the wild is using web3 version 0, but im using version 1
//which supports promises + async/await so code is more readable.
//mocha is a general case testing framework
//global variable to avoid scoping problems in beforeeach block
let accounts;
let inbox;

beforeEach(async () => {
    // get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // use one of those accounts to deploy
    // the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000'});

    inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message,"Hi there!");
    });

    it('can set a message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });//only thing that comes back is a reciept
        const message = await inbox.methods.message().call();
        assert.equal(message,'bye');
    });
});