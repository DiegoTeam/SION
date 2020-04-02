import React, {useState, useEffect} from 'react';
import {View, FlatList, Alert} from 'react-native';
//Libraries
import {
  ListItem,
  SearchBar,
  Input,
  Overlay,
  Text,
  Button,
  Icon as IconRNE,
} from 'react-native-elements';
//Utils
import formatMoney from '../utils/formatMoney';
import AsyncStorageAPI from '../utils/AsyncStorageAPI';
//Components
import Empty from '../components/Empty';
//Data
import insumosAlimentarios from '../data/insumosAlimentarios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddSupplies_IA = ({route, navigation}) => {
  const [data, setData] = useState(insumosAlimentarios.data);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(insumosAlimentarios.data[1]);
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(1);
  const [removeButton, setRemoveButton] = useState(true);

  useEffect(() => {
    navigation.setOptions({title: 'Agregar insumos'});
  });

  const renderItem = ({item}) => (
    <ListItem
      title={item.nombre}
      rightTitle={'$' + formatMoney.format(item.VAPS)}
      bottomDivider
      onPress={() => {
        setSelectedItem(item);
        setIsVisible(true);
      }}
    />
  );
  const onSearchChange = search => {
    setData(
      insumosAlimentarios.data.filter(data =>
        data.nombre.toLowerCase().includes(search.toLowerCase()),
      ),
    );
    setSearch(search);
  };
  const showAlert = () => {
    Alert.alert(
      'Alerta',
      'El valor de este insumo supera el presupuiesto actual',
    );
  };
  const newBudget = newBudget => {
    Alert.alert(
      'Alerta',
      'El nuevo presupuesto es de:\n$' + formatMoney.format(newBudget),
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Home');
          },
        },
      ],
    );
  };
  return (
    <View>
      <SearchBar
        placeholder="Busca un insumo"
        onChangeText={onSearchChange}
        value={search}
      />
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={
          <Empty text="No se encuentran insumos con ese nombre" />
        }
      />
      <Overlay isVisible={isVisible} height="auto">
        <View>
          <Text
            style={{
              marginLeft: 10,
              fontWeight: 'bold',
              fontSize: 15,
              color: '#88959E',
            }}>
            Nombre
          </Text>
          <Text style={{marginLeft: 10}}>{selectedItem.nombre}</Text>
          <Input
            value={formatMoney.format(selectedItem.VAPS).toString()}
            label="Precio"
            leftIcon={<Icon name="monetization-on" size={24} color="black" />}
            containerStyle={{marginBottom: 20}}
            disabled={true}
          />
          {selectedItem.categoria !== null && (
            <Input
              value={selectedItem.categoria}
              label="Categoria"
              leftIcon={<Icon name="apps" size={24} color="black" />}
              containerStyle={{marginBottom: 20}}
              disabled={true}
            />
          )}
          <Text
            style={{
              marginLeft: 10,
              fontWeight: 'bold',
              fontSize: 15,
              color: '#88959E',
            }}>
            Cantidad
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconRNE
              raised
              reverse
              name="remove"
              type="MaterialIcons"
              color="#3B666F"
              size={13}
              disabled={removeButton}
              onPress={() => {
                if (count === 2) {
                  setRemoveButton(true);
                }
                setCount(count - 1);
              }}
            />
            <Text h3>{count}</Text>
            <IconRNE
              raised
              reverse
              name="add"
              type="MaterialIcons"
              color="#3B666F"
              size={13}
              onPress={() => {
                if (count === 1) {
                  setRemoveButton(false);
                }
                setCount(count + 1);
              }}
            />
          </View>
          <Input
            value={formatMoney.format(selectedItem.VAPS * count).toString()}
            label="Precio final"
            leftIcon={<Icon name="monetization-on" size={24} color="black" />}
            containerStyle={{marginBottom: 20}}
            disabled={true}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              icon={<Icon name="check" size={15} color="white" />}
              title="Agregar al proyecto"
              onPress={async () => {
                if (selectedItem.VAPS * count > route.params.budget_available) {
                  showAlert();
                } else {
                  await AsyncStorageAPI.addToData(
                    route.params.id,
                    selectedItem,
                    count,
                    selectedItem.VAPS * count,
                  );
                  newBudget(route.params.budget_available - selectedItem.VAPS);
                }
              }}
              buttonStyle={{backgroundColor: 'green'}}
            />
            <Button
              icon={<Icon name="clear" size={15} color="white" />}
              title="Cancelar"
              onPress={() => {
                setIsVisible(false);
                setCount(1);
              }}
              buttonStyle={{backgroundColor: 'red'}}
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
};

export default AddSupplies_IA;
