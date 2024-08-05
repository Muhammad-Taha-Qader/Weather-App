import React, { useEffect, useState } from 'react';

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/repos/Muhammad-Taha-Qader/Weather-App/contributors')
      .then(response => response.json())
      .then(data => setContributors(data))
      .catch(error => console.error('Error fetching contributors:', error));
  }, []);

  return (
    <div className="contributors">
      <h2 className='text-center text-xl font-bold mb-4'>Contributors</h2>
      <ul className='flex flex-col gap-y-8 items-start'>
        {contributors.map(contributor => (
          <li key={contributor.id} className='flex items-center'>
            <img src={contributor.avatar_url} alt={`${contributor.login} avatar`} width="40" height="40" className='rounded-full mr-3'/>
            <a href={contributor.html_url} target="_blank" rel="noopener noreferrer" className='text-sm'>
              {contributor.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contributors;
