import {Text, TouchableOpacity} from 'react-native';
import * as React from 'react';

const StyledButton = ({style, pressFunction, text}) =>{
    return(
    <TouchableOpacity style={style}
        onPress ={pressFunction}>
        <Text>{text}</Text>
    </TouchableOpacity>
    )
}

export default StyledButton