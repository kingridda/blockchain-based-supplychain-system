import React, {Component} from "react";

import Track from './TrackComponent';
import Test from './TestComponent';
import Test2 from './Test2Component';

import SimpleStorageContract from "../contracts/SimpleStorage.json";
import TrackerContract from "../contracts/TrackerContract.json";
import SupplyBank from "../contracts/SupplyBank.json"
import SupplyToken from "../contracts/SupplyToken.json"
import getWeb3 from "../getWeb3";



class Main extends Component{
    state = { storageValue: 7, web3: null, accounts: null, contract: null, trackerContract: null, manufacturer: null, item: null, a: null, itemIn: null};

    componentDidMount = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        const deployedNetwork2 = TrackerContract.networks[networkId];
        const instance = new web3.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        const trackerInstance = new web3.eth.Contract(
            TrackerContract.abi,
            deployedNetwork2 && deployedNetwork2.address
        );
  
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({ web3, accounts, contract: instance, trackerContract: trackerInstance }, this.runExample);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };
  
    runExample = async () => {
      const { accounts, contract, trackerContract } = this.state;
  
      //Stores a given value, 5 by default.
   //  await contract.methods.set(5).send({ from: accounts[0] });
  
      // Get the value from the contract to prove it worked.
      const response = await contract.methods.get().call();
      const itemResponse = await trackerContract.methods.getItem("product00").call();


      await trackerContract.methods.addItem("product02", "name2", "description2").call();
      const itemResponse2 = await trackerContract.methods.getItem("product02").call();
      console.log(itemResponse2);
  
      // Update state with the result.
      this.setState({ storageValue: response, item: itemResponse, a: {o: 8, b:9}, itemIn: itemResponse2 });

    };

    
    render(){
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
          }
        return (
            <div className="App">
                <div>The stored value is: {this.state.storageValue}</div>
                <Test2 item={ this.state.item} /> 
                <br />
                description: {this.state.itemIn} 
            </div>
        );
    }

}

export default Main;
