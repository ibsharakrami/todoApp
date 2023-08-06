
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CountryDropdown = ({ countries, selectedCountry, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelect(item)}>
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const handleSelect = (item) => {
    setModalVisible(false);
    onSelect(item.value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.selectedCountryText}>{selectedCountry ? selectedCountry : "Select Country" }</Text>
      </TouchableOpacity>

      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <FlatList
            data={countries}
            renderItem={renderItem}
            keyExtractor={(item) => item.value}
          />
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeModalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#0f192f',
    color:'#000',
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    marginTop:10
  },
  selectedCountryText: {
    fontSize: 16,
    color:'#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 100,
    marginBottom: 100,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 8,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    width:wp('90%'),
    padding: 10,
    color:'#000',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignSelf:'center',
    textAlign:'center'
  },
  closeModalText: {
    fontSize: 18,
    padding: 10,
    color: 'blue',
    alignSelf: 'flex-end',
  },
});

export default CountryDropdown;
