import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Web3Modal from 'web3modal';
import { useCallback, useEffect, useReducer, useState, useRef } from 'react'
import { ethers, providers } from 'ethers'
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from 'walletlink'
import React from 'react';
import { useAccount, useConnect, useEnsName, useDisconnect  } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'



const inter = Inter({ subsets: ['latin'] })


const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "2df30cadfe3e4702bac6294a7f50b6f3", // required
    },
  },
  'custom-walletlink': {
    display: {
      logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
      name: 'Coinbase',
      description: 'Connect to Coinbase Wallet (not Coinbase App)',
    },
    options: {
      appName: 'Coinbase', // Your app name
      networkUrl: `https://mainnet.infura.io/v3/2df30cadfe3e4702bac6294a7f50b6f3`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options
      const walletLink = new WalletLink({
        appName,
      })
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
      await provider.enable()
      return provider
    },
  },
}

let web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
  })
}

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      }
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainId: action.chainId,
      }
    case 'RESET_WEB3_PROVIDER':
      return initialState
    default:
      throw new Error()
  }
}

export default function Home() {

  // WALLECT CONNECT WITH WEB3MODAL FUNCTIONALITY
  const [state, dispatch] = useReducer(reducer, initialState)
  const { provider, web3Provider, address, chainId } = state

  // const connect = useCallback(async function () {
    
  //   const provider = await web3Modal.connect()
  //   const web3Provider = new providers.Web3Provider(provider)
    


  //   const signer = web3Provider.getSigner()
  //   const address = await signer.getAddress()

  //   const network = await web3Provider.getNetwork()
    

  //   dispatch({
  //     type: 'SET_WEB3_PROVIDER',
  //     provider,
  //     web3Provider,
  //     address,
  //     chainId: network.chainId,
  //   })
  // }, [])

  // const disconnect = useCallback(
  //   async function () {
  //     await web3Modal.clearCachedProvider()
  //     if (provider?.disconnect && typeof provider.disconnect === 'function') {
  //       await provider.disconnect()
  //     }
  //     dispatch({
  //       type: 'RESET_WEB3_PROVIDER',
  //     })
  //   },
  //   [provider]
  // )

    // TODO-LIST FUNCTIONALITY
    const [tasks, setTasks] = useState([
      { id: 1, text: 'Task 1' },
      { id: 2, text: 'Task 2' },
      { id: 3, text: 'Task 3' },
    ]);
  
    const [newTaskText, setNewTaskText] = useState('');

    const [editingTaskId, setEditingTaskId] = useState(null);
  
    const handleNewTaskChange = (event) => {
      setNewTaskText(event.target.value);
    };
  
    const handleNewTaskSubmit = (event) => {
      event.preventDefault();
      if (newTaskText.trim() === '') {
        return;
      }
      const newTask = {
        id: Date.now(),
        text: newTaskText,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    };

    const handleTaskEdit = (taskId, newText) => {
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, text: newText };
        }
        return task;
      });
      setTasks(updatedTasks);
      setEditingTaskId(null);
    };
  
    const handleTaskDelete = (taskId) => {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    };

    // WAGMI FUNCTIONALITY
    const { addy, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const [setWalletDetails] = useState(false);
    const { data: ensName } = useEnsName({ address })
    const { connect } = useConnect({
    connector: new InjectedConnector(),
    })

    const { data, isError, isLoading } = useEnsName({
      address: addy,
    }) //LEFT OFF HERE!!!!

    const logout = () => {
      disconnect();
    };

    

  return (
    <>
      <Head>
        <title>TaskMaster</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {isConnected ? (
          <>
            {/* AFTER LOGIN */}
            <div className='text-white font-gaj font-bold text-xl'>
              Hello {data} 
            </div>
            <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center font-sans">
              <div className="bg-white rounded-lg shadow-md w-full max-w-lg">
                <div className="bg-secondary text-white font-gaj font-bold text-xl px-4 py-3 rounded-t-lg">
                  Todo List
                </div>
                <div className="p-4">
                  <form onSubmit={handleNewTaskSubmit} className="flex items-center mb-4">
                    <input type="text" className="rounded-lg border-gray-300 py-2 px-4 w-full" placeholder="Add task" value={newTaskText} onChange={handleNewTaskChange} />
                    <button className="bg-secondary hover:bg-secondary-dark text-white font-gaj font-medium px-4 py-2 rounded-lg ml-2">
                      Add
                    </button>
                  </form>
                  <ul className="divide-y divide-gray-300">
                    {tasks.map((task) => (
                      <li key={task.id} className="py-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-secondary focus:ring-2 focus:ring-offset-2 focus:ring-secondary" />
                          <span className="ml-2 font-medium text-gray-900">
                            {task.text}
                          </span>
                        </div>
                        <button className="text-secondary hover:text-secondary-dark font-gaj font-medium" onClick={() => handleTaskDelete(task.id)}>
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button className="bg-secondary hover:bg-secondary-dark text-white font-gaj font-medium px-4 py-2 rounded-lg mt-4" type="button" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </>
          
        ) : (
          //BEFORE LOGIN
          <>
            <div className='min-h-screen overflow-hidden flex flex-col justify-center items-center text-center'>
              <h1 className='text-primary font-gaj text-4xl md:text-7xl font-bold mb-8'>
                TaskMaster
              </h1>
              <button className='bg-secondary hover:bg-secondary-dark text-white font-gaj text-3xl md:text-5xl px-12 md:px-16 py-4 md:py-6 rounded-lg' type="button" onClick={() => connect()}>
                Login
              </button>
            </div>
          </>
          
        )}
    </>
  )
}
