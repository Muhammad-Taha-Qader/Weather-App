import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Location = ({onTogal})=>{

  const locationData = [
    { id: 'Lahore', label: 'Lahore' },
    { id: 'Paris', label: 'Paris' },
    { id: 'Tokyo', label: 'Tokyo' },
    { id: 'London', label: 'London' },
    { id: 'Istanbul', label: 'Istanbul' },
    { id: 'New York', label: 'New York' },
    { id: 'Sydney', label: 'Sydney' },
    { id: 'Dubai', label: 'Dubai' },
    { id: 'Rome', label: 'Rome' },
    { id: 'Bangkok', label: 'Bangkok' },
    { id: 'Moscow', label: 'Moscow' },
    { id: 'Toronto', label: 'Toronto' },
    { id: 'Shanghai', label: 'Shanghai' },
    { id: 'Buenos Aires', label: 'Buenos Aires' },
    { id: 'Cape Town', label: 'Cape Town' },
    { id: 'Singapore', label: 'Singapore' },
    { id: 'Mumbai', label: 'Mumbai' },
    { id: 'Mexico City', label: 'Mexico City' },
    { id: 'Barcelona', label: 'Barcelona' },
    { id: 'Hong Kong', label: 'Hong Kong' }
];

  const renderLocation = () => {
    return locationData.map((loc) => {
      return (
        <option value={loc.id}>{loc.label}</option>
      );
    });
  };

  return (
    <div className='flex justify-center md:justify-end md:mr-8'>
      <div>
        <label htmlFor="loc">Choose a Location:</label>
        <select name="loc" id="loc" onChange={onTogal} className='text-slate-50 rounded-lg ml-3 px-2 mt-3 bg-white/25 focus:bg-sky-400/40 focus:text-slate-950'>
          {renderLocation()}
          {/* <option value="Lahore">Lahore</option>
          <option value="Paris">Paris</option>
          <option value="Tokyo">Tokyo</option>
          <option value="London">London</option>
          <option value="Istanbul">Istanbul</option>
          <option value="New York">New York</option>
          <option value="Sydney">Sydney</option>
          <option value="Dubai">Dubai</option>
          <option value="Rome">Rome</option>
          <option value="Bangkok">Bangkok</option>
          <option value="Moscow">Moscow</option>
          <option value="Toronto">Toronto</option>
          <option value="Shanghai">Shanghai</option>
          <option value="Buenos Aires">Buenos Aires</option>
          <option value="Cape Town">Cape Town</option>
          <option value="Singapore">Singapore</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Mexico City">Mexico City</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Hong Kong">Hong Kong</option> */}
        </select>

      </div>
    </div>
  );
};

export default Location;