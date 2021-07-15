pragma solidity >=0.4.22 <0.9.0;

contract ICOToken {
  // Constructor
  // Set the total number of tokens
  // Read the total number of tokens
  string  public name = "ICO Token";
  string  public symbol = "ICO";
  string  public standard = "v1.0";
  uint256 public totalSupply;

  mapping(address => uint256) public balanceOf;

  constructor(uint256 _initialSupply) public {
    balanceOf[msg.sender] = _initialSupply;
    totalSupply = _initialSupply;
  }
}