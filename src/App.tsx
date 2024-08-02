import React, { useState } from 'react';
import Weather from './Weather';
import Location from './Location';
import About from './About';
import Help from './Help';
import { Routes, Route, Link } from 'react-router-dom';

const App: React.FC = (): React.ReactElement => {
    // const [selectedLoc, setSelectedLoc]=useState('Lahore');
    const [selectedLoc, setSelectedLoc] = useState<string>('Lahore');
    //const [loading, setLoading] = useState<boolean>(true);
    
    function handleChange(event: React.ChangeEvent<HTMLSelectElement>){
        console.log('Event chnage is:');
        console.log(event);
        setSelectedLoc(event.target.value);
        // setLoading(false);
    }
    
    return (
        <div>
            <h2 className='text-center py-5 bg-slate-900 font-poppins font-bold text-3xl'>Weather App</h2>
            <nav>
                <ul className='flex justify-center gap-x-8'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/help">Help</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path='/' element={<>
                    <Location onTogal={handleChange}/>
                    {/* <Weather location={`${selectedLoc}`}/> */}
                    {/* <Weather location={`${selectedLoc}`} loading={loading} setLoading={setLoading}/> */}
                    <Weather location={selectedLoc}/>
                </>}>
                </Route>
                <Route path='/about' element={<About/>}></Route>
                <Route path='/help' element={<Help/>}></Route>
            </Routes>

        </div>
    );
};

export default App;
