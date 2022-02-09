var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var TrackerContract = artifacts.require("./TrackerContract.sol");
var SupplyToken = artifacts.require("./SupplyToken.sol");
var SupplyBank = artifacts.require("./SupplyBank.sol");

module.exports = function(deployer) {
    deployer.deploy(SimpleStorage);
    deployer.deploy(TrackerContract);
    deployer.deploy(SupplyToken);
    deployer.deploy(SupplyBank);
};