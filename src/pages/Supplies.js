import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
//Libraries
import {Text, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';
import {FloatingAction} from 'react-native-floating-action';
//Components
import Empty from '../components/Empty';
import Loading from '../components/Loading';
//Utils
import AsyncStorageAPI from '../utils/AsyncStorageAPI';

const Supplies = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [supples, setSupples] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const actions = [
    {
      text: 'Agregar insumos',
      color: '#3B666F',
      icon: <Icon name="add-circle" size={24} color="white" />,
      name: 'bt_create_project',
      position: 1,
    },
  ];
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await AsyncStorageAPI.getProject(route.params);
      setData(response);
      setSupples(response.supplies);
      setIsLoading(false);
    }
    fetchData();
    return navigation.addListener('focus', () => {
      fetchData();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
  const renderItem = ({item}) => (
    <ListItem
      title={item.name}
      underlayColor={'#f2f2f2'}
      activeOpacity={0.5}
      containerStyle={{borderRadius: 25, marginBottom: 5}}
      subtitle={
        <NumberFormat
          value={item.price * item.count}
          renderText={value => <Text>{value}</Text>}
          thousandSeparator={true}
          displayType={'text'}
          prefix={'$'}
        />
      }
      badge={{
        value: item.count,
        containerStyle: {marginTop: -20},
        textStyle: {fontSize: 15},
      }}
      onPress={() => {
        navigation.navigate('EditSupplies', {
          data: data,
          supple: item,
        });
      }}
    />
  );
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <View style={{flex: 1, margin: 5}}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={supples}
          renderItem={renderItem}
          ListEmptyComponent={<Empty text="No hay insumos agregados." />}
        />
      </View>
      <FloatingAction
        actions={actions}
        color="#3B666F"
        onPressItem={async name => {
          navigation.navigate('AddSupplies', data);
          //TODO opciones de ordenado y filtro
        }}
      />
    </>
  );
};

export default Supplies;
