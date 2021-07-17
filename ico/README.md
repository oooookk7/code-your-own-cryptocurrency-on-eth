## Getting Started

1. Install [NodeJS](https://nodejs.org), [Yarn](https://yarnpkg.com/), and [Ganache](https://www.trufflesuite.com/ganache).
2. Install [truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation) using `yarn global add truffle`.
3. Download the [Metamask wallet extension](https://metamask.io/download.html)  to connect to the test wallets.
4. Install required dependencies using `yarn install` in this repository.
5. (Optional) Install Ethereum syntax highlighter [(this for sublime)](https://packagecontrol.io/packages/Ethereum).

Favicon credits: [@ipapun](https://www.deviantart.com/ipapun).
Gifs created using [gifcap.dev](https://gifcap.dev/).

### [Go Ethereum](https://geth.ethereum.org/)

As answered by [@Ismael on ethereum.stackexchange.com](https://ethereum.stackexchange.com/a/26676), the differences between using Truffle and GoETH is,

> They both have different functionality.
> 
> Geth is a Ethereum network client. It connects to others networks clients to download and synchronize the Ethereum blockchain. Also it allows you to send transaction to other nodes and miners, so they will incorporate it in future blocks.
> 
> Truffle is a javascript framework to allow development and testing of smart contracts. It add extra functionality on top of the web3 javascript library. It makes the cycle compile and deploy of a smart contract faster. You can also create unit tests to automate testing.

Resources:

- [Getting started guide](https://geth.ethereum.org/docs/getting-started)
- [Finding the Network ID and Chain ID (and what are they)](https://besu.hyperledger.org/en/stable/Concepts/NetworkID-And-ChainID)
- [Proof-of-Work (PoW) vs Proof-of-Stake (PoS) vs Proof-of-Authority (PoA)](https://www.bissresearch.com/proof-of-stake-vs-proof-of-work-vs-proof-of-authority/)
- [Network ID vs Chain ID?](https://ethereum.stackexchange.com/a/37571)