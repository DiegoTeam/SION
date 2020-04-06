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
import Loading from '../components/Loading';

const Projects = ({navigation}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const response = await AsyncStorageAPI.getData('projectsData');
      setData(response);
      setIsLoading(false);
    };
    return navigation.addListener('focus', () => {
      getData();
    });
  }, [navigation]);

  const renderItem = ({item}) => (
    <ListItem
      underlayColor={'#f2f2f2'}
      activeOpacity={0.5}
      containerStyle={{borderRadius: 50, marginBottom: 5}}
      title={item.project_manager}
      subtitle={
        <NumberFormat
          value={item.budget_used}
          renderText={value => <Text>{value}</Text>}
          thousandSeparator={true}
          displayType={'text'}
          prefix={'$'}
        />
      }
      leftIcon={{name: 'person'}}
      chevron
      onPress={() => {
        navigation.navigate('ProjectDetail', item.id);
      }}
    />
  );
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <View style={{backgroundColor: '#f2f2f2', margin: 5}}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={data}
          renderItem={renderItem}
          ListEmptyComponent={<Empty text="No hay proyectos creados." />}
        />
      </View>
      <FloatingAction
        actions={actions}
        color="#3B666F"
        onPressItem={async name => {
          navigation.navigate('CreateProject');
          //TODO opciones de ordenado y filtro
        }}
      />
    </>
  );
};

export default Projects;
