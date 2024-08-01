import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Location = ({onTogal})=>{

  return (
    <div className='flex justify-center md:justify-end md:mr-8'>
      <div>
        <label htmlFor="loc">Choose a Location:</label>
        <select name="loc" id="loc" onChange={onTogal} className='text-slate-50 rounded-lg ml-3 px-2 mt-3 bg-white/25 focus:bg-sky-400/40 focus:text-slate-950'>
          <option value="Lahore">Lahore</option>
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
          <option value="Hong Kong">Hong Kong</option>
        </select>

      </div>
    </div>
  );
};

export default Location;