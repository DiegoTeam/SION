import React, {useState} from 'react';
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
  const [supplies, setSupplies] = useState(() => {
    if (route.params.projectType === 'Productivo') {
      return data.insumos_productivos;
    } else if (route.params.projectType === 'Alimentario') {
      return data.insumos_alimentarios;
    } else if (route.params.projectType === 'Fortalecimiento') {
      return data.insumos_comunitarios;
    } else if (route.params.projectType === 'Financiacion complementaria') {
      return data.financiacion_complementaria;
    }
  });
  const [suppliesFiltered, setSuppliesFiltered] = useState(supplies);
  const [search, setSearch] = useState('');
  const line = route.params.line;
  const isDisabled = item => {
    for (let i = 0; i < line.supplies.length; i++) {
      if (line.supplies[i].id === item.id) {
        return true;
      }
    }
    return item.price > line.budgetIRACAAvailable;
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
                await AsyncStorageAPI.addToLine(
                  route.params.index,
                  route.params.indexLine,
                  item,
                );
                navigation.navigate('LineDetail', {
                  index: route.params.index,
                  indexLine: route.params.indexLine,
                  projectType: route.params.projectType,
                });
              },
            },
          ],
          {cancelable: false},
        );
      }}
      bottomDivider
    />
  );
  const onSearchChange = searchWord => {
    setSuppliesFiltered(
      supplies.filter(element =>
        element.name.toLowerCase().includes(searchWord.toLowerCase()),
      ),
    );
    setSearch(searchWord);
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
