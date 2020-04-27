import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
//Libraries
import {FloatingAction} from 'react-native-floating-action';
import {ListItem, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';
import {useNetInfo} from '@react-native-community/netinfo';
//Utils
import ProjectData from '../utils/ProjectData';
//Components
import Empty from '../components/Empty';
import Loading from '../components/Loading';

const Projects = ({navigation}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const netInfo = useNetInfo();

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
    const getData = async () => {
      setIsLoading(true);
      const response = await ProjectData.getProjects(netInfo.isConnected);
      setData(response);
      setIsLoading(false);
    };
    return navigation.addListener('focus', () => {
      getData();
    });
  }, [navigation]);

  const setIcon = item => {
    if (item.isSynchronized) {
      return {name: 'backup', color: '#28A745'};
    } else {
      return {name: 'backup', color: '#DC3545'};
    }
  };

  const renderItem = ({item}) => (
    <ListItem
      underlayColor={'#f2f2f2'}
      activeOpacity={0.5}
      containerStyle={{borderRadius: 50, marginBottom: 5}}
      title={item.projectName}
      subtitle={
        <NumberFormat
          value={item.budget_used}
          renderText={value => <Text>{value}</Text>}
          thousandSeparator={true}
          displayType={'text'}
          prefix={'$'}
        />
      }
      leftIcon={setIcon(item)}
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
          navigation.navigate('CreateProject', {
            homes: [],
            selectedValue: 'Productivo',
          });
          //TODO opciones de ordenado y filtro
        }}
      />
    </>
  );
};

export default Projects;
