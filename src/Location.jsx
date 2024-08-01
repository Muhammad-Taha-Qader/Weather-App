import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Location = ({onTogal})=>{

  return (
    <div className='flex justify-center md:justify-end md:mr-8'>
      <div>
        <label htmlFor="loc">Choose a Location:</label>
        <select name="loc" id="loc" onChange={onTogal} className='text-cyan-500'>
          <option value="Lahore">Lahore</option>
          <option value="Paris">Paris</option>
          <option value="Tokyo">Tokyo</option>
          <option value="London">London</option>
          <option value="Istanbul">Istanbul</option>
        </select>
      </div>
    </div>
  );
};

export default Location;