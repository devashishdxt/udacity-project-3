import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Sidebar from './components/Sidebar';
import Admin from './pages/Admin';
import Consumer from './pages/Consumer';
import Distributor from './pages/Distributor';
import Farmer from './pages/Farmer';
import Home from './pages/Home';
import Retailer from './pages/Retailer';

const App = () => {
  let [address, setAddress] = useState("");

  if (address.length !== 0) {
    return (
      <main className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home address={address} setAddress={setAddress} />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/distributor" element={<Distributor />} />
          <Route path="/retailer" element={<Retailer />} />
          <Route path="/consumer" element={<Consumer />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    );
  } else {
    return (
      <main className="flex">
        <Home address={address} setAddress={setAddress} />
      </main>
    );
  }
}

export default App;
