import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
//Libraries
import SplashScreen from 'react-native-splash-screen';
import ActionButton from 'react-native-action-button';
import {ListItem} from 'react-native-elements';
//Utils
import AsyncStorageAPI from '../utils/AsyncStorageAPI';
import formatMoney from '../utils/formatMoney';
//Components
import Empty from '../components/Empty';

const Home = ({navigation}) => {
  const [data, setData] = useState();
  useEffect(() => {
    SplashScreen.hide();
    const getData = async () => {
      const response = await AsyncStorageAPI.getData('projectsData');
      setData(response);
    };
    return navigation.addListener('focus', () => {
      getData();
    });
  }, [navigation]);

  const renderItem = ({item}) => (
    <ListItem
      title={item.project_manager}
      subtitle={'$' + formatMoney.format(item.budget)}
      rightTitle={'$' + formatMoney.format(item.budget_used)}
      leftIcon={{name: 'person'}}
      bottomDivider
      chevron
      onPress={() => {
        navigation.navigate('ProjectDetail', item);
      }}
    />
  );
  return (
    <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={<Empty text="No hay proyectos creados." />}
      />
      <ActionButton
        buttonColor="#3B666F"
        onPress={() => {
          navigation.navigate('CreateProject');
        }}
      />
    </View>
  );
};

export default Home;
