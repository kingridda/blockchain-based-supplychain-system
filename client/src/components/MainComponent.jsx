import React, {Component} from "react";

import Track from './TrackComponent';
import HeaderNav from './HeaderNavComponent';
import Test from './TestComponent';
import Test2 from './Test2Component';
import PayTransition from './PayTransitionComponent';

import TrackerContract from "../contracts/TrackerContract.json";
import SupplyBank from "../contracts/SupplyBank.json"
import SupplyCoin from "../contracts/SupplyCoin.json"
import getWeb3 from "../getWeb3";



class Main extends Component{
    state = {web3: null, accounts: null, ii: null, trackerContract: null, supplyBankContract: null, supplyCoinContract: null, manufacturer: null, item: null, a: null, itemIn: null};

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
        this.setState({ web3, accounts, trackerContract: trackerInstance, supplyBankContract: supplyBankInstance, supplyCoinContract: supplyCoinInstance }, this.runExample);
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
  

      // Get the value from the contract to prove it worked.
      const itemResponse = await trackerContract.methods.getItem("product00").call();


      // await trackerContract.methods.addItem("product02", "name2", "description2").call();
      // const itemResponse2 = await trackerContract.methods.getItem("product02").call();
      console.log(itemResponse);
  
      // Update state with the result.
      this.setState({  item: itemResponse, itemIn: itemResponse });

    };

    
    render(){
        // if (!this.state.web3) {
        //     return <div>Loading Web3, accounts, and contract...</div>;
        //   }
        return (
            <div className="App">
                <HeaderNav />
                <Track item={this.state.item}/>
            </div>
        );
    }

}

export default Main;
