import React, {useEffect} from 'react';
import {View} from 'react-native';
//Libraries
import SplashScreen from 'react-native-splash-screen';
import {Text} from 'react-native-elements';
import ActionButton from 'react-native-action-button';

const Home = ({navigation}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <Text h1>Hola mundo</Text>
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
