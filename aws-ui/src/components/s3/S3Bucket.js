import React, { useState, useEffect } from 'react';
import { Button } from '@aws-amplify/ui-react';
import { getBackendUrl, getEcho, get } from '../../services/DebugService';

export const Home = () => {
  const [data, setData] = useState(null);

  const load = async () => {
    try {
      const data = await get('/s3/config/bucket');
      setData(JSON.stringify(data, null, 4));
    } catch (err) {
      setData("error: " + err.message);
      return;
    }
  }


  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      load();

    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])


  return (
    <div>
      <pre>
        {data ? data : '-'}
      </pre>
    </div>
  );
};


export default Home;

