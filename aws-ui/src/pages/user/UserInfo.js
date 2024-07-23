
import React from 'react';
import { Badge, View, Flex, Text, Input } from '@aws-amplify/ui-react';

var _ = require('lodash/core');


const UserDetails = ({ user }) => {

  return (
    <View>

      <Text fontSize="1.4em" >My Account </Text>

      <Flex direction="column" padding={'1rem'}>

        <Text variation="primary" color={'darkblue'}>Email</Text>
        <Input variation="tertiary" value={user ? user.email : "n/a"} readOnly />


        <Text variation="primary" color={'darkblue'}>Name</Text>
        <Input variation="tertiary" value={user ? user.email : "n/a"} readOnly />

        <Text variation="primary" color={'darkblue'}>Roles</Text>
        <UserAuthorites user={user} />

        <Text fontSize="1em" >Token</Text>
        <Input variation="tertiary" value={user ? user.tokenType : "n/a"} readOnly />
        <Input variation="tertiary" value={user ? user.accessToken : "n/a"} readOnly />
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



export default UserDetails;

