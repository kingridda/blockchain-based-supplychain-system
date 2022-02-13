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


      // // await trackerContract.methods.addItem("product02", "name2", "description2").call();
      // // const itemResponse2 = await trackerContract.methods.getItem("product02").call();
  
      // // Update state with the result.
      // this.setState({  item: itemResponse, itemIn: itemResponse, transitioners: transitionersTemp });

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
    payManufacturer = async(amount, manufacturerAddr) => {
      const { accounts, supplyBankContract } = this.state;
      await supplyBankContract.methods.paySupplierWithSPL(manufacturerAddr, (amount*1e8)).send({from: accounts[0]});
    }

    
    render(){
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
          }
        return (
            <div className="app">
                <Header sendEther={this.sendEther} />
                <Track item={this.state.item} transitioners={this.state.transitioners} 
                        manufacturer={this.state.manufacturer} approveCoin={this.approveCoin} 
                        payManufacturer={this.payManufacturer} />
            </div>
        );
    }

}

export default Main;
