import { Flex, Button, useTheme, View, Text } from '@aws-amplify/ui-react';


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

      <Text
        variation="primary"
        as="p"
        lineHeight="1.5em"
        fontWeight={750}
        fontSize="1.5em"
        fontStyle="normal"
        textDecoration="none"
        color={'white'}
        width="30vw"
      >
        AWS UI
      </Text>

      {/* <Button backgroundColor={tokens.colors.pink[10]}>Option 1</Button>
      <Button backgroundColor={tokens.colors.pink[20]}>Option 2</Button> */}

      <View style={{ marginLeft: 'auto' }} >
       
      </View>
    </Flex>
  );
};


export default DefaultFlexExample;