const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');//web3 constructor
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    '--replace me--',// your 12 word mneumonic goes here
    'https://rinkeby.infura.io/############7'//your enfura endpoint goes here
);
console.log('we get here!');
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account ", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: '0x' + bytecode, arguments: ['Hi there!']})
        .send({ gas:"1000000", from: accounts[0] });

    console.log('contract deployed to ', result.options.address);
};
deploy();