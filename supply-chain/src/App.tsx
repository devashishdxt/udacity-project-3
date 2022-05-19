import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

import './App.css';
import Sidebar from './components/Sidebar';
import Admin from './pages/Admin';
import Consumer from './pages/Consumer';
import Distributor from './pages/Distributor';
import Farmer from './pages/Farmer';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Retailer from './pages/Retailer';

type Web3State = {
  address: string | null;
  web3: Web3 | null;
  contract: Contract | null;
};

const App = () => {
  let [web3State, setWeb3State] = useState<Web3State>({
    address: null,
    web3: null,
    contract: null,
  });

  if (web3State.web3 !== null) {
    return (
      <main className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home address={web3State.address} />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/distributor" element={<Distributor />} />
          <Route path="/retailer" element={<Retailer />} />
          <Route path="/consumer" element={<Consumer />} />
          <Route path="/admin" element={<Admin web3State={web3State} />} />
        </Routes>
      </main>
    );
  } else {
    return (
      <main className="flex">
        <Landing setWeb3State={setWeb3State} />
      </main>
    );
  }
}

export default App;
export type { Web3State };

