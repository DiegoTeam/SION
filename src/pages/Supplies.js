import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
//Libraries
import {Text, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';
//Components
import Empty from '../components/Empty';
import {FloatingAction} from 'react-native-floating-action';
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
    navigation.setOptions({title: 'Insumos'});
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
      subtitle={
        <NumberFormat
          value={item.price * item.count}
          renderText={value => <Text>{value}</Text>}
          thousandSeparator={true}
          displayType={'text'}
          prefix={'$'}
        />
      }
      bottomDivider
      badge={{
        value: item.count,
        containerStyle: {marginTop: -20},
      }}
      onPress={() => {
        navigation.navigate('EditSupplies', {
          data: data,
          supple: item,
        });
        //TODO ir a detalle del suministro
      }}
    />
  );
  return isLoading ? (
    <View>
      {/*TODO crear indicardor de carga*/}
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={supples}
        renderItem={renderItem}
        ListEmptyComponent={<Empty text="No hay insumos agregados." />}
      />
      <FloatingAction
        actions={actions}
        color="#3B666F"
        onPressItem={async name => {
          navigation.navigate('AddSupplies', data);
          //TODO opciones de ordenado y filtro
        }}
      />
    </View>
  );
};

export default Supplies;
