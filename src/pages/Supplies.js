import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
//Libraries
import {ListItem} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
//Utils
import formatMoney from '../utils/formatMoney';
//Components
import Empty from '../components/Empty';

const Supplies = ({route, navigation}) => {
  const [data, setData] = useState(route.params.data);
  useEffect(() => {
    navigation.setOptions({title: 'Insumos'});
    console.log(data);
  });
  const renderItem = ({item}) => (
    <ListItem
      title={item.nombre}
      rightTitle={'$' + formatMoney.format(item.precio * item.count)}
      subtitle={'$' + formatMoney.format(item.precio) + ' x ' + item.count}
      bottomDivider
    />
  );
  return (
    <>
      <View>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={data}
          renderItem={renderItem}
          ListEmptyComponent={
            <Empty text="No hay insumos agregados a este proyecto." />
          }
        />
      </View>
      <ActionButton
        buttonColor="#3B666F"
        onPress={() => {
          navigation.navigate('AddSupplies', route.params);
        }}
      />
    </>
  );
};

export default Supplies;
