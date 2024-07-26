import React, { useState, useEffect } from 'react';
import { Button } from '@aws-amplify/ui-react';
import { getBackendUrl, getEcho, get, post } from '../../../services/S3Service';


export const Home = ({objectKey,bucket}) => {
  const [objectDetails, setObjectDetails] = useState(null);
  const [error, setError] = useState(null);

  const [signedUrl, setSignedUrl] = useState(null);

  const loadObjectDetails = async (key,bucket) => {
    if (objectKey) {
      try {
        const object = await post('/s3/objectDetails', { 'key': key, 'bucket': bucket });
        setObjectDetails(JSON.stringify(object, null, 4));

        const url  = await post('/s3/objectSignedUrl', { 'key': key, 'bucket': bucket });
        setSignedUrl(url)

      } catch (err) {
        setError("error: " + err.message);
        return;
      }
    }
  }

  useEffect(() => {
    (async () => {
      console.log("key " +objectKey + " " + bucket)
      if (objectKey){
        loadObjectDetails(objectKey,bucket)
      }
    
    })();
  }, [objectKey,bucket])

  
  if (error) {
    return <span>Caught an error: {error.message}</span>;
  }


  return (
    <div>
      <pre>
        Object: {objectKey ? objectKey : '-'}
        {objectDetails ? objectDetails : '-'}
      </pre>
      <a  target="_blank"  href={"http://" + bucket+".s3.amazonaws.com/" +objectKey}> Link</a>

      {signedUrl ? <a target="_blank"   href={signedUrl}> Signed Url</a> : <></> }
    </div>
  );
};


export default Home;

