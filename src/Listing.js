// ListingScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ListingScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('@userData');
      if (storedData !== null) {
        setData(JSON.parse(storedData));
      }
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  const handleDelete = async (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    await AsyncStorage.setItem('@userData', JSON.stringify(updatedData));
    setData(updatedData);
  };

  const handleEdit = (item) => {
    navigation.navigate('Form', { data: item });
  };

  useEffect(() => {
    if (route.params?.data) {
      setData(route.params.data);
      console.log("data===>",route.params.data)
    } else {
      loadData();
    }
  }, [route.params?.data]);

  return (
    <>
    <View style={{ padding: 20 }}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{borderRadius:25 ,borderColor:'#0f192f' ,borderWidth:1,marginBottom:hp('2%')}}>
          <View style={{height:hp('12%'),flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
          {item.photo ? (
        // Display the selected photo if available
        <View style={{marginRight:wp('4%')}}>
          <Image source={{ uri: item.photo }} style={{ width: 80, height: 80 ,borderRadius:40 ,borderColor:'#a7fd85' ,borderWidth:2 ,marginLeft:wp('2%') }} />
        </View>
      ) : (
        // Display the default photo if no photo is selected
        <View style={{marginRight:wp('4%') }}>
          <Image source={require('./assets/images/boy.png')} style={{ width: 80, height: 80,borderRadius:40 ,borderColor:'#a7fd85' ,borderWidth:2 ,marginLeft:wp('2%')}} />
        </View>
      )}
      <View style={{marginLeft:wp('0%')}}>
      <Text style={{color:'#0f192f',fontSize:24}}>{item.name}</Text>

            <Text style={{color:'#0f192f',fontSize:20}}>{item.phone}</Text>



      </View>
          </View>
          <View style={{height:hp('5%'),width:wp('85%'),borderColor:'#000',borderWidth:0.5,borderRadius:10,alignSelf:'center',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:hp('1%')}}>
            <Image source={require('./assets/images/user.png')} style={{width:20,height:20,marginLeft:wp('2%')}}/>
            <View style={{marginLeft:wp('2%'),flexDirection:'column'}}>
            <Text style={{color:'#0f192f',fontSize:10,fontWeight:'300'}}>Name</Text>
            <Text style={{color:'#0f192f',fontSize:16,fontWeight:500}}>{item.name}</Text>

            </View>
          </View>
          <View style={{height:hp('5%'),width:wp('85%'),borderColor:'#000',borderWidth:0.5,borderRadius:10,alignSelf:'center',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:hp('1%')}}>
            <Image source={require('./assets/images/email.png')} style={{width:20,height:20,marginLeft:wp('2%')}}/>
            <View style={{marginLeft:wp('2%'),flexDirection:'column'}}>
            <Text style={{color:'#0f192f',fontSize:10,fontWeight:'300'}}>Email</Text>
            <Text style={{color:'#0f192f',fontSize:16,fontWeight:500}}>{item.email}</Text>

            </View>
          </View>
          <View style={{height:hp('5%'),width:wp('85%'),borderColor:'#000',borderWidth:0.5,borderRadius:10,alignSelf:'center',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:hp('1%')}}>
            <Image source={require('./assets/images/phone.png')} style={{width:20,height:20,marginLeft:wp('2%')}}/>
            <View style={{marginLeft:wp('2%'),flexDirection:'column'}}>
            <Text style={{color:'#0f192f',fontSize:10,fontWeight:'300'}}>Phone No</Text>
            <Text style={{color:'#0f192f',fontSize:16,fontWeight:500}}>{item.phone}</Text>

            </View>
          </View>
          <View style={{height:hp('5%'),width:wp('85%'),borderColor:'#000',borderWidth:0.5,borderRadius:10,alignSelf:'center',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:hp('1%')}}>
            <Image source={require('./assets/images/gender.png')} style={{width:20,height:20,marginLeft:wp('2%')}}/>
            <View style={{marginLeft:wp('2%'),flexDirection:'column'}}>
            <Text style={{color:'#0f192f',fontSize:10,fontWeight:'300'}}>Gender</Text>
            <Text style={{color:'#0f192f',fontSize:16,fontWeight:500}}>{item.gender}</Text>

            </View>
          </View>
          <View style={{height:hp('5%'),width:wp('85%'),borderColor:'#000',borderWidth:0.5,borderRadius:10,alignSelf:'center',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:hp('1%')}}>
            <Image source={require('./assets/images/hobbies.png')} style={{width:20,height:20,marginLeft:wp('2%')}}/>
            <View style={{marginLeft:wp('2%'),flexDirection:'column'}}>
            <Text style={{color:'#0f192f',fontSize:10,fontWeight:'300'}}>Hobbies</Text>
            <Text style={{color:'#0f192f',fontSize:16,fontWeight:500}}>{item.hobbies}</Text>

            </View>
          </View>
          <View style={{height:hp('5%'),width:wp('85%'),borderColor:'#000',borderWidth:0.5,borderRadius:10,alignSelf:'center',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:hp('1%')}}>
            <Image source={require('./assets/images/loc.png')} style={{width:20,height:20,marginLeft:wp('2%')}}/>
            <View style={{marginLeft:wp('2%'),flexDirection:'column'}}>
            <Text style={{color:'#0f192f',fontSize:10,fontWeight:'300'}}>Location</Text>
            <Text style={{color:'#0f192f',fontSize:16,fontWeight:500}}>{item.country}</Text>

            </View>
          </View>


          {item.video? (
            <View style={{ width:wp('85%'),borderColor:'#000',borderWidth:0.5,borderRadius:10,alignSelf:'center',marginTop:hp('1%'),marginBottom:hp('1%'),paddingBottom:hp('1%') }}>
          {/* Video Player */}
          <VideoPlayer
            video={{ uri: item.video }}
            videoWidth={1600}
            videoHeight={900}
            thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
            autoplay={true}
            pauseOnPress
          />
        </View>
        ) :<View style={{alignItems:'center',height:hp('20%'),marginTop:hp('1%'),borderColor:'#000',borderWidth:0.5,borderRadius:15,justifyContent:'center',width:wp('85%'),alignSelf:'center',marginBottom:hp('1%')}}>
         <Image source={require('./assets/images/vid.png')} style={{width:100,height:100}}/>

      </View>}
      <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginBottom:hp('1%')}}>
       <TouchableOpacity style={{width:wp('30%'),height:hp('5%'),justifyContent:'center',alignItems:'center',backgroundColor:'#a7fd85',borderRadius:25}}  onPress={() => handleEdit(item)}>
         <Text style={{fontSize:14,fontWeight:'bold',color:'#0f192f'}}>Edit</Text>
       </TouchableOpacity>
       <TouchableOpacity style={{width:wp('30%'),height:hp('5%'),justifyContent:'center',alignItems:'center',backgroundColor:'red',borderRadius:25}}  onPress={() => handleDelete(index)}>
         <Text style={{fontSize:14,fontWeight:'bold',color:'#fff'}}>Delete</Text>
       </TouchableOpacity>

      </View>
            {/* <Button title="Delete" onPress={() => handleDelete(index)} />
            <Button title="edit" onPress={() => handleEdit(item)} /> */}
          </View>
        )}
      />
    </View>
    </>
  );
};

export default ListingScreen;
