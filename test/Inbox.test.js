const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');//UpperCase Web3 is the constructor
const { interface, bytecode } = require('../compile');// import interface and bytecode

//web3 is the portal into the ethereum wolrd, there exitsts two groups of version
//version 0 and vestion 1, most out in the wild is using web3 version 0, but im using version 1
//which supports promises + async/await so code is more readable.

const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
  };
const web3 = new Web3(ganache.provider(), null, OPTIONS);
//mocha is a general case testing framework

let accounts;//global variable to avoid scoping problems
let inbox;
console.log(interface);
beforeEach(async () => {
    // get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // use one of those accounts to deploy
    // the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(inbox);
    });
});




// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom';
//     }
// }

// let car;//global car to avoid problems with scope

// beforeEach(() => {// happens before every test 
//     car = new Car();
// });

// describe('Car',() =>{
//     it('can park',() => {
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         assert.equal(car.drive(),'vroom');
//     });
// });//'Car' is just to give a description of the class, 'can park' describes function, and 
// // 'can drive' is the same.
