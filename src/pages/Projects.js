import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
//Libraries
import SplashScreen from 'react-native-splash-screen';
import {FloatingAction} from 'react-native-floating-action';
import {ListItem, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';
//Utils
import AsyncStorageAPI from '../utils/AsyncStorageAPI';
//Components
import Empty from '../components/Empty';

const Projects = ({navigation}) => {
  const [data, setData] = useState();
  const actions = [
    {
      text: 'Crear proyecto',
      color: '#3B666F',
      icon: <Icon name="add-circle" size={24} color="white" />,
      name: 'bt_create_project',
      position: 1,
    },
  ];
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
  useEffect(() => {
    navigation.setOptions({title: 'Proyectos'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}) => (
    <ListItem
      title={item.project_manager}
      subtitle={
        <NumberFormat
          value={item.budget_available}
          renderText={value => <Text>{value}</Text>}
          thousandSeparator={true}
          displayType={'text'}
          prefix={'$'}
        />
      }
      rightTitle={
        <NumberFormat
          value={item.budget_used}
          renderText={value => <Text>{value}</Text>}
          thousandSeparator={true}
          displayType={'text'}
          prefix={'$'}
        />
      }
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
      <FloatingAction
        actions={actions}
        color="#3B666F"
        onPressItem={async name => {
          navigation.navigate('CreateProject');
          //TODO opciones de ordenado y filtro
        }}
      />
    </View>
  );
};

export default Projects;
