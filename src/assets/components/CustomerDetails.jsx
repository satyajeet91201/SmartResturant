import React from 'react';
import { RiLeafFill } from 'react-icons/ri';
import { IoRadioButtonOnSharp } from 'react-icons/io5';

const CustomerDetails = ({ customer, onBack }) => {
  const { preferences, specialAssistance } = customer;

  return (
    <div>
      <h5 className="card-subtitle mb-2 tbs"><b>Customer Preference</b></h5>
      <ul className="list-group">
        {preferences?.veg && (
          <li className="list-group-item">
            <RiLeafFill /> Veg
          </li>
        )}
        {preferences?.nonVeg && (
          <li className="list-group-item">
            <IoRadioButtonOnSharp /> Non-Veg
          </li>
        )}
        {preferences?.vegan && (
          <li className="list-group-item">
            <RiLeafFill /> Vegan
          </li>
        )}
        {preferences?.cuisine && (
          <li className="list-group-item">
            <b>Cuisine Preference:</b> {preferences.cuisine}
          </li>
        )}
        {specialAssistance && (
          <li className="list-group-item">
            <b>Special Assistance Required:</b> {specialAssistance ? 'Yes' : 'No'}
          </li>
        )}
      </ul>
      <button onClick={onBack} className="btn btn-primary card-subtitle">Back</button>
    </div>
  );
};

export default CustomerDetails;
