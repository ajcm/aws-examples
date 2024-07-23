
import React, { useState, useEffect } from 'react';

import { createContext, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import { CurrentUserContext, useCurrentUserContext } from '../../hooks/UserSession';


import { SignInModel } from '../../components/authentication/LoginButton';

import { getBackendUrl, getEcho } from '../../services/DebugService';

export const Home = () => {

  const [echo, setEcho] = useState(null);


  const testConnection = async () => {
     
    try {
      const data = await getEcho({ "message": "ok" });

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

    <h3>System details</h3>
    <p>Backend: {getBackendUrl()} </p>
    <p>Connection: {echo === null ? "testing connection" : echo} </p>

    <Button className="btn-submit" onClick={e => refresh(e)}>Reconnect</Button>

  </div>
);
};


export default Home;

