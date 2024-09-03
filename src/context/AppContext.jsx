
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [recognizedCustomers, setRecognizedCustomers] = useState([]);

  const addCustomerToRecognized = (customer) => {
    setRecognizedCustomers((prevCustomers) => [...prevCustomers, customer]);
  };

  return (
    <AppContext.Provider value={{ recognizedCustomers, addCustomerToRecognized }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
