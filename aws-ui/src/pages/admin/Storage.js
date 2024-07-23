import React, { useState, useEffect } from 'react';
import { withAuthenticator, Button, Badge, View, Flex, Text, Input, Label } from '@aws-amplify/ui-react';
import { withSession, withSessionOr } from '../../hooks/UserSession';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { useData } from '../../hooks/DataObject';
import { createContext, useContext } from 'react';

var _ = require('lodash/core');

export const SessionStorageContext = createContext();

const StorageDetails = ({ }) => {
  const [entries, setEntries] = useState(Object.entries(sessionStorage))

  const onDelete = (key) => {
    let vv = entries.filter(v => v[0] !== key)
    setEntries([
      ...vv
    ]);

    sessionStorage.removeItem(key)
  }



  const keyExists = (key) => {
    let vv = entries.filter(v => v[0] === key)

    return !_.isEmpty(vv)
  }

  const onAdd = (key, value) => {

    let vv = entries.filter(v => v[0] === key)

    if (!_.isEmpty(vv)) {
      alert('Key already exists!')
      return
    }

    setEntries([
      ...entries,
      [key, value]
    ]);

    sessionStorage.setItem(key, value)
  }


  const onUpdate = (key, value) => {

    let vv = entries.filter(v => v[0] !== key)

    setEntries([
      ...vv,
      [key, value]
    ]);
  }


  const onSave = (key, value) => {

    sessionStorage.setItem(key, value)
  }



  return (
    <View>

      <Text fontSize="1.2em" >Session Local Storage </Text>

      <SessionStorageContext.Provider value={[entries, setEntries, onAdd, onDelete, onUpdate, onSave, keyExists]}>

        <Flex direction="column" padding={'1rem'}>
          <SessionStorageKeys />

          <SessionStorageAdd />
        </Flex>

      </SessionStorageContext.Provider>
    </View>
  );
};



const SessionStorageKeys = () => {
  const [entries, setEntries, onAdd, onDelete, onUpdate, onSave] = useContext(SessionStorageContext);
  //const [values, setValues] = useState(Object.entries(data))
  const [status, setStatus] = useState({})

  const handleInput = (e) => {
    const { name, value } = e.target;


    console.log("udate: " + name)
    onUpdate(name, value)

  };

  const handleDelete = (key) => {
    console.log("delete: " + key)

    onDelete(key);

  }

  const handleUpdate = (key, value) => {
    console.log("save: " + key)

    onSave(key, value);

  }


  return (
    <View>
      {entries.map((k) => (
        <View id={k[0]}>

          <Text fontWeight={700}  >{k[0]}</Text>
          <Flex direction="row" paddingBottom={'1rem'}>

            <Input
              type="text"

              name={k[0]}
              value={k[1]}
              onChange={handleInput}
            />

            <Button onClick={(e) => handleUpdate(k[0], k[1])} > Update </Button>
            <Button color={'red'} onClick={(e) => handleDelete(k[0])}> X </Button>
          </Flex>
        </View>
      ))}

    </View>
  )

};



const SessionStorageAdd = ({ }) => {
  const [entries, setEntries, onAdd, onDelete, onUpdate, onSave, keyExists] = useContext(SessionStorageContext);

  const [values, setValues] = useState({})

  const handleInput = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const doAddValue = () => {
    var kk = values['key']
    var vv = values['value']

    if (!_.isEmpty(kk) && !_.isEmpty(vv)) {

      console.log(kk + " " + keyExists(kk))
      if (keyExists(kk)) {
        
        alert("key  exists")
        return

      } else {
        onAdd(kk, vv)
        setValues({})

      }
    } else {
      alert("Empty values")
    }


  }


  return (
    <View>

      <View>

        <Text fontSize="1.2em" padding={'1.0em 0em 1em 0em'}>Add value</Text>

        <Flex direction="column" paddingTop={''}>

          <Flex direction="column">
            <Text>Key</Text>
            <Input type="text" name="key" id="key" value={values.key ? values.key : ''} onChange={handleInput} />
          </Flex>

          <Flex direction="column">

            <Text>Value </Text>
            <Input type="text" name="value" id="value" value={values.value ? values.value : ''} onChange={handleInput} />
          </Flex>
          <Flex direction="row" padding={'0em'}>
            <Button onClick={doAddValue}> Add </Button>
          </Flex>
        </Flex>

      </View>

    </View>
  )

};


const LocalStorageKeys = ({ user }) => {

  return (
    <View>
      {Object.entries(sessionStorage).map((a) => (
        <>
          <Text>{a[0]}</Text>
          <Input
            type="text"
            id="user-email"
            name="email"
            placeholder="email"
            isRequired={true}
            value={a[1]}
          />




        </>
      ))}

    </View>
  )

};

//const Homepage = withSession(UserDetails);

export default StorageDetails;

