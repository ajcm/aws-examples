import React from 'react';
import { useState, useEffect, createContext } from 'react';
import { Link, View, Text } from '@aws-amplify/ui-react';

import S3Connection from '../../components/s3/S3Connection'
import S3Bucket from '../../components/s3/S3Bucket'
import {get,post} from '../../services/S3Service'


/**
 * Format bytes as human-readable text.
 * 
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use 
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 * 
 * @return Formatted string.
 */
function humanFileSize(bytes, si=false, dp=1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si 
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
}

function padTwoDigits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date,dateDiveder = "-") {
  // :::: Exmple Usage ::::
  // The function takes a Date object as a parameter and formats the date as YYYY-MM-DD hh:mm:ss.
  // 👇️ 2023-04-11 16:21:23 (yyyy-mm-dd hh:mm:ss)
  //console.log(dateInYyyyMmDdHhMmSs(new Date()));

  //  👇️️ 2025-05-04 05:24:07 (yyyy-mm-dd hh:mm:ss)
  // console.log(dateInYyyyMmDdHhMmSs(new Date('May 04, 2025 05:24:07')));
  // Date divider
  // 👇️ 01/04/2023 10:20:07 (MM/DD/YYYY hh:mm:ss)
  // console.log(dateInYyyyMmDdHhMmSs(new Date(), "/"));
  return (
    [
      date.getFullYear(),
      padTwoDigits(date.getMonth() + 1),
      padTwoDigits(date.getDate()),
    ].join(dateDiveder) +
    " " +
    [
      padTwoDigits(date.getHours()),
      padTwoDigits(date.getMinutes()),
      padTwoDigits(date.getSeconds()),
    ].join(":")
  );
}

const Page = () => {

  const [data, setData] = useState(null);
  const [url, setUrl] = useState("/s3/list");
  const [error, setError] = useState(null);
  const [key, setKey] = useState(null);
  const [object, setObject] = useState(null);


  const load = async () => {
    try {

      if (url) {
        try {
          const data = await get(url);
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
          const object = await post('/s3/details',{'key':key});
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

      <ul>

      {
          data &&  data.Contents  ? data.Contents.map((item) => (
            <li key={item.Key}>
         
              <a href={'#'}   onClick={(e) => {
                loadDetails(item.Key);    
                e.preventDefault();}}> {item.Key}</a> - {formatDate(new Date(item.LastModified))} - {humanFileSize(item.Size)}
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

