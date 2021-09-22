import MapView, {Marker} from 'react-native-maps';
import * as React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';


const Map = ({style, placeData, showPlace, navigation}) =>{

    return(
    <MapView
            style={style}
            initialRegion={{
            latitude: 65.07172,
            longitude: 25.97953,
            latitudeDelta: 10.5,
            longitudeDelta: 0.3,
            }}>
   {placeData.map((place)=>(
    <Marker 
      key={place.id}
      coordinate={place.coordinates}
      title = {place.name}
      name = {place.name}
      description = {place.description}
      onCalloutPress = {() => navigation.navigate('showPlace', {
        navigation: navigation,
        name: place.name,
        address: place.address,
        description: place.description,
        website: place.website
      })}/>
   ))}
   </MapView>
  )
}

export default Map;