import React, { useState } from 'react';
import CustomerDetails from './CustomerDetails';
import SpecialDetails from './SpecialDetails';

const Details = ({ customer, onClose }) => {
  const [view, setView] = useState('main'); // 'main', 'customerDetails', 'specialDetails'
  const [orders, setOrders] = useState(customer.orders || []);
  const [newOrder, setNewOrder] = useState('');

  if (!customer) return null;

  const today = new Date().toISOString().slice(0, 10);

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (newOrder.trim()) {
      setOrders([...orders, newOrder.trim()]);
      setNewOrder('');
    }
  };

  const handleOrderChange = (e) => {
    setNewOrder(e.target.value);
  };

  return (
    <div className="card border-right" style={{ border: "4px solid gray" }}>
      <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      <div className="modal-header">
        <b><h3 className="modal-title" style={{ margin: "5px" }}>{customer.name}</h3></b>
      </div>
      <div className="card2-content">
        {view === 'main' && (
          <>
            <h5 className="card-subtitle mb-2 tbs"><b>Orders</b></h5>
            <ul className="list-group">
              {orders.slice(0, 5).map((order, index) => (
                <li key={index} className="list-group-item">{order}</li>
              ))}
            </ul>
            <form onSubmit={handleAddOrder} className="order-form">
              <input
                type="text"
                value={newOrder}
                onChange={handleOrderChange}
                placeholder="Enter new order"
                className="form-control"
              />
              <button type="submit" className="btn btn-primary add-order-btn">Add Order</button>
            </form>
            <br />
            <h5 className="card-subtitle mb-2 tbs"><b>Special Occasion</b></h5>
            {customer.specialOccasion && (
              <div className="special-occasion">
                <p className="card-text">{customer.specialOccasion.type}</p>
                {customer.specialOccasion.date === today && (
                  <p className="card-text">Today is the {customer.specialOccasion.type}</p>
                )}
              </div>
            )}
            <br />
            <h5 className="card-subtitle mb-2 tbs"><b>Favorite Dishes</b></h5>
            {customer.favoriteDishes && customer.favoriteDishes.length > 0 && (
              <select className="form-select" size={Math.min(customer.favoriteDishes.length, 5)}>
                {customer.favoriteDishes.map((dish, index) => (
                  <option key={index} value={dish}>{dish}</option>
                ))}
              </select>
            )}
            <div className="buttons">
              <button onClick={() => setView('customerDetails')} className="btn btn-secondary">Customer Details</button>
              <button onClick={() => setView('specialDetails')} className="btn btn-secondary">Special Details</button>
            </div>
          </>
        )}
        {view === 'customerDetails' && <CustomerDetails customer={customer} onBack={() => setView('main')} />}
        {view === 'specialDetails' && <SpecialDetails customer={customer} onBack={() => setView('main')} />}
      </div>
    </div>
  );
};

export default Details;


