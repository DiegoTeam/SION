import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
//Libraries
import {ListItem} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
//Utils
import formatMoney from '../utils/formatMoney';
//Components
import Empty from '../components/Empty';

const Supplies_IA = ({route, navigation}) => {
  const [data, setData] = useState(route.params.data);
  useEffect(() => {
    navigation.setOptions({title: 'Insumos'});
  });
  const renderItem = ({item}) => (
    <ListItem
      title={item.nombre}
      rightTitle={'$' + formatMoney.format(item.VAPS * item.count)}
      subtitle={'$' + formatMoney.format(item.VAPS) + ' x ' + item.count}
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
          navigation.navigate('AddSupplies_IA', route.params);
        }}
      />
    </>
  );
};

export default Supplies_IA;
