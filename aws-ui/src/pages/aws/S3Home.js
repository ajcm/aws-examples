import React from 'react';
import { Link, View, Text } from '@aws-amplify/ui-react';
import S3Connection from '../../components/s3/S3Connection'
import S3Bucket from '../../components/s3/S3Bucket'

const Page = () => {
  return (
    <View>
      <Text fontSize="1.4em" >AWS S3 </Text>
      <S3Connection></S3Connection>

      <Text fontSize="1em" >Bucket </Text>
      <S3Bucket></S3Bucket>
    </View>
  );
};


export default Page

