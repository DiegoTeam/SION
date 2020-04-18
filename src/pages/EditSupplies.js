import React, {useState} from 'react';
import {View, Alert} from 'react-native';
//Libraries
import {Text, Icon as IconRNE, Input} from 'react-native-elements';
import NumberFormat from 'react-number-format';
//Utils
import AsyncStorageAPI from '../utils/AsyncStorageAPI';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditSupplies = ({navigation, route}) => {
  const [count, setCount] = useState(route.params.supple.count);
  const [errorCount, setErrorCount] = useState('');
  const budgetAvailableWithoutSupple =
    route.params.data.budget_available +
    route.params.supple.price * route.params.supple.count;
  return (
    <View style={{flex: 1, justifyContent: 'center', marginHorizontal: 20}}>
      <Text
        style={{
          marginLeft: 10,
          marginTop: 10,
          fontWeight: 'bold',
          fontSize: 17,
          color: '#88959E',
        }}>
        Nombre:
      </Text>
      <Text style={{marginLeft: 10, marginTop: 10, fontSize: 17}}>
        {route.params.supple.name}
      </Text>
      <Text
        style={{
          marginLeft: 10,
          marginTop: 10,
          fontWeight: 'bold',
          fontSize: 17,
          color: '#88959E',
        }}>
        Precio unitario:
      </Text>
      <NumberFormat
        renderText={text => (
          <Text style={{marginLeft: 10, marginTop: 10, fontSize: 17}}>
            {text}
          </Text>
        )}
        value={route.params.supple.price}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
      <Input
        value={count.toString()}
        label="Cantidad"
        keyboardType="number-pad"
        onChangeText={text => {
          const new_text = text.replace(/[,.-]/g, '').trim();
          if (errorCount !== '') {
            setErrorCount('');
          }
          setCount(new_text);
        }}
        errorStyle={{color: '#dc3545'}}
        errorMessage={errorCount}
        containerStyle={{marginTop: 10}}
      />
      <Text
        style={{
          marginLeft: 10,
          marginTop: 10,
          fontWeight: 'bold',
          fontSize: 17,
          color: '#88959E',
        }}>
        Precio final:
      </Text>
      <NumberFormat
        renderText={text => (
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              fontSize: 17,
            }}>
            {text}
          </Text>
        )}
        value={route.params.supple.price * count}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
      <Text
        style={{
          marginLeft: 10,
          marginTop: 10,
          fontWeight: 'bold',
          fontSize: 17,
          color: '#88959E',
        }}>
        Nuevo presupuesto disponible:
      </Text>
      <NumberFormat
        renderText={text => (
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              fontSize: 17,
              marginBottom: 10,
            }}>
            {text}
          </Text>
        )}
        value={budgetAvailableWithoutSupple - route.params.supple.price * count}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
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
          onPress={() => {
            Alert.alert(
              'ALERTA',
              'Esta seguro de eliminar este insumo?',
              [
                {
                  text: 'Cancelar',
                  style: 'cancel',
                },
                {
                  text: 'Eliminar',
                  onPress: async () => {
                    const data = route.params.data;
                    data.budget_available = budgetAvailableWithoutSupple;
                    data.budget_used = data.budget - data.budget_available;
                    data.isSynchronized = false;
                    for (let i = 0; i < data.supplies.length; i++) {
                      if (data.supplies[i].id === route.params.supple.id) {
                        data.supplies.splice(i, 1);
                      }
                    }
                    await AsyncStorageAPI.updateElement(data.id, data);
                    navigation.navigate('Supplies', route.params.id);
                  },
                },
              ],
              {cancelable: true},
            );
          }}
        />
        <IconRNE
          raised
          reverse
          name="save"
          type="MaterialIcons"
          color="#3B666F"
          size={20}
          onPress={() => {
            if (count === '0' || count === '') {
              setErrorCount('INGRESE UNA CANTIDAD VALIDA');
            } else {
              if (count === route.params.supple.count) {
                Alert.alert(
                  'ALERTA',
                  'La cantidad del insumo no ha cambiado',
                  [{text: 'Aceptar'}],
                  {cancelable: false},
                );
              } else {
                if (
                  route.params.supple.price * count >
                  budgetAvailableWithoutSupple
                ) {
                  Alert.alert(
                    'ALERTA',
                    'Este insumo supera el presupuesto disponible para este proyecto',
                    [{text: 'Aceptar'}],
                    {cancelable: false},
                  );
                } else {
                  Alert.alert(
                    'ALERTA',
                    'Desea guardar este insumo?',
                    [
                      {text: 'Cancelar'},
                      {
                        text: 'Guardar',
                        onPress: async () => {
                          const data = route.params.data;
                          data.budget_available =
                            budgetAvailableWithoutSupple -
                            route.params.supple.price * count;
                          data.budget_used =
                            data.budget - data.budget_available;
                          data.isSynchronized = false;
                          for (let i = 0; i < data.supplies.length; i++) {
                            if (
                              data.supplies[i].id === route.params.supple.id
                            ) {
                              data.supplies[i].count = count;
                            }
                          }
                          await AsyncStorageAPI.updateElement(data.id, data);
                          navigation.navigate('Supplies', route.params.id);
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                }
              }
            }
          }}
        />
      </View>
    </View>
  );
};

export default EditSupplies;
