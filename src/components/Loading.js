import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const Loading = () => {
  return (
    <View style={{marginTop: 300}}>
      <ActivityIndicator size={100} color="#3B666F" />
    </View>
  );
};

export default Loading;
