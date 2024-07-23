import { Flex, Button, useTheme, View, Text } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';

const myStyle = {
  color: "white",
  backgroundColor: "black",
  fontFamily: "Sans-Serif",
  alignItems: "stretch",
  alignContent: "flex-end"
};


const DefaultFlexExample = () => {
  const { tokens } = useTheme();

  return (
    <Flex >

      <Link  style={{color: 'white', textDecoration: 'none'}} to="/">Home </Link>
      <Link  style={{color: 'white', textDecoration: 'none'}} to="/memos">Memos </Link>
      <Link  style={{color: 'white', textDecoration: 'none'}} to="/notes">Notes </Link>
      <Link  style={{color: 'white', textDecoration: 'none'}} to="/memos">Storage</Link>

     
    </Flex>
  );
};


export default DefaultFlexExample;