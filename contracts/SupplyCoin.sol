pragma solidity >=0.7.0 <0.9.0;


contract SupplyCoin {
    string NAME = "SupplyCoin";
    string SYMBOL = "SPL";
    uint totalMinted = 0;
    address deployer;
    // supply contract address has previliges to mint and burn
    address supplyContract;
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowances;


    modifier onlySupplyContract(){
        require(msg.sender == supplyContract, "Only Supply Contract Allowed");
        _;
    }
    modifier onlyAdmin(){
        require(msg.sender == deployer);
        _;
    }
    
    constructor(){
        deployer = msg.sender;
    }
    function setSupplyContract(address addr) external onlyAdmin{
        supplyContract = addr;
    }
    function mineForCEthHolder(address to, uint amount) external {
        balances[to] = balances[to] + amount;
        totalMinted = totalMinted + amount;
    }
    function burnForCEthHolder(address to, uint amount) external {
        balances[to] = balances[to] - amount;
        totalMinted = totalMinted - amount;
    }
    
    function name() public view returns (string memory){
        return NAME;
    }
    
    function symbol() public view returns (string memory) {
        return SYMBOL;
    }
    
    function decimals() public view returns (uint8) {
        return 8;
    }
    
    function totalSupply() public view returns (uint256) {
        return 10000000 * 1e8; //10M * 10^8 because decimals is 8
    }
    
    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];    
    }
    
    function transfer(address _to, uint256 _value) public returns (bool success) {
        assert(balances[msg.sender] > _value);
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        
        emit Transfer(msg.sender, _to, _value);
        
        return true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        if(balances[_from] < _value)
            return false;
        
        if(allowances[_from][msg.sender] < _value)
            return false;
            
        balances[_from] -= _value;
        balances[_to] += _value;
        allowances[_from][msg.sender] -= _value;
        
        emit Transfer(_from, _to, _value);
        
        return true;
    }
    
    
    
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
    }
    
    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowances[_owner][_spender];
    }
        

    
}
