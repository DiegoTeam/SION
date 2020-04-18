import React, {useState, useEffect} from 'react';
import {View, FlatList, Alert} from 'react-native';
//Libraries
import {SearchBar, Text, ListItem} from 'react-native-elements';
import NumberFormat from 'react-number-format';
//Utils
import AsyncStorageAPI from '../utils/AsyncStorageAPI';
//Components
import Empty from '../components/Empty';
//Data
import {data} from '../data/data';

const AddSupplies = ({navigation, route}) => {
  //TODO cambiar a constante unica
  const [supplies, setSupplies] = useState(() => {
    if (route.params.project_type === 'Productivo') {
      return data.insumos_productivos;
    } else if (route.params.project_type === 'Alimentario') {
      return data.insumos_alimentarios;
    } else if (route.params.project_type === 'Fortalecimiento') {
      return data.insumos_comunitarios;
    }
  });
  const [suppliesFiltered, setSuppliesFiltered] = useState(supplies);
  const [search, setSearch] = useState('');
  const isDisabled = item => {
    for (let i = 0; i < route.params.supplies.length; i++) {
      if (route.params.supplies[i].id === item.id) {
        return true;
      }
    }
    return item.price > route.params.budget_available;
  };
  const renderItem = ({item}) => (
    <ListItem
      title={item.name}
      subtitle={
        <NumberFormat
          value={item.price}
          renderText={value => <Text>{value}</Text>}
          thousandSeparator={true}
          displayType={'text'}
          prefix={'$'}
        />
      }
      disabledStyle={{backgroundColor: '#A8A8A8'}}
      disabled={isDisabled(item)}
      onPress={() => {
        Alert.alert(
          'ALERTA',
          'Desea agregar este insumo a su proyecto?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Agregar',
              onPress: async () => {
                await AsyncStorageAPI.addToData(route.params.id, item);
                navigation.navigate('Supplies', route.params.id);
              },
            },
          ],
          {cancelable: false},
        );
      }}
      bottomDivider
    />
  );
  const onSearchChange = search => {
    setSuppliesFiltered(
      supplies.filter(element =>
        element.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
    setSearch(search);
  };
  return (
    <View>
      <SearchBar
        placeholder="Buscar un insumo"
        onChangeText={onSearchChange}
        value={search}
        containerStyle={{
          backgroundColor: '#3B666F',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
      />
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={suppliesFiltered}
        renderItem={renderItem}
        ListEmptyComponent={<Empty text="No hay insumos disponibles." />}
      />
    </View>
    // TODO Crear boton de filtro
  );
};

export default AddSupplies;
