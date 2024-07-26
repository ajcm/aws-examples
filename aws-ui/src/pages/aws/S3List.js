import React from 'react';
import { useState, useEffect, createContext } from 'react';
import { Link, View, Text, SelectField } from '@aws-amplify/ui-react';
import { formatDate, humanFileSize, padTwoDigits } from '../../Utils'

import { get, post, listObjects } from '../../services/S3Service'

import S3ObjectDetails from '../aws/components/S3ObjectDetails'


const Page = () => {
  const [error, setError] = useState(null);

  const [objectKey, setObjectKey] = useState(null);
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




  //effects
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
  }, [bucket, delimiter, prefix])


  // useEffect(() => {
  //   const fetchData = async () => {
  //     loadObjectDetails(objectKey)
  //   }

  //   fetchData()
  //     .catch(console.error);
  // }, [objectKey])


  if (error) {
    return <span>Caught an error: {error.message ? error.message : error}</span>;
  }

  return (
    <View>
      <Text fontSize="1.4em" >List items </Text>

      <SelectField onChange={(e) => {
        setBucket(e.target.value)
        setPrefix(null)
        setObjectKey(null)
      }}>

        <option value=""> - </option>
        {
          buckets ? buckets.map((item) => (
            <option key={item.Name} value={item.Name}>
              {item.Name}
            </option>
          )) : <></>
        }
      </SelectField>

      <p>
        <sub>bucket: {bucket ? bucket : ''} </sub>
        &#9643;
        <sub><a href='#' onClick={(e) => {
          setPrefix('')
          e.preventDefault();
        }}>Clear</a> (prefix: {prefix})
        </sub>
        &#9643;
        <sub><a href='#' onClick={(e) => {
          if (delimiter) {
            setDelimiter(null)
          } else {
            setDelimiter('/')
          }
          e.preventDefault();
        }}>{delimiter ? "Show all" : "Show folders"}</a> (delimiter: {delimiter ? delimiter : ''})
        </sub>

      </p>

      <h4>Objects</h4>
      <ul>
        {
          objects ? objects.map((item) => (
            <li key={item.Key}>

              {item.isfolder ?
                <img width="15px" src="/folder.png" onClick={(e) => {
                  setPrefix(item.Key);
                  e.preventDefault();
                }}></img>
                : <></>
              }
              <a href={'#'} onClick={(e) => {
                setObjectKey(item.Key);
                e.preventDefault();
              }}> {item.Key}</a> - {formatDate(new Date(item.LastModified))} - {humanFileSize(item.Size)}
            </li>
          )) : <p> no objects  </p>
        }
      </ul>

      {folders ?
        <>
          <sub>{prefix}
            {prefix !== '' ?

              <>
                <a href="#" onClick={(e) => {

                  if(!prefix){
                    return;
                  }

                  var count = prefix.split("/").length - 1;
                  if (count < 2) {
                    setPrefix('')
                  } else {
                    var pp = prefix.slice(0, -1)
                    var newPrefix = pp.substring(0, pp.lastIndexOf('/'))
                    setPrefix(newPrefix + '/');
                  }
                  e.preventDefault();
                }}>    *** back  </a>

              </> : <></>
            }
          </sub>

          <ul>

            {
              folders.length > 0 ? folders.map((item) => (
                <li key={item}>

                  <img width="15px" src="/folder.png" onClick={(e) => {
                    setPrefix(item);
                    e.preventDefault();
                  }}></img> {item}
                </li>
              )) : <p> no folders  </p>
            }

          </ul>
        </>

        : <></>
      }

      {/* <div>
        <pre>
          object: {objectKey ? objectKey : '-'}
        </pre>

      </div> */}

      {objectKey ? <S3ObjectDetails objectKey={objectKey} bucket={bucket}></S3ObjectDetails> : <></>}

    </View>
  );
};


export default Page

