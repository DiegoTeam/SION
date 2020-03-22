import React, {useEffect} from 'react';
import {View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Text} from 'react-native-elements';

const Home = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View>
      <Text h1>Hola mundo</Text>
    </View>
  );
};

export default Home;
