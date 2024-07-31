import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Location = ({onTogal})=>{

  return (
    <div>
      <label htmlFor="loc">Choose a Location:</label>
      <select name="loc" id="loc" onChange={onTogal}>
        <option value="Paris">Paris</option>
        <option value="Tokyo">Tokyo</option>
        <option value="London">London</option>
        <option value="Istanbul">Istanbul</option>
      </select>
    </div>
  );
};

export default Location;