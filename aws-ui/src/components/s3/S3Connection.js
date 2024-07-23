
import React, { useState, useEffect } from 'react';
import { Button } from '@aws-amplify/ui-react';
import { getBackendUrl, getEcho, get } from '../../services/DebugService';

export const Home = () => {

  const [echo, setEcho] = useState(null);


  const testConnection = async () => {

    try {
      const data = await get('/s3', { "message": "ok" });

      console.log(data)
      setEcho(data.message);
    } catch (err) {
      setEcho("error: " + err.message);
      return;
    }
  }


  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      testConnection();

    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])



  const refresh = async (e) => {
    e.preventDefault();

    setEcho(null);
    testConnection();

  }


  return (
    <div>
      <p>S3 - Connection: {echo === null ? "testing connection" : echo} </p>
    </div>
  );
};


export default Home;

