
import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '@aws-amplify/ui-react/styles.css';

// import '@aws-amplify/ui-react/styles/reset.layer.css' // global CSS reset
// import '@aws-amplify/ui-react/styles/base.layer.css' // base styling needed for Amplify UI
// import '@aws-amplify/ui-react/styles/button.layer.css' // component specific styles

import MainGrid from './layout/MainGrid';

import '@aws-amplify/ui-react/styles.css';
import './App.css';


//pages
import Home from './pages/Home'

//user
import S3Home  from './pages/aws/S3Home'
import S3Load  from './pages/aws/S3Load'
import S3List  from './pages/aws/S3List'

import S3Buckets  from './pages/aws/S3Buckets'

function App() {

  useEffect(() => {
    document.title = "xCloud";
  }, []);

  return (
 
        <Routes>
          <Route path="" element={<MainGrid><Home /></MainGrid>} />
          <Route path="/s3" element={<MainGrid><S3Home /></MainGrid>} />
          
          <Route path="/s3-buckets" element={<MainGrid><S3Buckets /></MainGrid>} />
          <Route path="/s3-load" element={<MainGrid><S3Load /></MainGrid>} />
          <Route path="/s3-list" element={<MainGrid><S3List /></MainGrid>} />

          {/* <Route path="/messages" element={<MainGrid><Messages /> </MainGrid>} />
          <Route path="/memos" element={<MainGrid><Memos /> </MainGrid>} />
          <Route path="/notes" element={<MainGrid><Notes /> </MainGrid>} /> */}

    
        </Routes>
  );
}






export default App;

