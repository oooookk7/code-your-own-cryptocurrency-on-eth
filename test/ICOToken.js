const ICOToken = artifacts.require('./ICOToken.sol')

contract('ICOToken', (accounts) => {
  // Smoke test
  it('sets the total supply upon deployment', (instance) => {
    assert.equal(instance().totalSupply, 10000000, 'Sets the total supply to 10,000,000');
  });

});