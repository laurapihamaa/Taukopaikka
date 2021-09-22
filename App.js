import * as React from 'react';
import { Alert, View, Text } from 'react-native';
import styles from './styles';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Add from './components/Add';
import Map from './components/Map';
import Buttons from './components/Buttons';
import Information from './components/Information';
import { allPlaces } from './placeData.js';
import { AsyncStorage } from 'react-native';
import { LogBox } from 'react-native';

const App = () => {
  const [places, setNewPlaces] = 
    useState([
      {
        id: '',
        name: '',
        address: '',
        description: '',
        website: '',
        coordinates: {
          latitude: '',
          longitude: '',
        },
      },
    ]
  );
  const [inputs, setInputs] = 
    useState({
      name: '',
      address: '',
      description: '',
      website: '',
    }
  );

  const [loading, setLoading] = useState(false)
  const [pitstops, setPitstops] = useState([
    {
      latitude: '',
      longitude: '',
    },
  ]);

  useEffect(() => {
    findData();
  });

  const findData = async () => {
    try {
      const loadedPlaces = JSON.parse(await AsyncStorage.getItem('places'));

      if (!loading) {
        if (
          (loadedPlaces === null && allPlaces === []) ||
          loadedPlaces === JSON.stringify(allPlaces)
        ) {
          console.log('ei päivitettävää');
        } else if (loadedPlaces !== null) {
          setNewPlaces(loadedPlaces);
        } else {
          setNewPlaces([]);
        }
      }
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  const MainScreen = ({ navigation }) => {
    return (
      <View style={styles.screen}>
        <Map style={styles.map} placeData={allPlaces} navigation={navigation} />
      </View>
    );
  };

  const ShowPlace = ({ route }) => {
    const { navigation, name, address, description, website } = route.params;
    return (
      <View style={styles.searchCont}>
        <Information
          name={JSON.stringify(name).replace(/['"]+/g, '')}
          address={JSON.stringify(address).replace(/['"]+/g, '')}
          description={JSON.stringify(description).replace(/['"]+/g, '')}
          website={JSON.stringify(website).replace(/['"]+/g, '')}
        />
      </View>
    );
  };

  const AddName = ({navigation}) => {
    return (
      <View style={styles.searchCont}>
        <Add
          name={inputs.name}
          name2 = 'name'
          handleOnChange={handleOnChange}
          placeholder="nimi"
          navigation = {navigation}
          next = 'AddAddress'
          buttonText = 'Seuraava'
        />
      </View>
    );
  };

  const AddAddress = ({navigation}) => {
    return (
      <View style={styles.searchCont}>
        <Add
          name={inputs.address}
          name2 = 'address'
          handleOnChange={handleOnChange}
          placeholder="osoite"
          navigation = {navigation}
          next = 'AddDescription'
          buttonText = 'Seuraava'/>
          <Buttons
          pressFunction = {(e) => navigation.navigate('AddName', {navigation})}
          text = 'Edellinen'
        />
      </View>
    );
  }

  const AddDescription = ({navigation}) => {
    return (
      <View style={styles.searchCont}>
        <Add
          name={inputs.description}
          name2 = 'description'
          handleOnChange={handleOnChange}
          placeholder="kuvaus"
          navigation = {navigation}
          next = 'AddWebsite'
          buttonText = "Seuraava"/>
          <Buttons
          pressFunction = {(e) => navigation.navigate('AddAddress', {navigation})}
          text = 'Edellinen'
          />
      </View>
    );
  }

  const AddWebsite = ({navigation}) => {
    return (
      <View style={styles.searchCont}>
        <Add
          name={inputs.website}
          name2 = 'website'
          handleOnChange={handleOnChange}
          placeholder="verkkosivu"
          navigation = {navigation}
          buttonText = 'Lähetä'/>
        <Buttons
          pressFunction = {(e) => navigation.navigate('AddDescription', {navigation})}
          text = 'Edellinen'
        />
      </View>
    );
  }

 

  const handleOnChange = (name, value, {navigation}, next) => {
    console.log(value)
    setInputs({
      ...inputs,
      [name]: value,
    });

    if(name == 'website'){
      console.log('ok mennään loppuun')
      handleOnEnd({navigation})
    }

    else{
    navigation.navigate(next, {navigation})
    }
  };

  const handleOnEnd = async ({ navigation }) => {
    console.log(inputs.name)
    if (inputs.name=="" || inputs.description=="" || inputs.address=="") {
      alert(
        'Kentät nimi, osoite sekä kuvaus tulee olla täytettynä ennen taukopaikan tallentamista'
      );
    }
    else{

    //Location.setApiKey(null)
    //var result = await Location.geocodeAsync(inputs.address, false)
    const placeObject = {
      id: places.length + 1,
      name: inputs.name,
      address: inputs.address,
      description: inputs.description,
      website: inputs.website,
      coordinates: {
        latitude: '',
        longitude: '',
      },
    };

    const newStatePlaces = places.concat(placeObject);

    //await AsyncStorage.setItem('places', JSON.stringify(newStatePlaces));

    setInputs('');
    setLoading(false);
    alert(
      'Kohteesi on nyt lisätty ja se tulee näkyville heti hyväksynnän jälkeen'
    );

    navigation.navigate('Main', { navigation });
    }
  };

  const Stack = createStackNavigator();

  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state',])

  return (
    <View style={styles.container}>
      <NavigationContainer style={styles.stacknav}>
        <Stack.Navigator
          initialRouteName="Taukopaikka"
          options={({navigation}) => ({
            headerTitle: () => <Text>Register</Text>,
            headerRight: () => 
        <Buttons
          style={styles.roundButton1}
          pressFunction={() => navigation.navigate('AddName', { navigation })}
          text="+"
        />
          })}>
          <Stack.Screen name="Main" component={MainScreen} 
          options={({navigation}) => ({
            headerTitle: () => <Text>Taukopaikka</Text>,
            headerRight: () => 
          <Buttons
          style={styles.roundButton1}
          pressFunction={() => navigation.navigate('AddName', { navigation })}
          text="+"
          />
          })}/>
          <Stack.Screen name="AddName" component={AddName}
          options={{ headerTitle: 'Etusivulle' }}  />
          <Stack.Screen name = "AddAddress" component={AddAddress}
          options={{ headerTitle: 'Etusivulle' }}
          />
          <Stack.Screen name = "AddDescription" component={AddDescription}
          options={{ headerTitle: 'Etusivulle'}} />
          <Stack.Screen name = "AddWebsite" component={AddWebsite}
          options={{ headerTitle: 'Etusivulle'}} />
          <Stack.Screen name="showPlace" component={ShowPlace}
          options={
             {headerTitle: ""}
          } />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
