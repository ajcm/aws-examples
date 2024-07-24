import React from 'react';
import { Link, View, Text } from '@aws-amplify/ui-react';
import S3Connection from '../../components/s3/S3Connection'
import S3Bucket from '../../components/s3/S3Bucket'
import HttpData from '../../components/HttpData'

const Page = () => {
  return (
    <View>
      <Text fontSize="1.4em" >AWS S3 </Text>
      <HttpData url="http://localhost:8080/"></HttpData>

      <Text fontSize="1em" >Bucket </Text>
      <HttpData url="http://localhost:8080/s3/bucket"></HttpData>

      <Text fontSize="1em" >AWS Config </Text>
      <HttpData url="http://localhost:8080/config"></HttpData>
    </View>
  );
};


export default Page

