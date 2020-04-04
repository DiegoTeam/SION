import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
//Libraries
import {Button, Text, Icon} from 'react-native-elements';
import NumberFormat from 'react-number-format';
//Utils
import AsyncStorageAPI from '../utils/AsyncStorageAPI';

const EditSupplies = ({navigation, route}) => {
  const [count, setCount] = useState(route.params.supple.count);
  const [deductDisable, setDeductDisable] = useState(() => {
    return count === 1;
  });
  const budgetAvailableWithoutSupple =
    route.params.data.budget_available +
    route.params.supple.price * route.params.supple.count;
  useEffect(() => {
    navigation.setOptions({title: 'Editar insumo'});
  }, [navigation]);
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
      <Text
        style={{
          marginLeft: 10,
          marginTop: 10,
          fontWeight: 'bold',
          fontSize: 17,
          color: '#88959E',
        }}>
        Cantidad:
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon
          raised
          reverse
          name="remove"
          type="MaterialIcons"
          color="#3B666F"
          size={13}
          disabled={deductDisable}
          onPress={() => {
            if (count === 2) {
              setDeductDisable(true);
            }
            setCount(count - 1);
          }}
        />
        <Text h3>{count}</Text>
        <Icon
          raised
          reverse
          name="add"
          type="MaterialIcons"
          color="#3B666F"
          size={13}
          onPress={() => {
            if (count === 1) {
              setDeductDisable(false);
            }
            setCount(count + 1);
          }}
        />
      </View>
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
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button
          icon={<Icon name="clear" size={15} color="white" />}
          title=" Eliminar"
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
                    for (let i = 0; i < data.supplies.length; i++) {
                      if (data.supplies[i].id === route.params.supple.id) {
                        data.supplies.splice(i, 1);
                      }
                    }
                    await AsyncStorageAPI.updateElement(data.id, data);
                    navigation.navigate('Projects');
                    //TODO regresar a la pagina de insumos
                  },
                },
              ],
              {cancelable: true},
            );
          }}
          buttonStyle={{backgroundColor: 'red'}}
        />
        <Button
          icon={<Icon name="save" size={15} color="white" />}
          title=" Guardar"
          onPress={() => {
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
                        data.budget_used = data.budget - data.budget_available;
                        for (let i = 0; i < data.supplies.length; i++) {
                          if (data.supplies[i].id === route.params.supple.id) {
                            data.supplies[i].count = count;
                          }
                        }
                        await AsyncStorageAPI.updateElement(data.id, data);
                        navigation.navigate('Projects');
                        //TODO regresar a la pagina de insumos
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }
            }
          }}
          buttonStyle={{backgroundColor: '#3B666F'}}
        />
      </View>
    </View>
  );
};

export default EditSupplies;
