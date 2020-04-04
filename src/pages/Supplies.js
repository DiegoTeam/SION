import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
//Libraries
import {Text, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';
//Components
import Empty from '../components/Empty';
import {FloatingAction} from 'react-native-floating-action';

const Supplies = ({navigation, route}) => {
  const [data, setData] = useState(route.params.supplies);
  const actions = [
    {
      text: 'Agregar insumos',
      color: '#3B666F',
      icon: <Icon name="add-circle" size={24} color="white" />,
      name: 'bt_create_project',
      position: 1,
    },
  ];
  useState(() => {
    navigation.setOptions({title: 'Insumos'});
  });
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
          data: route.params,
          supple: item,
        });
        //TODO ir a detalle del suministro
      }}
    />
  );
  return (
    <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={<Empty text="No hay insumos agregados." />}
      />
      <FloatingAction
        actions={actions}
        color="#3B666F"
        onPressItem={async name => {
          navigation.navigate('AddSupplies', route.params);
          //TODO opciones de ordenado y filtro
        }}
      />
    </View>
  );
};

export default Supplies;
