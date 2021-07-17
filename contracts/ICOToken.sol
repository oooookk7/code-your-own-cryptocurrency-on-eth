pragma solidity >=0.4.22 <0.9.0;

contract ICOToken {
  // Constructor
  // Set the total number of tokens
  // Read the total number of tokens
  string  public name = "ICO Token";
  string  public symbol = "ICO";
  string  public standard = "v1.0";
  uint256 public totalSupply;
  uint8   public decimals = 18;

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );

  event Approval(
      address indexed _owner,
      address indexed _spender,
      uint256 _value
  );

  mapping(address => uint256) public balanceOf;
  // Amount that spender is allowed on behalf of owner through transferFrom
  mapping(address => mapping(address => uint256)) public allowance;

  constructor(uint256 _initialSupply) public {
    balanceOf[msg.sender] = _initialSupply;
    totalSupply = _initialSupply;
  }

  function transfer(address _recipient, uint256 _amount) public returns (bool success) {
    require(balanceOf[msg.sender] >= _amount);
    balanceOf[msg.sender] -= _amount;
    balanceOf[_recipient] += _amount;

    emit Transfer(msg.sender, _recipient, _amount);

    return true;
  }

  function approve(address _spender, uint256 _amount) public returns (bool success) {
    allowance[msg.sender][_spender] = _amount;

    emit Approval(msg.sender, _spender, _amount);

    return true;
  }

  function transferFrom(address _sender, address _recipient, uint256 _amount) public returns (bool success) {
      require(_amount <= balanceOf[_sender]);
      require(_amount <= allowance[_sender][msg.sender]);

      balanceOf[_sender] -= _amount;
      balanceOf[_recipient] += _amount;

      allowance[_sender][msg.sender] -= _amount;

      emit Transfer(_sender, _recipient, _amount);

      return true;
  }
}

pragma solidity ^0.5.0;

contract Token {
    string  public name = "DApp Token";
    string  public symbol = "DAPP";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8   public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
