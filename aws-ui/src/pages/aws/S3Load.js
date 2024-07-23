import { useState, useEffect, createContext } from 'react';
import { Grid, View, useTheme, TextField, Button, Flex } from '@aws-amplify/ui-react';
import { getBackendUrl, getEcho, get } from '../../services/DebugService';


const Main = () => {
  const [expression, setExpression] = useState(null);
  const [data, setData] = useState(null);
  const [url, setUrl] = useState("http://localhost:8080");
  const [error, setError] = useState(null);



  const doLoad = async () => {
    try {

      if (url) {
        try {
          const data = await get(url);
          setData(JSON.stringify(data, null, 4));
        } catch (err) {
          setData("error: " + err.message);
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



    <div>

      <Flex
        direction="row"
        justifyContent="flex-start"
        //  alignItems="stretch"
        //  alignContent="flex-start"
        wrap="nowrap"
        gap="1rem"
        padding={'10px'}
        margin={'20px'}
      >

        <View
          height="2rem"
          width="35rem"
          backgroundColor=''
        >
          <TextField
            descriptiveText=""
            placeholder="text to Search"
            label=""
            errorMessage=""
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button
           height="2rem"
            width="5rem"
            loadingText=""
            onClick={() => doLoad()}
          >
            Load
          </Button>

        </View>

        <View
          height="2rem"
          width="5rem"
          backgroundColor=''
        >

    
        </View>
      </Flex>


      <Flex
        direction="column"
        justifyContent="flex-start"
        //    alignItems="stretch"
        alignContent="flex-start"
        //  wrap="nowrap"
        gap="1rem"
      >

        <>
          <pre>{url} </pre>
        </>


      </Flex>
    </div >
  );
};





export default () => {
  return (
    <>

      <Grid templateColumns="1fr">
        <View backgroundColor={''} ><Main /></View>
      </Grid>
    </>
  );
};