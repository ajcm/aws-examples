import React from 'react';
import { useState, useEffect } from 'react';
import { Link, View, Text } from '@aws-amplify/ui-react';

import { get, post } from '../../services/S3Service'
import { formatDate, humanFileSize, padTwoDigits } from '../../Utils'

const Page = () => {
  const [buckets, setBuckets] = useState(null);
  const [error, setError] = useState(null);


  const loadBuckets = async () => {
    try {
      const data = await get('/s3/buckets');
      setBuckets(data);
    } catch (err) {
      setError("error: " + err.message);
      return;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      loadBuckets();
    }

    fetchData()
      .catch(console.error);
  }, [])


  if (error) {
    return <span>Caught an error: {error.message}</span>;
  }

  return (
    <View>
      <Text fontSize="1.4em" >Buckets </Text>

      <ul>
        {
          buckets ? buckets.map((item) => (
            <li key={item.Key}>

               {item.Name} - {formatDate(new Date(item.CreationDate))}
            </li>
          )) : <p> - No data </p>
        }
      </ul>



    </View>
  );
};


export default Page

