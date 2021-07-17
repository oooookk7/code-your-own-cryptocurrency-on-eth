const ICOToken = artifacts.require('./ICOToken.sol');
const ICOTokenSale = artifacts.require('./ICOTokenSale.sol');
const fs = require('fs');

const supplyConfig = JSON.parse(fs.readFileSync('../supply-config.json', 'utf8'));

module.exports = function(deployer) {
  deployer.deploy(ICOToken, supplyConfig['token_supply']).then(function() {
    // Token price is 0.001 Ether
    return deployer.deploy(ICOTokenSale, ICOToken.address, supplyConfig['token_price']);
  }).then(function() {
    ICOToken.deployed().then((instance) => {
      instance.transfer(ICOTokenSale.address, supplyConfig['token_circulating_supply'], { from: supplyConfig['admin_account_address'] });
    });
  });
};