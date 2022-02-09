// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
* @title cETH Token
* @dev Utilities for CompoundETH
**/
interface cETH {
    
    //@dev functions from Compound that are going to be used
    function mint() external payable; // to deposit to compound
    function redeem(uint redeemTokens) external returns (uint); // to withdraw from compound
    function redeemUnderlying(uint redeemAmount) external returns (uint); // Redeem specified Amount
    //following 2 functions to determine how much you'll be able to withdraw
    function exchangeRateStored() external view returns (uint); 
    function balanceOf(address owner) external view returns (uint256 balance);
}

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    
    //special functions for the supply contract
    function mineForCEthHolder(address to, uint amount) external;
    function burnForCEthHolder(address to, uint amount) external;

}

/**
 * @title Bank
 * @dev Store & Widthdraw Eth, using Compound under the hood
 */
contract SupplyBank {

    uint totalContractBalance = 0;
    
    // CETH contract at Ropsten ethereum testnet
    address COMPOUND_CETH_ADDRESS_ROPSTEN = 0x859e9d8a4edadfEDb5A2fF311243af80F85A91b8;
    address SUPPLY_TOKEN_ADDRESS_ROPSTEN = 0xd1dC374975EabD303256B081E00b39CAec1897d0;
    cETH ceth = cETH(COMPOUND_CETH_ADDRESS_ROPSTEN);
    IERC20 splt = IERC20(SUPPLY_TOKEN_ADDRESS_ROPSTEN);

    function getContractBalance() public view returns(uint){
        return totalContractBalance;
    }
    
    mapping(address => uint) balances;
    mapping(address => uint) ethBalances; // Eth Balance
    mapping(address => uint) erc20Balances; // ERC20 Balance
    receive() external payable{}
    
    /**
    * @dev Deposit Ether
    */
    function addBalance() public payable {
        _mint(msg.value);
    }

    /**
    * @dev get the amount of stored Ether
    */
    function getBalance(address userAddress) public view returns(uint256) {
        // get cETH of user then multiply by exchange rate to get Eth balance
        return balances[userAddress]*ceth.exchangeRateStored()/1e18;
    }

    /**
    * @dev get cETH Balance 
    */
    function getCethBalance(address userAddress) public view returns(uint256) {
        return balances[userAddress];
    }

    /**
    * @dev get Deposited/Withdrawn ETH amount
    */
    function getEthBalance(address userAddress) public view returns(uint256) {
        return ethBalances[userAddress];
    }

    /**
    * @dev Mints an specific amount of cEth
    */
    function _mint(uint amountEther) internal {
        
        uint256 cEthBeforeMint = ceth.balanceOf(address(this));
        
        // send ethers to mint()
        ceth.mint{value: amountEther}();
        
        uint256 cEthAfterMint = ceth.balanceOf(address(this));
        
        uint cEthUser = cEthAfterMint - cEthBeforeMint;
        totalContractBalance +=cEthUser;
        splt.mineForCEthHolder(msg.sender, cEthUser);
    }

    function mineForCLT()external{
        splt.mineForCEthHolder(msg.sender, 10*1e8);
    }


    /**
    * @dev Withdraws all the Ether
    */
    function withdrawMax() public payable {
        address payable transferTo = payable(msg.sender); // get payable to transfer towards
        ceth.redeem(balances[msg.sender]); // Redeem that cETH
        uint256 amountToWithdraw = getBalance(msg.sender); // Avalaible amount of $ that can be Withdrawn
        totalContractBalance -= balances[msg.sender];
        balances[msg.sender] = 0;
        transferTo.transfer(amountToWithdraw);
    }
    /**
    * @dev Withdraw a specific amount of Ether
    */
    function withdrawAmount(uint amountRequested) public payable {
        require(amountRequested <= getBalance(msg.sender), "Your balance is smaller than the requested amount");
        address payable transferTo = payable(msg.sender); // get payable to transfer to sender's address
        
        uint256 cEthWithdrawn = _withdrawCEther(amountRequested);

        totalContractBalance -= cEthWithdrawn;
        balances[msg.sender] -= cEthWithdrawn;
        transferTo.transfer(amountRequested);
        
    }

    
    /**
    * @dev Redeems cETH for withdraw
    * @return Withdrawn cETH
    */
    function _withdrawCEther(uint256 _amountOfEth) internal returns (uint256) {
        uint256 cEthContractBefore = ceth.balanceOf(address(this));
        ceth.redeemUnderlying(_amountOfEth);
        uint256 cEthContractAfter = ceth.balanceOf(address(this));

        uint256 cEthWithdrawn = cEthContractBefore - cEthContractAfter;

        return cEthWithdrawn;
    }


    function paySupplyWithSPLT(address to, uint amount) external{
        splt.transferFrom(msg.sender, to, amount);
    }
}
