import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FcApproval, FcHighPriority } from 'react-icons/fc';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Card2 from './Card2';
import Details from './Details';

const LiveRecognition = ({ state, setState }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Sample data for new customers
  const [newCustomers, setNewCustomers] = useState([
    { id: 9, name: 'Customer 1', orders: [], specialOccasion: null },
    { id: 10, name: 'Customer 2', orders: [], specialOccasion: null },
    { id: 11, name: 'Customer 3', orders: [], specialOccasion: null },
    { id: 12, name: 'Customer 4', orders: [], specialOccasion: null },
    { id: 13, name: 'Customer 9', orders: [], specialOccasion: null },
    { id: 14, name: 'Customer 10', orders: [], specialOccasion: null },
    { id: 15, name: 'Customer 11', orders: [], specialOccasion: null },
    { id: 16, name: 'Customer 12', orders: [], specialOccasion: null },
    { id: 12, name: 'Customer 4', orders: [], specialOccasion: null },
    { id: 13, name: 'Customer 9', orders: [], specialOccasion: null },
    { id: 14, name: 'Customer 10', orders: [], specialOccasion: null },
    { id: 15, name: 'Customer 11', orders: [], specialOccasion: null },
    { id: 16, name: 'Customer 12', orders: [], specialOccasion: null },
  ]);

  const { recognizedCustomers, addCustomerToRecognized } = useAppContext();
  const navigate = useNavigate();

  // Handle click on customer item
  const handleCustomerClick = (customer) => {
    navigate('/form', { state: { customer } });
  };

  // Handle form submission to add a new customer
  const handleFormSubmission = (newCustomer) => {
    addCustomerToRecognized(newCustomer);

    // Remove the customer from newCustomers list
    setNewCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== newCustomer.id)
    );

    // Clear selected customer after adding to recognized customers
    setSelectedCustomer(null);
  };

  return (
    <Container fluid>
      <Row>
        {/* Recognized Customers Section */}
        <Col md={4} className="border-right">
          <div className="bor">
            <h3 className="section-title">
              Recognized Customers <FcApproval />
            </h3>
            <div className="customer-grid">
              {recognizedCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="customer-item"
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setState('details');
                  }}
                >
                  <CgProfile size={50} className="profile-icon" />
                  <span className="customer-name">{customer.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>

        {/* New Customers Section */}
        <Col md={4} className="border-right">
          <div className="bor">
            <h3 className="section-title">
              New Customers <FcHighPriority />
            </h3>
            <div className="customer-grid">
              {newCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="customer-item"
                  onClick={() => handleCustomerClick(customer)}
                >
                  <CgProfile size={50} className="profile-icon" />
                  <span className="customer-name">{customer.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>

        {/* Details/Card Section */}
        <Col md={4}>
        <div className='bor'>
          {state === 'details' && selectedCustomer ? (
            <Details customer={selectedCustomer} onClose={() => setState('Card2')} />
          ) : (
            <Card2 />
          )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LiveRecognition;
