import React, { useState } from 'react';
import Weather from './Weather';
import Location from './Location';
const App: React.FC = (): React.ReactElement => {
    // const [selectedLoc, setSelectedLoc]=useState('Lahore');
    const [selectedLoc, setSelectedLoc]=useState('Lahore');
    //const [loading, setLoading] = useState<boolean>(true);
    
    function handleChange(event: React.ChangeEvent<HTMLSelectElement>){
        console.log('Event chnage is:');
        console.log(event);
        setSelectedLoc(event.target.value);
        // setLoading(false);
    }
    
    return (
        <div>
            <Location onTogal={handleChange}/>
            {/* <Weather location={`${selectedLoc}`}/> */}
            {/* <Weather location={`${selectedLoc}`} loading={loading} setLoading={setLoading}/> */}
            <Weather location={`${selectedLoc}`}/>
        </div>
    );
};

export default App;
