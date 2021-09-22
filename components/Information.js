import * as React from 'react';
import {Text, View, Linking} from 'react-native';

const Information = ({name, address, description, website}) => {


  const goToURL = (website) => (
    Linking.canOpenURL(website).then(supported =>{
    if(supported){
      Linking.openURL(website)
    }else{
      alert("linkki ei ole toiminnassa")
    }}));


  if(Object.keys(website).length!==0){
  return (
    <View>
        <Text>{name}</Text>
        <Text>{address}</Text>
        <Text>{description}</Text>
        <Text onPress = {()=> goToURL(website.toString())}>{website}</Text> 
    </View>
  );} else {
    return (
    <View>
        <Text>{name}</Text>
        <Text>{address}</Text>
        <Text>{description}</Text>
    </View>
    );
  }
};

export default Information;