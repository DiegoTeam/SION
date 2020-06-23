import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={100} color="#3B666F" />
    </View>
  );
};

export default Loading;
