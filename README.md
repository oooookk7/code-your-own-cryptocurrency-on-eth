# [Code Your Own Cryptocurrency on Ethereum](https://www.youtube.com/playlist?list=PLS5SEs8ZftgWFuKg2wbm_0GLV0Tiy1R-n)

This repository contains codes from a Youtube playlist for beginners to create their own ERC-20 token ([documentation here for Ethereum smart contract structure](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-Transfer-address-address-uint256-), and [here for solidity language on getting started](https://docs.soliditylang.org/en/v0.4.24/introduction-to-smart-contracts.html)).

In this project, a token called `$ICO` is created for users to purchase the tokens during [the ICO phase](https://www.investopedia.com/terms/i/initial-coin-offering-ico.asp).

## Getting Started

1. Install [NodeJS](https://nodejs.org), [Yarn](https://yarnpkg.com/), and [Ganache](https://www.trufflesuite.com/ganache).
2. Install [truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation) using `yarn global add truffle`.
3. Download the [Metamask wallet extension](https://metamask.io/download.html)  to connect to the test wallets.
4. Install required dependencies using `yarn install` in this repository.
5. (Optional) Install Ethereum syntax highlighter [(this for sublime)](https://packagecontrol.io/packages/Ethereum).

Favicon credits: [@ipapun](https://www.deviantart.com/ipapun).

## Basic Concepts

### [Token vs Cryptocurrency vs Altcoins](https://www.investopedia.com/terms/c/crypto-token.asp)

Cryptocurrency is a standard currency used for making or receiving payments on a blockchain.

Altcoins are alternative cryptocurrencies launched after the success achieved by Bitcoin (aka other than Bitcoin) (e.g. Litecoin, Dogecoin).

Tokens operate on top of a blockchain that act as a medium for the creation and execution of decentralized apps and smart contracts to facilitate the transactions.

### What is [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)?

It is a list of rules that all Etherum-based tokens must follow, which tokens are used for transactions (e.g. smart contracts) on the Ethereum blockchain network. The token used within this chain is called the Etherum token.

This is the same thing similar to [BIPS protocol](https://github.com/bitcoin/bips) used for Bitcoin, except that on Etherum network, one is able to build a [decentralised app](https://en.wikipedia.org/wiki/Decentralized_application), unlike Bitcoin which serves as an asset.

### [What is the Blockchain Network?](https://en.wikipedia.org/wiki/Blockchain)

<img src="https://www.researchgate.net/profile/Raj-Jain/publication/326888946/figure/fig1/AS:659579461447682@1534267406813/Blockchain-network-database-blocks-and-transactions.png" width="350" height="auto" />

(Source: [Raj Jain et., 2018](https://www.researchgate.net/publication/326888946_Security_Services_Using_Blockchains_A_State_of_the_Art_Survey) - _Overview of the entire blockchain network with nodes, that each contains blocks_)

<img src="https://miro.medium.com/max/2000/1*r0QZJUgoJnhrX_8XO6CywA.png" width="600" height="auto" />

(Source: [Jimi S., 2018](https://blog.goodaudience.com/blockchain-for-beginners-what-is-blockchain-519db8c6677a) - _Overview of blocks, which contains a string of transactions and hash_)

<img src="https://i.stack.imgur.com/YXguz.png" width="450" height="auto" />

(Source: [@xcsob, 2018](https://bitcoin.stackexchange.com/questions/72161/how-the-recipients-public-key-is-used-in-bitcoin-transaction) - _Overview of transactions that forms an entire block_)

From Wikipedia, 

> It is growing list of records (called blocks) that are linked together using cryptography.
> 
> Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data (generally represented as a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree)). 
> 
> The timestamp proves that the transaction data existed when the block was published in order to get into its hash. 
> 
> As blocks each contain information about the block previous to it, they form a chain, with each additional block reinforcing the ones before it.
> 
> Therefore, blockchains are resistant to modification of their data because once recorded, the data in any given block cannot be altered retroactively without altering all subsequent blocks.
> 
> Blockchains are typically managed by a peer-to-peer network for use as a publicly distributed ledger, where nodes collectively adhere to a protocol to communicate and validate new blocks

Here's an example of the Bitcoin (BTC) network,

<img src="https://static.ffbbbdc6d3c353211fe2ba39c9f744cd.com/wp-content/uploads/2019/12/31061733/image53.png" width="650" height="auto" />

(Source: [Brian.Wu, 2019](https://blog.bybit.com/en-us/learn/crypto-101/bitcoin-blockchain-performance-and-scalability/))

<img src="https://miro.medium.com/max/2000/1*bJQyDZtJikR7mBVuhVGpBw.png" width="550" height="auto" />

(Source: [Michele D'Aliessi, 2016](https://onezero.medium.com/how-does-the-blockchain-work-98c8cd01d2ae))

Here's an example of an Etherum transaction,

<img src="https://www.andryo.com/img/transaction-hash.jpg" width="450" height="auto" />

(Source: [andryo.com, n.d.](https://www.andryo.com/en/blockchain/how-to-verify-transactions-on-the-blockchain/))

### [What are smart contracts?](https://www.computerworld.com/article/3412140/whats-a-smart-contract-and-how-does-it-work.html)

Smart contracts are self-executing, business automation applications that run on a decentralized network such as blockchain. 

For example, an insurance company could use smart contracts to automate the release of claim money based on events such as large-scale floods, hurricanes or droughts. Or, once a cargo shipment reaches a port of entry and IoT sensors inside the container confirm the contents have been unopened and remained stored properly throughout the journey, a bill of lading can automatically be issued.

[Decentralized apps (dapps)](https://ethereum.org/en/developers/docs/dapps) is an application built on a decentralized network that combines a smart contract and a frontend user interface. It has its own backend code running on a decentralized peer-to-peer network (unlike backend code running on centralized servers like AWS). It may have a frontend code which may be hosted on decentralized storage such as [IPFS](https://en.wikipedia.org/wiki/InterPlanetary_File_System).

### [What are Oracles?](https://en.wikipedia.org/wiki/Blockchain_oracle)

From Wikipedia,

> A blockchain oracle is a third-party service that provides smart contracts with information from the outside world. It is the layer that queries, verifies, and authenticates external data sources, usually via trusted APIs and then relays that information.
> 
> Examples of data transmitted by oracles to smart contracts include price information, the successful completion of a payment, the temperature measured by a sensor, election outcomes etc. 
> 
> Data can be supplied by other software (databases, servers, or essentially any online data source), or by hardware (sensors, barcode scanners etc.). 

Note that the records data is centralized to oracles. It's akin to an extra record data tied to these transactions.

### What are Wallets?

<img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/2-how-do-blockchain-wallets-work.jpg" width="500" height="auto" />

(Source: [simplilearn.com, n.d.](https://www.simplilearn.com/tutorials/blockchain-tutorial/blockchain-wallet))

A cryptocurrency wallet allows users to manage different users to manage different kinds of cryptocurrencies (e.g. Bitcoin/Etherum).

It contains the user keys information (e.g. private and public keys) used for transactions.

**Hot wallets** are online wallets through which cryptocurrencies can be transferred quickly (e.g. Coinbase or Binance). **Cold wallets** are digital offline wallets where the transactions are signed offline and then disclosed online (e.g. Trezor or Ledger).


There are **Software wallets** that exists in the desktop, mobile or online (managed by 3rd parties), or **Hardware wallets**, a type of cold storage device, typically like a USB, that stores the user’s private key in a protected hardware device (e.g. Trezor).

## Code Structure

There are 6 defined functions: `balanceOf`, `totalSupply`, `transfer`, `transferFrom`, `approve`, and `allowance`.

Below is an example code for an ERC-20 contract,

```
contract ERC20 {
   function totalSupply() constant returns (uint theTotalSupply);
   function balanceOf(address _owner) constant returns (uint balance);
   function transfer(address _to, uint _value) returns (bool success);
   function transferFrom(address _from, address _to, uint _value) returns (bool success);
   function approve(address _spender, uint _value) returns (bool success);
   function allowance(address _owner, address _spender) constant returns (uint remaining);
   event Transfer(address indexed _from, address indexed _to, uint _value);
   event Approval(address indexed _owner, address indexed _spender, uint _value);
}
```

(Source: [@aunyks, 2015](https://gist.github.com/aunyks/56cb3a1bed21ae3160a6afba86a50ec8#file-erc20-definitions-sol))

### `totalSupply()`

This function allows an instance of the contract to calculate and return the total amount of the token that exists in circulation.

```
contract MyERCToken {
  // In this case, the total supply
  // of MyERCToken is fixed, but
  // it can very much be changed
  uint256 _totalSupply = 1000000;
  
  function totalSupply() constant returns (uint256 theTotalSupply) {
    // Because our function signature
    // states that the returning variable
    // is "theTotalSupply", we'll just set that variable
    // to the value of the instance variable "_totalSupply"
    // and return it
    theTotalSupply = _totalSupply;
    return theTotalSupply;
  }
}
```

(Source: [@aunyks, 2015](https://gist.github.com/aunyks/fc9565dd99264b336564a299d259ddde#file-erc20-totalsupply-sol))

### `balanceOf()`

This function allows a smart contract to store and return the balance of the provided address. It accepts an address as a parameter, to which its balance is known publically.

```
contract MyERCToken {
  // Create a table so that we can map addresses
  // to the balances associated with them
  mapping(address => uint256) balances;
  // Owner of this contract
  address public owner;
  
  function balanceOf(address _owner) constant returns (uint256 balance) {
    // Return the balance for the specific address
    return balances[_owner];
  }
}
```

(Source: [@aunyks, 2015](https://gist.github.com/aunyks/5564ed9a19778acfa14e978c36e3e2f8#file-erc20-balanceof-sol))

### `approve()`

This function allows the owner of the contract to authorize or approve the given address to withdraw instances of the token from the owner's address.

This variable `msg` is an implicit field provided by external applications such as wallets to better interact with the contract. 

The [Ethereum Virtual Machine (EVM)](https://ethereum.org/en/developers/docs/evm/) allows external applications to store and process data in it.

The `msg.sender` is the address of the contract owner in the example below.


```
contract MyERCToken {
  // Create a table so that we can map
  // the addresses of contract owners to
  // those who are allowed to utilize the owner's contract
  mapping(address => mapping (address => uint256)) allowed;
  
  function approve(address _spender, uint256 _amount) returns (bool success) {
    allowed[msg.sender][_spender] = _amount;
    // Fire the event "Approval" to execute any logic
    // that was listening to it
    Approval(msg.sender, _spender, _amount);
    return true;
  }
}
```

(Source: [@aunyks, 2015](https://gist.github.com/aunyks/643fc6334b56b12e4f86e30c76c5c698#file-erc20-approve-sol))

### `transfer()`

This function lets the owner of the contract to send a given amount of the token to another address just like a cryptocurrency transaction.


```
contract MyERCToken {
  mapping(address => uint256) balances;
  
  // Note: This function returns a boolean value
  //       indicating whether the transfer was successful
  function transfer(address _to, uint256 _amount) returns (bool success) {
    // If the sender has sufficient funds to send
    // and the amount is not zero, then send to
    // the given address
    if (balances[msg.sender] >= _amount 
      && _amount > 0
      && balances[_to] + _amount > balances[_to]) {
      balances[msg.sender] -= _amount;
      balances[_to] += _amount;
      // Fire a transfer event for any
      // logic that's listening
      Transfer(msg.sender, _to, _amount);
        return true;
      } else {
        return false;
      }
   }
}
```

(Source: [@aunyks, 2015](https://gist.github.com/aunyks/6bfaef246d3f1bbe30020249e0c28e2e#file-erc20-transfer-sol))


### `transferFrom()`

This function allows a smart contract to automate the transfer process and send a given amount of the token on behalf of the owner, instead of self like `transfer()`.

```
contract MyERCToken {
  mapping(address => uint256) balances;
  
  function transferFrom(address _from, address _to, uint256 _amount) returns (bool success) {
    if (balances[_from] >= _amount
      && allowed[_from][msg.sender] >= _amount
      && _amount > 0
      && balances[_to] + _amount > balances[_to]) {
    balances[_from] -= _amount;
    balances[_to] += _amount;
    Transfer(_from, _to, _amount);
      return true;
    } else {
      return false;
    }
  }
}
```

(Source: [@aunyks, 2015](https://gist.github.com/aunyks/09b2bfb2b919527e4601aefb5dd5fdd3#file-erc20-transferfrom-sol))

### Token Name (Optional Field)

For some wallets are able to identify the token.

```
contract MyERCToken {
  string public constant name = "My Custom ERC20 Token";
}
```

(Source: [Steven McKie, 2017](https://medium.com/blockchannel/the-anatomy-of-erc20-c9e5c5ff1d02))

### Token Symbol (Optional Field)

For some wallets to identify the token (e.g. BTC/ETH).

```
contract MyERCToken {
  string public constant symbol = "MET";
}
```

(Source: [Steven McKie, 2017](https://medium.com/blockchannel/the-anatomy-of-erc20-c9e5c5ff1d02))

### Number of Decimals (Optional Field)

Determine to what decimal place the amount of the token will be calculated. The most common number of decimals to consider is `18`.

```
contract MyERCToken {
  uint8 public constant decimals = 18;
}
```

(Source: [Steven McKie, 2017](https://medium.com/blockchannel/the-anatomy-of-erc20-c9e5c5ff1d02))
