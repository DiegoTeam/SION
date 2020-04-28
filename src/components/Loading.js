import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const Loading = () => {
  return (
    <View style={{marginTop: 300}}>
      <ActivityIndicator size={100} color="#025930" />
    </View>
  );
};

export default Loading;
