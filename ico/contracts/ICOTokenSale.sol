pragma solidity >=0.4.22 <0.9.0;

import "./ICOToken.sol";

contract ICOTokenSale {
  address payable admin;
  ICOToken public tokenContract;
  // Unit in Gwei, which is a denomination of ether used on the Ethereum network.
  uint256 public tokenPrice;
  uint256 public tokensSold;

  event Sell(address _buyer, uint256 _amount);

  constructor(ICOToken _tokenContract, uint256 _tokenPrice) public {
    admin = msg.sender;
    tokenContract = _tokenContract;
    tokenPrice = _tokenPrice;
  }

  function multiply(uint x, uint y) internal pure returns (uint z) {
    require(y == 0 || (z = x * y) / y == x);
  }

  function buyTokens(uint256 _numberOfTokens) public payable {
    require(msg.value == multiply(_numberOfTokens, tokenPrice));
    require(tokenContract.balanceOf(address(admin)) >= _numberOfTokens);
    require(tokenContract.transfer(msg.sender, _numberOfTokens));

    tokensSold += _numberOfTokens;

    emit Sell(msg.sender, _numberOfTokens);
  }

  function endSale() public {
    require(msg.sender == admin);
    // See https://ethereum.stackexchange.com/a/90448
    require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));

    selfdestruct(admin);
  }
}
