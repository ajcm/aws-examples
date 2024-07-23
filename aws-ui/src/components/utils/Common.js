import {Text } from '@aws-amplify/ui-react';

export const ErrorMessage = ({ error }) => {

    return (
      error ?
        <Text variation="error" color={'red'}>{error}</Text>
        :
        <></>
    );
  
  };
  
  
  export const IfShow = ({ condition, children }) => {
  
    return (
      <>
        {condition ? children : <></>}
      </>
    );
  
  };



  export const ErrorCondition = ({ condition, error }) => {

    return (
        condition ?
        <Text variation="error" color={'red'}>{error}</Text>
        :
        <></>
    );
  
  };

  