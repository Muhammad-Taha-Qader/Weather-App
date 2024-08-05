import React from 'react';
import Contributors from './Contributors';
const About: React.FC = () => {
  return (
    <div className='flex flex-col items-center mt-8'>
      <h1 className='text-2xl font-bold mb-3'>About Page</h1>
      <p className='mb-12'>This Wetaher App is collective Effort of: </p>
      <Contributors/>
    </div>
  );
};

export default About;
