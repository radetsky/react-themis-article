import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import { initialize } from 'wasm-themis';

import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { KeyGen } from './components/Keygen';
import { SecureCellWithKey } from './components/SecureCellWithKey';
import { SecureCellWithPassphrase } from './components/SecureCellWithPass';
import { SecureMessageSignExample } from './components/SecureMessageSign';
import { SecureMessageEncryptExample } from './components/SecureMessageEncrypt';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initialize().then(() => {
      setIsInitialized(true);
    }).catch(err => {
      // console.log(err);
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home themisInitialized={isInitialized} />} />
          <Route path="/keygen" element={<KeyGen />} />
          <Route path="/secureCellWithKey" element={<SecureCellWithKey />} />
          <Route path="/secureCellWithPassphrase" element={<SecureCellWithPassphrase />} />
          <Route path="/secureMessageSign" element={<SecureMessageSignExample />} />
          <Route path="/secureMessageEncrypt" element={<SecureMessageEncryptExample />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
