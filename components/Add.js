import * as React from 'react';
import {TextInput, View, Button, Modal, Pressable, Text, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';



const Add = ({name, name2, handleOnChange, placeholder, navigation, next, buttonText}) => {

  const [value, setValue] = useState('')

  return (
    <View>
        <TextInput
          defaultValue={name}
          onChangeText = {(value) => setValue(value)}
          placeholder={placeholder}
          autoFocus = {true}/>
          <TouchableOpacity
            onPress ={(e) => handleOnChange(name2, value, {navigation}, next)}>
            <Text>{buttonText}</Text>
          </TouchableOpacity>        
    </View>
  );
};

export default Add;