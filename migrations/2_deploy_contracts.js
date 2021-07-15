const ICOToken = artifacts.require('./ICOToken.sol');

module.exports = function (deployer) {
  deployer.deploy(ICOToken);
};
