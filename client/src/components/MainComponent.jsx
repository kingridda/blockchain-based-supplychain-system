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
import { ModalBody, Modal, Button } from "reactstrap";



class Main extends Component{
    state = {networkId: 3, web3: null, accounts: null, ii: null, trackerContract: null, 
      supplyBankContract: null, supplyCoinContract: null, manufacturer: null, transitioners: null,
       item: null, a: null, itemIn: null, purchaseCoinModalOpened: false, paymentModalOpened: false};

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
  

      // Get the value from the contract to prove it worked.
      const transitionersTemp = {};
      const itemResponse = await trackerContract.methods.getItem("product00").call();
      itemResponse.transitions.map(async tr => {
        transitionersTemp[tr.transitionerAddr]=(await trackerContract.methods.getTransitioner(tr.transitionerAddr).call());
      });


      // await trackerContract.methods.addItem("product02", "name2", "description2").call();
      // const itemResponse2 = await trackerContract.methods.getItem("product02").call();
  
      // Update state with the result.
      this.setState({  item: itemResponse, itemIn: itemResponse, transitioners: transitionersTemp });

    };

    purchaseCoinModal = ()=>{
      console.log("coin model");
      this.setState({purchaseCoinModalOpened: !this.state.purchaseCoinModalOpened})
    }
    payManufacturerModal = () =>{
      console.log("man model");
      this.setState({paymentModalOpened: !this.state.paymentModalOpened})
    }
    sendEther = async() => {
      const { accounts, supplyBankContract } = this.state;
      await supplyBankContract.methods.addBalance().send({from: accounts[0], value: 1e18});

    }
    approveCoin = async() => {
      const { accounts, supplyCoinContract, supplyBankContract } = this.state;
      var amount = 1e8;
      await supplyCoinContract.methods.approve(SupplyBank.networks[this.state.networkId].address, amount).send({from: accounts[0]});
    }
    payManufacturer = async() => {
      const { accounts, supplyCoinContract, supplyBankContract } = this.state;
      var amount = 1e8;
      await supplyCoinContract.methods.paySupplierWithSPL("", amount).send({from: accounts[0]});
    }

    
    render(){
        // if (!this.state.web3) {
        //     return <div>Loading Web3, accounts, and contract...</div>;
        //   }
        console.log(this.state.transitioners)

        return (
            <div className="App">
                <HeaderNav purchaseCoinModal={this.purchaseCoinModal}/>
                <Track item={this.state.item} transitioners={this.state.transitioners} payManufacturerModal={this.payManufacturerModal}/>
                {this.state.purchaseCoinModalOpened &&
                <div>
                  <div><input type="number" name="amount" />Ether</div>
                  <Button onClick={this.sendEther}>Deposit Ether</Button>
                </div>
                }
                {this.state.paymentModalOpened &&
                  <div>
                  <div><input type="number" name="amount" />Ether</div>
                  <Button onClick={this.sendEther}>Deposit Ether</Button>
                  </div>
                }
                <Button onClick={this.approveCoin}>Approve</Button>
                <Button onClick={this.sendEther}>Pay</Button>
            </div>
        );
    }

}

export default Main;
