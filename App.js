import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FormScreen from './src/FormScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListingScreen from './src/Listing';



const Stack = createStackNavigator();

export default function App() {
  return (
    // <View>
    //   <Text>App</Text>
    //   <FormScreen />
    // </View>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Form">
      <Stack.Screen name="Form" component={FormScreen}  options={{

          headerTitle: 'Contact Information',
          headerTitleAlign: 'center',
          headerTintColor: '#0f192f',
          headerShown: true,

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {

            fontSize: 20,
          },
        }}/>
      <Stack.Screen name="Listing" component={ListingScreen}  options={{

headerTitle: 'People Directory',
headerTitleAlign: 'center',
headerTintColor: '#0f192f',
headerShown: true,

headerStyle: {
  backgroundColor: '#fff',
},
headerTitleStyle: {

  fontSize: 20,
},
}}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({})
