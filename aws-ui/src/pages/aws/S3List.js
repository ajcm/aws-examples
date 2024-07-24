import React from 'react';
import { useState, useEffect, createContext } from 'react';
import { Link, View, Text, SelectField } from '@aws-amplify/ui-react';
import { formatDate, humanFileSize, padTwoDigits } from '../../Utils'

import { get, post, listObjects } from '../../services/S3Service'


const Page = () => {

  const [data, setData] = useState(null);
  const [url, setUrl] = useState("/s3/list");
  const [error, setError] = useState(null);
  const [key, setKey] = useState(null);
  const [object, setObject] = useState(null);
  const [bucket, setBucket] = useState(null);
  const [buckets, setBuckets] = useState(null);

  const loadBuckets = async () => {
    try {

      if (url) {
        try {
          const data = await get('/s3/buckets');
          console.log(data)
          setData(data);
        } catch (err) {
          setError("error: " + err.message);
          return;
        }

      }

    } catch (err) {
      setError(err);
    }

  }



  const load = async () => {
    try {

      if (url) {
        try {
          const data = null;// await listObjects(url);
          console.log(data)
          setData(data);
        } catch (err) {
          setError("error: " + err.message);
          return;
        }

      }

    } catch (err) {
      setError(err);
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


  const loadDetails = async (key) => {
    try {
      console.log(key)
      setKey(key)
      if (url) {
        try {
          const object = await post('/s3/details', { 'key': key });
          setObject(JSON.stringify(object, null, 4));

        } catch (err) {
          setError("error: " + err.message);
          return;
        }

      }

    } catch (err) {
      setError(err);
    }

  }

  if (error) {
    return <span>Caught an error: {error.message}</span>;
  }

  return (
    <View>
      <Text fontSize="1.4em" >List items </Text>

      <sub>Bucket: {data ? data.Name : '-'} </sub>

      <SelectField
        label="Bucket"        
      >
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
       
      </SelectField>

      <ul>

        {
          data && data.Contents ? data.Contents.map((item) => (
            <li key={item.Key}>

              <a href={'#'} onClick={(e) => {
                loadDetails(item.Key);
                e.preventDefault();
              }}> {item.Key}</a> - {formatDate(new Date(item.LastModified))} - {humanFileSize(item.Size)}
            </li>
          )) : <p> - No data </p>
        }

      </ul>

      <p>Details</p>
      <div>
        <pre>
          {key ? key : '-'}

        </pre>
        <pre>
          {object ? object : '-'}
        </pre>
      </div>





    </View>
  );
};


export default Page

