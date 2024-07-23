
import React, { useState, useEffect } from 'react';

import { createContext, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import { CurrentUserContext, useCurrentUserContext } from '../../hooks/UserSession';


import { Badge, View, Flex, Text, Input } from '@aws-amplify/ui-react';
import { withSession, } from '../../hooks/UserSession';
import { getBackendUrl, getEcho } from '../../services/DebugService';
import { getIdentity } from '../../services/AuthService';

var _ = require('lodash/core');


const UserDetails = ({ user }) => {


  const [echo, setEcho] = useState(null);


  const testConnection = async () => {
     
    try {
      const data = await getIdentity();

      console.log(data)
      setEcho(data.username);
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
    <View>

      <Text fontSize="1.4em" >Auth Settings </Text>

      <Flex direction="column" padding={'1rem'}>
        <Text fontSize="1em" >Token</Text>
        <Input variation="tertiary" value={user ? user.tokenType : "n/a"} readOnly />
        <Input variation="tertiary" value={user ? user.accessToken : "n/a"} readOnly />
      </Flex>


      <Flex direction="column" padding={'1rem'}>
        <Text fontSize="1em" >Test Token</Text>
        <Button  width={'150px'} className="btn-submit" onClick={e => refresh(e)}>Reconnect</Button>
        <Input variation="tertiary" value={echo} readOnly />
        
      </Flex>

    </View>
  );
};



const UserAuthorites = ({ user }) => {

  if (_.isEmpty(user.authorities)) {
    return;
  }

  return (
    <View>
      {user.authorities.map((a) => (<Badge>{a}</Badge>))}
    </View>
  )

};


const Homepage = withSession(UserDetails);

export default Homepage;

