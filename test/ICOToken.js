const ICOToken = artifacts.require('./ICOToken.sol')

contract('ICOToken', (accounts) => {
  let tokenInstance;

  it('initializes the contract with the correct values', () => {
    return ICOToken.deployed().then((instance) => {
      tokenInstance = instance;
      return tokenInstance.name();
    }).then((name) => {
      assert.equal(name, 'ICO Token', 'has correct name');
      return tokenInstance.symbol();
    }).then((symbol) => {
      assert.equal(symbol, 'ICO', 'has correct symbol');
      return tokenInstance.standard();
    }).then((standard) => {
      assert.equal(standard, 'v1.0', 'has correct standard');
    });
  });

  it('allocates the initial supply upon deployment', () => {
    return ICOToken.deployed().then((instance) => {
      tokenInstance = instance;
      return tokenInstance.totalSupply();
    }).then((totalSupply) => {
      assert.equal(totalSupply, 50000000, 'sets the total supply to 50,000,000');
      return tokenInstance.balanceOf(accounts[0]);
    }).then((adminBalance) => {
      assert.equal(adminBalance.toNumber(), 50000000, 'it allocates the initial supply to the admin')
    })
  });

});