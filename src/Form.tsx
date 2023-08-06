import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const saveData = async () => {
    const newData = {name, email, phone};
    let storedData = await AsyncStorage.getItem('@userData');
    storedData = storedData ? JSON.parse(storedData) : [];
    storedData.push(newData);
    await AsyncStorage.setItem('@userData', JSON.stringify(storedData));
    setName('');
    setEmail('');
    setPhone('');
    navigation.navigate('Listing', {data: storedData});
  };

  return (
    <View style={{padding: 20}}>
      <Text>Name:</Text>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Enter your name"
      />

      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Enter your email"
      />

      <Text>Phone:</Text>
      <TextInput
        value={phone}
        onChangeText={text => setPhone(text)}
        placeholder="Enter your phone number"
      />

      <Button title="Save" onPress={saveData} />
    </View>
  );
};

export default FormScreen;
