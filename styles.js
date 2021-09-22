
import { StyleSheet, Dimensions } from "react-native"

const styles = StyleSheet.create({

    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      flex:1,
      zIndex: -1
    },
    screen: {
      flex: 1,
      
    },
    container: {
      flex:1,
    },
    roundButton1: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: 'lightsteelblue',
    margin: 5,
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center'
    },

      searchCont: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      },

      callout: {
        width: 140,
        height: 100,
    }


  });

  export default styles;