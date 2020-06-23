import React, {useState} from 'react';
import {View, FlatList, Alert, ScrollView} from 'react-native';
//Libraries
import {
  SearchBar,
  Text,
  ListItem,
  Overlay,
  Input,
  Icon as IconRNE,
} from 'react-native-elements';
import NumberFormat from 'react-number-format';
//Utils
import AsyncStorageAPI from '../utils/AsyncStorageAPI';
//Components
import Empty from '../components/Empty';
import Loading from '../components/Loading';
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
  const [isLoading, setIsLoading] = useState(false);
  const [suppliesFiltered, setSuppliesFiltered] = useState(supplies);
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [countIRACA, setCountIRACA] = useState(0);
  const [countCommunity, setCountCommunity] = useState(0);
  const [countOthers, setCountOthers] = useState(0);
  const [errorCountIRACA, setErrorCountIRACA] = useState('');
  const [errorCountCommunity, setErrorCountCommunity] = useState('');
  const [errorCountOthers, setErrorCountOthers] = useState('');
  const line = route.params.line;
  const isDisabled = item => {
    for (let i = 0; i < line.supplies.length; i++) {
      if (line.supplies[i].id === item.id) {
        return true;
      }
    }
    return item.price > line.budgetIRACAAvailable;
  };

  const clearSelectedItem = () => {
    setVisible(false);
    setSelectedItem({});
    setCountIRACA(0);
    setCountCommunity(0);
    setCountOthers(0);
    setErrorCountIRACA('');
    setErrorCountCommunity('');
    setErrorCountOthers('');
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
        setSelectedItem(item);
        setVisible(true);
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
  if (isLoading) {
    return <Loading />;
  }
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
      <Overlay isVisible={visible} onBackdropPress={clearSelectedItem}>
        <ScrollView>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Articulo seleccionado
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Nombre:
          </Text>
          <Text
            style={{
              marginTop: 10,
              marginLeft: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {selectedItem.name}
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Descripción:
          </Text>
          <Text
            style={{
              marginTop: 10,
              marginLeft: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {selectedItem.description}
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Precio:
          </Text>
          <NumberFormat
            value={selectedItem.price}
            renderText={value => (
              <Text
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>
                {value}
              </Text>
            )}
            thousandSeparator={true}
            displayType={'text'}
            prefix={'$'}
          />
          <Input
            value={countIRACA.toString()}
            label="Cantidad IRACA"
            keyboardType="number-pad"
            onChangeText={text => {
              if (errorCountIRACA !== '') {
                setErrorCountIRACA('');
              }
              const new_text = text.replace(/[,.-]/g, '').trim();
              setCountIRACA(new_text);
            }}
            errorStyle={{color: '#dc3545'}}
            errorMessage={errorCountIRACA}
            containerStyle={{marginTop: 10}}
          />
          <Input
            value={countCommunity.toString()}
            label="Cantidad comunidad"
            keyboardType="number-pad"
            onChangeText={text => {
              if (errorCountCommunity !== '') {
                setErrorCountCommunity('');
              }
              const new_text = text.replace(/[,.-]/g, '').trim();
              setCountCommunity(new_text);
            }}
            errorStyle={{color: '#dc3545'}}
            errorMessage={errorCountCommunity}
            containerStyle={{marginTop: 10}}
          />
          <Input
            value={countOthers.toString()}
            label="Cantidad otros"
            keyboardType="number-pad"
            onChangeText={text => {
              if (errorCountOthers !== '') {
                setErrorCountOthers('');
              }
              const new_text = text.replace(/[,.-]/g, '').trim();
              setCountOthers(new_text);
            }}
            errorStyle={{color: '#dc3545'}}
            errorMessage={errorCountOthers}
            containerStyle={{marginTop: 10}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 15,
            }}>
            <IconRNE
              raised
              reverse
              name="clear"
              type="MaterialIcons"
              color="#DC3545"
              size={20}
              onPress={clearSelectedItem}
            />
            <IconRNE
              raised
              reverse
              name="save"
              type="MaterialIcons"
              color="#28A745"
              size={20}
              onPress={async () => {
                if (
                  countIRACA === '' ||
                  countCommunity === '' ||
                  countOthers === ''
                ) {
                  if (countIRACA === '') {
                    setErrorCountIRACA('INGRESE UN VALOR VALIDO');
                  }
                  if (countCommunity === '') {
                    setErrorCountCommunity('INGRESE UN VALOR VALIDO');
                  }
                  if (countOthers === '') {
                    setErrorCountOthers('INGRESE UN VALOR VALIDO');
                  }
                } else if (
                  countIRACA === 0 &&
                  countCommunity === 0 &&
                  countOthers === 0
                ) {
                  Alert.alert(
                    'ALERTA',
                    'Ingrese un valor para almenos una cantidad',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                  );
                } else {
                  if (
                    selectedItem.price * parseInt(countIRACA, 10) >
                    line.budgetIRACAAvailable
                  ) {
                    Alert.alert(
                      'ALERTA',
                      'La cantidad de IRACA excede el presupuesto para esta linea.\n\nNumero maximo de este insumo: ' +
                        parseInt(
                          line.budgetIRACAAvailable / selectedItem.price,
                        ),
                      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                      {cancelable: false},
                    );
                  } else {
                    setIsLoading(true);
                    const count = {
                      countIRACA: parseInt(countIRACA, 10),
                      countCommunity: parseInt(countCommunity, 10),
                      countOthers: parseInt(countOthers, 10),
                    };
                    await AsyncStorageAPI.addToLine(
                      route.params.index,
                      route.params.indexLine,
                      selectedItem,
                      count,
                    );
                    navigation.navigate('LineDetail', {
                      index: route.params.index,
                      indexLine: route.params.indexLine,
                      projectType: route.params.projectType,
                    });
                  }
                }
              }}
            />
          </View>
        </ScrollView>
      </Overlay>
    </View>
  );
};

export default AddSupplies;
