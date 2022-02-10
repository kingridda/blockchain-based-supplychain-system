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
    address SUPPLY_COIN_ADDRESS_ROPSTEN = 0x61EAc9bF571782c62262a730F07A107f594F1c21;
    cETH ceth = cETH(COMPOUND_CETH_ADDRESS_ROPSTEN);

    IERC20 splCoin = IERC20(SUPPLY_COIN_ADDRESS_ROPSTEN);

    function getContractCEthBalance() public view returns(uint){
        return totalContractBalance;
    }
    function getContractEthBalance() public view returns(uint){
        return totalContractBalance*ceth.exchangeRateStored()/1e18;
    }
    

    receive() external payable{}
    
    /**
    * @dev Deposit Ether
    */
    function addBalance() public payable {
        _mint(msg.value);
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
        splCoin.mineForCEthHolder(msg.sender, cEthUser);
    }

    /**
    * @dev Withdraw a specific amount of Ether
    */
    function withdrawAmount(uint tokenAmount) public payable {
        splCoin.transferFrom(msg.sender, address(this), tokenAmount);//needs approval
        uint256 EthWithdrawn = _withdrawCEther(tokenAmount);//cETH = TOKEN AMOUNT
        totalContractBalance = ceth.balanceOf(address(this));

        address payable transferTo = payable(msg.sender); // get payable to transfer to sender's address
        transferTo.transfer(EthWithdrawn);
        
    }
    /**
    * @dev Redeems cETH for withdraw
    * @return Withdrawn cETH
    */
    function _withdrawCEther(uint256 _amountOfCEth) internal returns (uint256) {
     //   uint256 cEthContractBefore = ceth.balanceOf(address(this));
        uint256 EthContractBefore = address(this).balance;

        ceth.redeem(_amountOfCEth);

     //   uint256 cEthContractAfter = ceth.balanceOf(address(this));
        uint256 EthContractAfter = address(this).balance;

      //  uint256 cEthWithdrawn = cEthContractBefore - cEthContractAfter;
        uint256 EthWithdrawn = EthContractAfter - EthContractBefore;
        return EthWithdrawn;
    }


    function paySupplierWithSPL(address to, uint amount) external{
        splCoin.transferFrom(msg.sender, to, amount);
    }
}
