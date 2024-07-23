import { Grid, View, Card, useTheme } from '@aws-amplify/ui-react';
import React from 'react';


import Toolbar from './Toolbar'
import NavBar from './NavBar';

export const MainGrid = ({ children }) => {
  return (
    <>
      <Grid
        columnGap="0.5rem"
        rowGap="1rem"
        templateColumns="1fr 1fr  1fr  1fr"
        templateRows="0fr 3fr 1fr"
      >
        <Card
          columnStart="1"
          columnEnd="-1"
          backgroundColor={'black'}
          maxHeight={'120px'}
        >

          <Toolbar />
        </Card>

        <Card
          columnStart="1"
          columnEnd="1"
          backgroundColor={'#f4f4f4'}
        >
          <NavBar></NavBar>
        </Card>

        <Card
          columnStart="2"
          columnEnd="-1"
          minHeight={'500px'}
          maxHeight={'11145px'}
        >
          {children}
        </Card>



        <Card
          columnStart="1"
          columnEnd="-1"
          backgroundColor={'black'}
          height={'15px'}
          padding={"0px"}
        >
           <div style={{ marginLeft: '15px',  color: 'white' }}> 
              xCloud v0.1
          </div> 

        </Card> 

      </Grid>
    </>
  );
};

export default MainGrid;