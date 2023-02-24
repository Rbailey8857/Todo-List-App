import React, {useState, useEffect, useContext, use} from 'react';


// INTERNAL IMPORT 
import { ToDoListContext } from 'context/ToDolistApp';


const Home = () => {
  const {checkIfWalletIsConnected} = useContext(ToDoListContext);

  useEffect(()=>{
        checkIfWalletIsConnected();
  }, []);
  return (
    <div>Home</div>
  )
}

export default Home;