import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Weather from './Weather';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// const location = ()=>{
//   const [selectedLoc, setSelectedLoc]=useState('Lahore');
//   function handleChange(event: React.ChangeEvent<HTMLSelectElement>){
//     setSelectedLoc(event.target.value);
//   }
//   return (
//     <div>
//       <label htmlFor="loc">Choose a Location:</label>
//       <select name="loc" id="loc" onChange={handleChange}>
//         <option value="Paris">Paris</option>
//         <option value="Tokyo">Tokyo</option>
//         <option value="London">London</option>
//         <option value="Istanbul">Istanbul</option>
//       </select>
//     </div>
//   );
// };

root.render(
  <React.StrictMode>
    <h2>Weather App</h2>
    {/* <Weather location={} /> */}
    <Weather/>
  </React.StrictMode>
);
