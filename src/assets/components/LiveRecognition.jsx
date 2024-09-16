import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FcApproval, FcHighPriority } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Card2 from './Card2';
import Details from './Details';

const LiveRecognition = ({ state, setState }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { recognizedCustomers, addCustomerToRecognized } = useAppContext();
  const navigate = useNavigate();

  // Timer for each recognized customer
  const [arrivalTimes, setArrivalTimes] = useState({});

  // Increment each customer's time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setArrivalTimes((prevTimes) => {
        const updatedTimes = { ...prevTimes };
        Object.keys(updatedTimes).forEach((customerId) => {
          updatedTimes[customerId] += 1; // Increment time by 1 minute
        });
        return updatedTimes;
      });
    }, 60000); // Update every 1 minute

    return () => clearInterval(interval);
  }, []);

  // Function to handle form submission for new customer
  const handleFormSubmission = (newCustomer) => {
    addCustomerToRecognized(newCustomer);

    // Initialize the timer for the new customer to 0 minutes
    setArrivalTimes((prev) => ({ ...prev, [newCustomer.id]: 0 }));

    setSelectedCustomer(null);
  };

  // Sample data for new customers
  const [newCustomers, setNewCustomers] = useState([
    { id: 1, name: 'Customer 1', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Customer 2', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, name: 'Customer 3', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, name: 'Customer 4', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: 5, name: 'Customer 5', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { id: 6, name: 'Customer 6', image: 'https://randomuser.me/api/portraits/men/6.jpg' },
    { id: 7, name: 'Customer 7', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
  ]);

  const handleCustomerClick = (customer) => {
    navigate('/form', { state: { customer } });
  };

  // Function to determine the timer color based on time
  const getTimerColor = (time) => {
    return time >= 10 ? 'red' : 'green'; // Red if time >= 10 mins, green otherwise
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
                  <div className="profile-container">
                    {/* Display the correct image */}
                    <img
                      src={customer.image || 'https://randomuser.me/api/portraits/men/1.jpg'} // Fallback image
                      alt={customer.name}
                      className="profile-icon"
                    />
                    {/* Timer showing time passed */}
                    <div
                      className="arrival-time"
                      style={{
                        backgroundColor: getTimerColor(arrivalTimes[customer.id]),
                      }}
                    >
                      {arrivalTimes[customer.id] || 0} 
                    </div>
                  </div>
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
                  <div className="profile-container">
                    {/* Display the correct image */}
                    <img
                      src={customer.image}
                      alt={customer.name}
                      className="profile-icon"
                    />
                  </div>
                  <span className="customer-name">{customer.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>

        {/* Details/Card Section */}
        <Col md={4}>
          <div className="bor">
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
