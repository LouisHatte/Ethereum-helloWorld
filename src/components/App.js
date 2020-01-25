import React, { Component } from 'react'
import './App.css'
import HelloWorld from '../abis/HelloWorld.json'

import Web3 from 'web3'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            helloWorld: null,
            message: 'Empty message'
        }
    }

    async componentDidMount() {
        window.ethereum.autoRefreshOnNetworkChange = false
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadBlockchainData() {
        const accounts = await window.web3.eth.getAccounts()
        this.setState({account: accounts[0]})

        const networkId = await window.web3.eth.net.getId()
        const networkHelloWorld = HelloWorld.networks[networkId]
        if (networkHelloWorld) {
            const helloWorld = await new window.web3.eth.Contract(HelloWorld.abi, networkHelloWorld.address)
            this.setState({helloWorld})

            const message = await helloWorld.methods.message().call()
            this.setState({message})
        }
    }

    render() {
        return (
            <div className="main-div">
                <h1>Message: {this.state.message}</h1>
                <h2>Account: {this.state.account}</h2>
            </div>
        );
    }
}

export default App;
