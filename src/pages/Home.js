import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
//Libraries
import SplashScreen from 'react-native-splash-screen';
import {Text} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
//Utils
import AsyncStorageAPI from '../utils/AsyncStorageAPI';

const Home = ({navigation}) => {
  const [data, setData] = useState();
  useEffect(() => {
    SplashScreen.hide();
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    const getData = async () => {
      const response = await AsyncStorageAPI.getData('projectsData');
      console.log(response);
      setData(response);
    };
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <ActionButton
        buttonColor="#3B666F"
        onPress={() => {
          navigation.navigate('CreateHome');
        }}
      />
    </View>
  );
};

export default Home;
