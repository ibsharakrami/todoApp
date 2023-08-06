import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-element-dropdown';
import { Icon, Input, CheckBox } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { RadioButton } from 'react-native-paper';
import CountryDropdown from './Country';
import ImageCropPicker from 'react-native-image-crop-picker';
import * as Permissions from 'react-native-permissions';
import { Image } from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const FormScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState(''); // 'male', 'female', or empty
  const [country, setCountry] = useState('');
  const [hobbies, setHobbies] = useState([]);// selected country value from the dropdown
  const [photo, setPhoto] = useState(null); // Holds the selected photo URI
  const [video, setVideo] = useState(null);

  useEffect(() => {
    requestMediaPermissions();
  }, []);

  const requestMediaPermissions = async () => {
    if (Platform.OS === 'android') {
      const readStoragePermission = await Permissions.request(Permissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (readStoragePermission !== 'granted') {
        console.log('Read storage permission denied.');
      }

      const writeStoragePermission = await Permissions.request(Permissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      if (writeStoragePermission !== 'granted') {
        console.log('Write storage permission denied.');
      }
    }
  };

  const selectPhoto = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      cropping: true,
    })
      .then((image) => {
        setPhoto(image.path);
      })
      .catch((error) => {
        console.log('Error selecting photo:', error);
      });
  };

  const selectVideo = () => {
    ImageCropPicker.openPicker({
      mediaType: 'video',
      multiple: false,
      maxDuration: 60,
    })
      .then((video) => {
        setVideo(video.path);
      })
      .catch((error) => {
        console.log('Error selecting video:', error);
      });
  };
  const [selectedValue, setSelectedValue] = useState('');

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
    console.log(itemValue,"itemmmm===>")
  };

  const countries = [
    { label: 'USA', value: 'USA' },
    { label: 'Canada', value: 'Canada' },
    { label: 'UK', value: 'UK' },
    { label: 'Australia', value: 'Australia' },
    { label: 'INDIA', value: 'INDIA' },
    { label: 'NEW YORK', value: 'NEW YORK' },
    { label: 'DUBAI', value: 'DUBAI' },
    { label: 'SRI LANKA', value: 'SRI LANKA' },
    { label: 'ENGLAND', value: 'ENGLAND' },
    { label: 'QATAR', value: 'QATAR' },
    { label: 'BRAZIL', value: 'BRAZIL' },
    { label: 'NEPAL', value: 'NEPAL' },
    // Add more countries as needed
  ];

  const toggleHobby = (hobby) => {
    const updatedHobbies = [...hobbies];
    if (updatedHobbies.includes(hobby)) {
      // If the hobby is already selected, remove it from the array
      const index = updatedHobbies.indexOf(hobby);
      updatedHobbies.splice(index, 1);
    } else {
      // If the hobby is not selected, add it to the array
      updatedHobbies.push(hobby);
    }
    setHobbies(updatedHobbies);
  };

  const saveData = async () => {
    const newData = { name, email, phone, gender, country, hobbies ,photo,video };
    let storedData = await AsyncStorage.getItem('@userData');
    storedData = storedData ? JSON.parse(storedData) : [];

    if (route.params?.data) {
      // If in edit mode, find the item index and replace it with the updated data
      const index = storedData.findIndex((item) => item.email === route.params.data.email);
      if (index !== -1) {
        storedData[index] = newData;
      }
    } else {
      // If in new entry mode, add the new data to the array
      storedData.push(newData);
    }

    await AsyncStorage.setItem('@userData', JSON.stringify(storedData));
    setName('');
    setEmail('');
    setPhone('');
    setGender('');
    setCountry('');
    setHobbies([]);
    setPhoto('');
    setVideo(''); // Reset hobbies array

    navigation.navigate('Listing', { data: storedData });
  };

  useEffect(() => {
    if (route.params?.data) {
      // If in edit mode, pre-fill the form fields with existing data
      setName(route.params.data.name);
      setEmail(route.params.data.email);
      setPhone(route.params.data.phone);
      setGender(route.params.data.gender);
      setCountry(route.params.data.country);
      setHobbies(route.params.data.hobbies);
      setPhoto(route.params.data.photo);
      setVideo(route.params.data.video)
    }
  }, [route.params?.data]);

  return (
    <ScrollView style={{backgroundColor:'#fff'}}>
    <View style={{padding: 20}}>
    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',height:hp('12%')}}>
    {photo ? (

        <View style={{marginRight:wp('4%')}}>
          <Image source={{ uri: photo }} style={{ width: 80, height: 80 ,borderRadius:40 ,borderColor:'#a7fd85' ,borderWidth:2 }} />
        </View>
      ) : (

        <View style={{marginRight:wp('4%') }}>
          <Image source={require('./assets/images/boy.png')} style={{ width: 80, height: 80,borderRadius:40 ,borderColor:'#a7fd85' ,borderWidth:2 }} />
        </View>
      )}
      <TouchableOpacity style={{height:hp('4%'),width:wp('40%'),borderColor:'#0f192fAA',borderRadius:25,borderWidth:1,justifyContent:'center',alignItems:'center'}} onPress={selectPhoto}>
      <Text style={{fontSize:11,fontWeight:'bold',color:'#0f192f'}}>Change Profile picture</Text>

      </TouchableOpacity>
    </View>
      <Text style={{color:'#0f192f',fontWeight:'bold',marginTop:hp('1%')}}>Name</Text>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Enter Your Name"
        placeholderTextColor={"black"}
        style={{width:wp('90%'),height:hp('6%'),borderColor:'#0f192f',borderWidth:1,borderRadius:25,marginTop:hp('1%'),paddingLeft:wp('3%'),color:'#0f192f'}}
      />

      <Text style={{color:'#0f192f',fontWeight:'bold',marginTop:hp('1%')}}>Email</Text>
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Enter Your Email"
        placeholderTextColor={"black"}
        style={{width:wp('90%'),height:hp('6%'),borderColor:'#0f192f',borderWidth:1,borderRadius:25,marginTop:hp('1%'),paddingLeft:wp('3%'),color:'#0f192f'}}
      />

      <Text style={{color:'#0f192f',fontWeight:'bold',marginTop:hp('1%')}}>Phone</Text>
      <TextInput
        value={phone}
        onChangeText={text => setPhone(text)}
        placeholder="Phone"
        placeholderTextColor={"black"}
        style={{width:wp('90%'),height:hp('6%'),borderColor:'#0f192f',borderWidth:1,borderRadius:25,marginTop:hp('1%'),paddingLeft:wp('3%'),color:'#0f192f'}}
      />
     {/* <View style={styles.container}>
      <Text style={styles.label}>Select an option:</Text>
      <DropDownPicker
        items={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
          { label: 'Option 4', value: 'option4' },
        ]}
        defaultValue={selectedValue}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropdownStyle}
        onChangeItem={(item) => handleValueChange(item.value)}
      />
      <Text style={styles.selectedValue}>You selected: {selectedValue}</Text>
    </View> */}
    <Text style={{color:'#0f192f',fontWeight:'bold',marginTop:hp('1%')}}>Gender</Text>
    {/* <Text>Gender:</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <CheckBox
          checked={gender === 'male'}
          onPress={() => setGender('male')}
          containerStyle={{ marginRight: 20 }}
          title="Male"
        />
        <CheckBox
          checked={gender === 'female'}
          onPress={() => setGender('female')}
          title="Female"
        />
      </View> */}

      <View style={{ flexDirection: 'row', justifyContent:'flex-start',alignItems:'center'  }}>
        <RadioButton
          value="male"
          status={gender === 'male' ? 'checked' : 'unchecked'}
          onPress={() => setGender('male')}
        />
        <Text style={{ marginRight: 20 ,color:'#0f192f',fontWeight:'bold'}}>Male</Text>
        <RadioButton
          value="female"
          status={gender === 'female' ? 'checked' : 'unchecked'}
          onPress={() => setGender('female')}
        />
        <Text style={{marginRight: 20 ,color:'#0f192f',fontWeight:'bold'}}>Female</Text>
      </View>
      <Text style={{color:'#0f192f',fontWeight:'bold',marginTop:hp('1%')}}>Hobbies</Text>
      <View style={{  marginBottom: 10 }}>
        <CheckBox
          checked={hobbies.includes('Reading')}
          onPress={() => toggleHobby('Reading')}
          containerStyle={{ marginRight: 20 }}
          title="Reading"
        />
        <CheckBox
          checked={hobbies.includes('Sports')}
          onPress={() => toggleHobby('Sports')}
          containerStyle={{ marginRight: 20 }}
          title="Sports"
        />
        <CheckBox
          checked={hobbies.includes('Traveling')}
          onPress={() => toggleHobby('Traveling')}
          title="Traveling"
        />
      </View>
      {/* <Text>Gender:</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Text style={{ marginRight: 10 }}>Male</Text>
        <input
          type="checkbox"
          value="male"
          checked={gender === 'male'}
          onChange={() => setGender('male')}
        />
        <Text style={{ marginRight: 10, marginLeft: 20 }}>Female</Text>
        <input
          type="checkbox"
          value="female"
          checked={gender === 'female'}
          onChange={() => setGender('female')}
        />
      </View> */}
      <Text style={{color:'#0f192f',fontWeight:'bold',marginTop:hp('1%')}}>Country</Text>
      <CountryDropdown
        countries={countries}
        selectedCountry={country}
        onSelect={(selectedValue) => setCountry(selectedValue)}
      />



      {/* Video Upload */}

      {video ? (
        <View style={{  borderColor:'#0f192f',borderWidth:1,borderRadius:15,paddingBottom:10,marginTop:hp('2%')}}>
          {/* Video Player */}
          <VideoPlayer
            video={{ uri: video }}
            videoWidth={40}
            videoHeight={20}
            thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
            autoplay={true}
            pauseOnPress
          />
        </View>
      ) :<View style={{alignItems:'center',height:hp('20%'),marginTop:hp('2%'),borderColor:'#0f192f',borderWidth:1,borderRadius:15,justifyContent:'center'}}>
         <Image source={require('./assets/images/vid.png')} style={{width:100,height:100}}/>

      </View>}
      {/* <Button title="Select Video" onPress={selectVideo} style={{backgroundColor:'#a7fd85'}} backgroundColor='#a7fd85' /> */}
      <TouchableOpacity style={{height:hp('6%'),width:wp('90%'),borderColor:'#0f192fAA',borderRadius:25,borderWidth:1,justifyContent:'center',alignItems:'center',marginTop:hp('1%')}} onPress={selectVideo}>
      <Text style={{fontSize:14,fontWeight:'bold',color:'#0f192f'}}>Add Video</Text>

      </TouchableOpacity>
      <TouchableOpacity style={{height:hp('6%'),width:wp('90%'),borderColor:'#0f192fAA',borderRadius:25,justifyContent:'center',alignItems:'center',marginTop:hp('3%'),backgroundColor:'#a7fd85'}} onPress={saveData}>
      <Text style={{fontSize:16,fontWeight:'bold',color:'#0f192f'}}>Save</Text>

      </TouchableOpacity>
      {/* <View>
      <Text>Select an option:</Text>
      <DropDownPicker
        items={options}
        defaultValue={selectedValue}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        itemStyle={{ justifyContent: 'flex-start' }}
        labelStyle={{ fontSize: 16, color: '#000' }}
        onChangeItem={(item) => handleValueChange(item.value)}
      />
      <Text>Selected Value: {selectedValue}</Text>
    </View> */}





      {/* <Button title="Save" onPress={saveData} /> */}
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {

    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdownContainer: {
    width: 200,
    height: 40,
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderColor: '#333',
    borderWidth: 1,
  },
  dropdownItem: {
    justifyContent: 'center',
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
    borderColor: '#333',
    borderWidth: 1,
  },
  selectedValue: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default FormScreen;

