var TrackerContract = artifacts.require("./TrackerContract.sol");
var SupplyCoin = artifacts.require("./SupplyCoin.sol");
var SupplyBank = artifacts.require("./SupplyBank.sol");

module.exports = function(deployer) {
    // preventing deployment of contracts. using predeployed ones
    // deployer.deploy(TrackerContract);
    // deployer.deploy(SupplyCoin);
    // deployer.deploy(SupplyBank);
};