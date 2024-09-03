// src/App.jsx
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Navbar from './assets/components/Navbar';
import LiveRecognition from './assets/components/LiveRecognition';
import Form from './assets/components/Form';
import Details from './assets/components/Details';
import Loading from './assets/components/Loading'; // Import the Loading component
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

function App() {
  const [state, setState] = useState('Card2');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setState('details');
  };

  return (
    <AppProvider> {/* Wrap your component tree with AppProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <LiveRecognition 
                state={state} 
                setState={setState} 
                setSelectedCustomer={handleCustomerSelect} 
                setLoading={setLoading} // Pass setLoading function
              />
            }
          />
          <Route
            path="/form"
            element={<Form />}
          />
          <Route
            path="/details"
            element={state === 'details' && selectedCustomer ? <Details customer={selectedCustomer} onClose={() => setState('Card2')} /> : null}
          />
        </Routes>
        {
          state === 'Card2' && !selectedCustomer && loading && <Loading />
        }
      </Router>
    </AppProvider>
  );
}

export default App;
