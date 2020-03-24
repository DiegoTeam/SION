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
  });
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
          navigation.navigate('CreateProject');
        }}
      />
    </>
  );
};

export default Supplies;
