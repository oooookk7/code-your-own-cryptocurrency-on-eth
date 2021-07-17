const ICOToken = artifacts.require('./ICOToken.sol')
const fs = require('fs');

const supplyConfig = JSON.parse(fs.readFileSync('./supply-config.json', 'utf8'));

contract('ICOToken', (accounts) => {
  let tokenSupply = supplyConfig['token_supply'];
  let spendingAmount = 250000;
  let approveAmount = 100;
  let approveSpendingAmount = 10;
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
      assert.equal(totalSupply.toNumber(), tokenSupply, 'sets the total supply to 1,000,000');
      return tokenInstance.balanceOf(accounts[0]);
    }).then((adminBalance) => {
      assert.equal(adminBalance.toNumber(), tokenSupply, 'it allocates the initial supply to the admin')
    });
  });

  it('transfers token ownership', () => {
    return ICOToken.deployed().then((instance) => {
      tokenInstance = instance;
      return tokenInstance.transfer.call(accounts[1], 9999999999);
    }).then(assert.fail).catch((error) => {
      assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
      return tokenInstance.transfer.call(accounts[1], spendingAmount, { from: accounts[0] });
    }).then((success) => {
      assert.equal(success, true, 'it returns true');
      return tokenInstance.transfer(accounts[1], spendingAmount, { from: accounts[0] });
    }).then((receipt) => {
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
      assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
      assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
      assert.equal(receipt.logs[0].args._value, spendingAmount, 'logs the transfer amount');
      return tokenInstance.balanceOf(accounts[1]);
    }).then((balance) => {
      assert.equal(balance.toNumber(), spendingAmount, 'adds the amount to the receiving account');
      return tokenInstance.balanceOf(accounts[0]);
    }).then((balance) => {
      assert.equal(balance.toNumber(), tokenSupply - spendingAmount, 'deducts the amount from the sending account');
    });
  });

  it('approves tokens for delegated transfer', () => {
    return ICOToken.deployed().then((instance) => {
      tokenInstance = instance;
      return tokenInstance.approve.call(accounts[1], approveAmount);
    }).then((success) => {
      assert.equal(success, true, 'it returns true');
      return tokenInstance.approve(accounts[1], approveAmount, { from: accounts[0] });
    }).then((receipt) => {
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'Approval', 'should be the "Approval" event');
      assert.equal(receipt.logs[0].args._owner, accounts[0], 'logs the account the tokens are authorized by');
      assert.equal(receipt.logs[0].args._spender, accounts[1], 'logs the account the tokens are authorized to');
      assert.equal(receipt.logs[0].args._value, approveAmount, 'logs the transfer amount');
      return tokenInstance.allowance(accounts[0], accounts[1]);
    }).then((allowance) => {
      assert.equal(allowance.toNumber(), approveAmount, 'stores the allowance for delegated trasnfer');
    });
  });

  it('handles delegated token transfers', () => {
    return ICOToken.deployed().then((instance) => {
      tokenInstance = instance;
      fromAccount = accounts[2];
      toAccount = accounts[3];
      spendingAccount = accounts[4];
      // Transfer some tokens to fromAccount
      return tokenInstance.transfer(fromAccount, approveAmount, { from: accounts[0] });
    }).then((receipt) => {
      // Approve spendingAccount to spend tokens form fromAccount
      return tokenInstance.approve(spendingAccount, approveSpendingAmount, { from: fromAccount });
    }).then((receipt) => {
      // Try transferring something larger than the sender's balance
      return tokenInstance.transferFrom(fromAccount, toAccount, 9999, { from: spendingAccount });
    }).then(assert.fail).catch((error) => {
      assert(error.message.indexOf('revert') >= 0, 'cannot transfer value larger than balance');
      return tokenInstance.transferFrom(fromAccount, toAccount, approveSpendingAmount * 2, { from: spendingAccount });
    }).then(assert.fail).catch((error) => {
      assert(error.message.indexOf('revert') >= 0, 'cannot transfer value larger than approved amount');
      return tokenInstance.transferFrom.call(fromAccount, toAccount, approveSpendingAmount, { from: spendingAccount });
    }).then((success) => {
      assert.equal(success, true);
      return tokenInstance.transferFrom(fromAccount, toAccount, approveSpendingAmount, { from: spendingAccount });
    }).then((receipt) => {
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
      assert.equal(receipt.logs[0].args._from, fromAccount, 'logs the account the tokens are transferred from');
      assert.equal(receipt.logs[0].args._to, toAccount, 'logs the account the tokens are transferred to');
      assert.equal(receipt.logs[0].args._value, approveSpendingAmount, 'logs the transfer amount');
      return tokenInstance.balanceOf(fromAccount);
    }).then((balance) => {
      assert.equal(balance.toNumber(), approveAmount - approveSpendingAmount, 'deducts the amount from the sending account');
      return tokenInstance.balanceOf(toAccount);
    }).then((balance) => {
      assert.equal(balance.toNumber(), approveSpendingAmount, 'adds the amount from the receiving account');
      return tokenInstance.allowance(fromAccount, spendingAccount);
    }).then((allowance) => {
      assert.equal(allowance.toNumber(), 0, 'deducts the amount from the allowance');
    });
  });

});