import React, {Component} from "react";

import Track from './TrackComponent';
import Header from './HeaderComponent';
import Test from './TestComponent';
import Test2 from './Test2Component';
import PayTransition from './PayTransitionComponent';

import TrackerContract from "../contracts/TrackerContract.json";
import SupplyBank from "../contracts/SupplyBank.json"
import SupplyCoin from "../contracts/SupplyCoin.json"
import getWeb3 from "../getWeb3";

class Main extends Component{
    state = {networkId: 3, web3: null, accounts: null, trackerContract: null, 
      supplyBankContract: null, supplyCoinContract: null, manufacturer: null, transitioners: null,
       item: null};

    componentDidMount = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork1 = TrackerContract.networks[networkId];
        const deployedNetwork2 = SupplyBank.networks[networkId];
        const deployedNetwork3 = SupplyCoin.networks[networkId];

        const trackerInstance = new web3.eth.Contract(
            TrackerContract.abi,
            deployedNetwork1 && deployedNetwork1.address
        );
        const supplyBankInstance = new web3.eth.Contract(
          SupplyBank.abi,
          deployedNetwork2 && deployedNetwork2.address
        );
        const supplyCoinInstance = new web3.eth.Contract(
          SupplyCoin.abi,
          deployedNetwork3 && deployedNetwork3.address
        );
  
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({networkId: networkId, web3, accounts, trackerContract: trackerInstance, supplyBankContract: supplyBankInstance, supplyCoinContract: supplyCoinInstance }, this.runExample);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };
  
    runExample = async () => {
      const { accounts, trackerContract } = this.state;
  

      // // Get the value from the contract to prove it worked.
      // const transitionersTemp = {};
      // const itemResponse = await trackerContract.methods.getItem("product00").call();
      // itemResponse.transitions.map(async tr => {
      //   transitionersTemp[tr.transitionerAddr]=(await trackerContract.methods.getTransitioner(tr.transitionerAddr).call());
      // });

      var tempItem = {name: "iPhone 11", description: "With its 6.1-inch display, the iPhone 11 is between the 5.4-inch 'mini' iPhone models like the iPhone 13 mini and Apple's larger models like the 6.7-inch iPhone 13 Pro Max in size. The iPhone 11 has an edge-to-edge display with slim bezels and no Home button, adopting a notch at the top for the TrueDepth camera system", createdAt: (new Date().getTime())/1000, 
                      transitions: [ {transitionerAddr: 0, decision: true, createdAt: (new Date().getTime())/1000 }, {transitionerAddr: 1, decision: true, createdAt: (new Date().getTime())/1000 }, {transitionerAddr: 2, decision: true, createdAt: (new Date().getTime())/1000 }]};
      
      var manu = {name: "Apple Inc", description: " Apple Inc. designs, manufactures and markets smartphones, personal computers, tablets, wearables and accessories, and sells a variety of related services. The Company's products include iPhone, Mac, iPad, and Wearables, Home and Accessories. iPhone is the Company's line of smartphones based on its iOS operating system. ", createdAt: (new Date().getTime())/1000}
      var trs =  [manu,
        {name: "Administration marocaine des Douanes et Impôts Indirects", description: " Chargée de la perception des droits et taxes douanières, du recouvrement des impositions fiscales et parafiscales, de la lutte contre les trafics illicites et du contrôle des marchandises et des personnes aux frontières ", createdAt: (new Date().getTime())/1000}, 
        {name: "Marjane Hay Riad, Rabat", description: " Marjane (also Marjane Holding) a Moroccan hypermarket chain. It is wholly owned by SNI,the name of the company has changed to 'Al Mada'. The chain opened its first supermarket, in 1990, in Rabat. In 2008, the company had 33 hypermarkets around Morocco. ", createdAt: (new Date().getTime())/1000}] 
      // // await trackerContract.methods.addItem("product02", "name2", "description2").call();
      // // const itemResponse2 = await trackerContract.methods.getItem("product02").call();
  
      // // Update state with the result.
       this.setState({  item: tempItem, manufacturer: manu, transitioners: trs});

    };

    sendEther = async(value) => {
      // NB: value in ether 18 decimals
      const { accounts, supplyBankContract } = this.state;
      await supplyBankContract.methods.addBalance().send({from: accounts[0], value: (value*1e18)});
    }
    approveCoin = async(amount) => {
      // note amount of ERC20 : 8 decimals
      const { accounts, supplyCoinContract } = this.state;
      await supplyCoinContract.methods.approve(SupplyBank.networks[this.state.networkId].address, (amount*1e8)).send({from: accounts[0]});
    }
    payManufacturer = async(manufacturerAddr, amount) => {
      const { accounts, supplyBankContract } = this.state;
      await supplyBankContract.methods.paySupplierWithSPL(manufacturerAddr, (amount*1e8)).send({from: accounts[0]});
    }
    addTransition = async(prodId) => {
      const { accounts, trackerContract } = this.state;
      await trackerContract.methods.addTransition(prodId, true).send({from: accounts[0]});

    }
    
    render(){
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
          }
        return (
            <div className="app">
                <Header sendEther={this.sendEther} />
                <Track  prodId={"product03"}
                        item={this.state.item} transitioners={this.state.transitioners} 
                        manufacturer={this.state.manufacturer} approveCoin={this.approveCoin} 
                        payManufacturer={this.payManufacturer}
                        addTransition={this.addTransition} />
            </div>
        );
    }

}

export default Main;
