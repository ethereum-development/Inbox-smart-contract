const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');//web3 constructor
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'syrup middle forget enough order school text run range goddess member kid',
    'https://rinkeby.infura.io/v3/1c47c781c64b42679a31eee9ab643097'
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