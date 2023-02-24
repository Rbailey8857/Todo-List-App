import React from 'react';
import { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

//INTERNAL IMPORTS
import {toDoListAddress, toDoListABI } from './constants';

const fetchContract = (signerOrProvider) => 
  new ethers.Contract(toDoListAddress, toDoListABI, signerOrProvider);
  
export const ToDoListContext = React.createContext();

export const ToDoListProvider = ({children}) => {

    const [currentAccount, setCurrenAccout] = useState("");
    const [error, setError] = useState("");
    const [allToDoList, setAllToDoList] = useState([]);
    const [myList, setMyList] = useState([]);

    const [allAddress, setAllAddress] = useState([]);

    // - - - - CONNECTING WEB3
    const checkIfWalletIsConnected = async()=> {
        if (!window.ethereum) return setError("please install Metamask");

        const account = await window.ethereum.request({method: "eth_accounts"})

        if (account.length) {
            setCurrenAccout(account[0]);
            console.log(account[0]);
        } else {
            setError("Please install Metamask, connect and reload the page");
        }
    }

    // useEffect(()=>{
    //     checkIfWalletIsConnected();
    // })

    return(
        <ToDoListContext.Provider value={{checkIfWalletIsConnected}}>
            {children}
        </ToDoListContext.Provider>
    )
}

const ToDolistApp = () => {
    return (
        <div>hello</div>
    )
}

export default ToDolistApp