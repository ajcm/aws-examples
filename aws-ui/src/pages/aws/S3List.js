import React from 'react';
import { useState, useEffect, createContext } from 'react';
import { Link, View, Text, SelectField } from '@aws-amplify/ui-react';
import { formatDate, humanFileSize, padTwoDigits } from '../../Utils'

import { get, post, listObjects } from '../../services/S3Service'


const Page = () => {

  const [error, setError] = useState(null);
  const [key, setKey] = useState(null);
  const [object, setObject] = useState(null);

  const [objects, setObjects] = useState(null);
  const [folders, setFolders] = useState(null);

  const [bucket, setBucket] = useState(null);
  const [prefix, setPrefix] = useState('');
  const [delimiter, setDelimiter] = useState('/');

  const [buckets, setBuckets] = useState(null);



  const loadBuckets = async () => {
    try {
      const data = await get('/s3/buckets');
      setBuckets(data);
    } catch (err) {
      setError("error: " + err.message);
      return;
    }
  }


  const listBuckets = async () => {

    if (!bucket) {
      return
    }

    try {

      console.log("bucket: " + bucket)

      const data = await listObjects(bucket, prefix, delimiter);
      setObjects(data.objects);

      if (data.hasfolders) {
        setFolders(data.folders);
      } else {
        setFolders([])
      }

    } catch (err) {
      setError("error: " + err.message);
      return;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      loadBuckets()

    }

    fetchData()
      .catch(console.error);
  }, [])


  useEffect(() => {

    const fetchData = async () => {
      listBuckets()
    }

    fetchData()
      .catch(console.error);
  }, [bucket, delimiter])


  const loadDetails = async (key) => {
    // try {
    //   console.log(key)
    //   setKey(key)
    //   if (url) {
    //     try {
    //       const object = await post('/s3/details', { 'key': key });
    //       setObject(JSON.stringify(object, null, 4));

    //     } catch (err) {
    //       setError("error: " + err.message);
    //       return;
    //     }

    //   }

    // } catch (err) {
    //   setError(err);
    // }

  }

  if (error) {
    return <span>Caught an error: {error.message ? error.message : error}</span>;
  }

  return (
    <View>
      <Text fontSize="1.4em" >List items </Text>

      <SelectField onChange={(e) => { setBucket(e.target.value) }}>

        <option value=""> - </option>
        {
          buckets ? buckets.map((item) => (
            <option key={item.Name} value={item.Name}>
              {item.Name}
            </option>
          )) : <></>
        }
      </SelectField>

      <pre>bucket: {bucket ? bucket : ''} </pre>
      <pre>prefix: {prefix ? prefix : ''} </pre>
      <pre> <a href='#' onClick={(e) => {
        if (delimiter) {
          setDelimiter(null)
        } else {
          setDelimiter('/')
        }
        e.preventDefault();
      }}>{delimiter ? "Show all" : "Show folders"}</a> (delimiter: {delimiter ? delimiter : ''})

      </pre>

      <p>Objects</p>
      <ul>
        {
          objects ? objects.map((item) => (
            <li key={item.Key}>

              {item.isfolder ?
                <img width="15px" src="/folder.png"></img>
                : <></>
              }
              <a href={'#'} onClick={(e) => {
                loadDetails(item.Key);
                e.preventDefault();
              }}> {item.Key}</a> - {formatDate(new Date(item.LastModified))} - {humanFileSize(item.Size)}
            </li>
          )) : <> </>
        }
      </ul>

      {folders && folders.length > 0 ?
        <>
          <p>Folders</p>
          <ul>
            {
              folders ? folders.map((item) => (
                <li key={item}>

                  <a href={'#'} onClick={(e) => {

                    e.preventDefault();
                  }}> {item}</a>
                </li>
              )) : <> </>
            }

          </ul>
        </>

        : <></>
      }
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

