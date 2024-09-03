// src/assets/components/Form.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { FaWheelchairMove } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { BiSolidDish } from "react-icons/bi";
import { PiForkKnifeFill } from "react-icons/pi";
import { MdDriveFileRenameOutline } from "react-icons/md";

const Form = () => {
  const { addCustomerToRecognized } = useAppContext(); // Use the context hook
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    cuisine: '',
    specialOccasion: '',
    specialOccasionDate: '',
    assistance: '',
    favoriteDishes: [], // Changed from previousOrders to favoriteDishes
  });
  const [newDish, setNewDish] = useState(''); // State for new dish input

  const customer = location.state?.customer || {};

  useEffect(() => {
    if (customer) {
      setFormData({
        customerName: customer.name || '',
        cuisine: '',
        specialOccasion: customer.specialOccasion?.type || '',
        specialOccasionDate: customer.specialOccasion?.date || '',
        assistance: '',
        favoriteDishes: customer.favoriteDishes || [], // Load dishes if available
      });
    }
  }, [customer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: Date.now(), // Unique ID for demonstration; replace with backend logic if needed
      name: formData.customerName,
      orders: [], // Add any additional logic to capture orders
      specialOccasion: {
        type: formData.specialOccasion,
        date: formData.specialOccasionDate,
      },
      assistance: formData.assistance,
      favoriteDishes: formData.favoriteDishes, // Add favorite dishes to customer
    };
    addCustomerToRecognized(newCustomer);
    setFormData({
      customerName: '',
      cuisine: '',
      specialOccasion: '',
      specialOccasionDate: '',
      assistance: '',
      favoriteDishes: [], // Reset dishes
    });
    setNewDish(''); // Clear new dish input
    navigate('/');
  };

  const handleAddDish = (e) => {
    e.preventDefault();
    if (newDish.trim()) {
      setFormData({
        ...formData,
        favoriteDishes: [...formData.favoriteDishes, newDish.trim()],
      });
      setNewDish(''); // Clear input field
    }
  };

  const handleDishChange = (e) => {
    setNewDish(e.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="styling row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card-form border-light shadow-sm bg-dark text-light text">
            <div className=" text-center form-heading">
              <h3>Customer Information Form</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Customer Name */}
                <div className="mb-3">
                  <label htmlFor="customerName" className="form-lbl">Customer Name <MdDriveFileRenameOutline /></label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerName"
                    placeholder="Enter your name"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  />
                </div>

                {/* Cuisine Preference */}
                <div className="mb-3">
                  <label className="form-lbl">Customer Preference</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="veg"
                      checked={formData.cuisine.includes('veg')}
                      onChange={(e) => setFormData({ ...formData, cuisine: e.target.checked ? 'veg' : '' })}
                    />
                    <label className="form-cl" htmlFor="veg">Veg</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="nonVeg"
                      checked={formData.cuisine.includes('nonVeg')}
                      onChange={(e) => setFormData({ ...formData, cuisine: e.target.checked ? 'nonVeg' : '' })}
                    />
                    <label className="form-cl" htmlFor="nonVeg">Non-Veg</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="vegan"
                      checked={formData.cuisine.includes('vegan')}
                      onChange={(e) => setFormData({ ...formData, cuisine: e.target.checked ? 'vegan' : '' })}
                    />
                    <label className="form-cl" htmlFor="vegan">Vegan</label>
                  </div>
                </div>

                {/* Cuisine Type */}
                <div className="mb-3">
                  <label htmlFor="cuisine" className="form-lbl">Cuisine Preference <BiSolidDish /></label>
                  <select
                    className="form-select"
                    id="cuisine"
                    value={formData.cuisine}
                    onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                  >
                    <option value="">Select Cuisine</option>
                    <option value="indian">Indian</option>
                    <option value="mexican">Mexican</option>
                    <option value="chinese">Chinese</option>
                    <option value="continental">Continental</option>
                    <option value="american">American</option>
                    <option value="italian">Italian</option>
                  </select>
                </div>

                {/* Special Occasion */}
                <div className="mb-3">
                  <label className="form-lbl">Special Occasion</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="birthday"
                      checked={formData.specialOccasion === 'Birthday'}
                      onChange={() => setFormData({ ...formData, specialOccasion: 'Birthday' })}
                    />
                    <label className="form-cl" htmlFor="birthday">Birthday</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="anniversary"
                      checked={formData.specialOccasion === 'Anniversary'}
                      onChange={() => setFormData({ ...formData, specialOccasion: 'Anniversary' })}
                    />
                    <label className="form-cl" htmlFor="anniversary">Anniversary</label>
                  </div>
                </div>

                {/* Special Occasion Date */}
                <div className="mb-3">
                  <label htmlFor="occasionDate" className="form-lbl">Special Occasion Date <SlCalender /></label>
                  <input
                    type="date"
                    className="form-control"
                    id="occasionDate"
                    value={formData.specialOccasionDate}
                    onChange={(e) => setFormData({ ...formData, specialOccasionDate: e.target.value })}
                  />
                </div>

                {/* Special Assistance Required */}
                <div className="mb-3">
                  <label className="form-lbl">Special Assistance Required <FaWheelchairMove /></label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="assistance"
                      id="yes"
                      value="yes"
                      checked={formData.assistance === 'yes'}
                      onChange={() => setFormData({ ...formData, assistance: 'yes' })}
                    />
                    <label className="form-cl" htmlFor="yes">Yes</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="assistance"
                      id="no"
                      value="no"
                      checked={formData.assistance === 'no'}
                      onChange={() => setFormData({ ...formData, assistance: 'no' })}
                    />
                    <label className="form-cl" htmlFor="no">No</label>
                  </div>
                </div>

                {/* Favorite Dishes */}
                <div className="mb-3">
                  <label htmlFor="favoriteDishes" className="form-lbl">Favorite Dishes <PiForkKnifeFill /></label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="favoriteDishes"
                      placeholder="Add a favorite dish"
                      value={newDish}
                      onChange={handleDishChange}
                    />
                    <button className="btn btn-outline-secondary" onClick={handleAddDish}>Add</button>
                  </div>
                  <ul className="list-group">
                    {formData.favoriteDishes.map((dish, index) => (
                      <li key={index} className="list-group-item">{dish}</li>
                    ))}
                  </ul>
                </div>

                <button type="submit" className="btn btn-primary w-100">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
