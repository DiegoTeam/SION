import React, {useState} from 'react';
import {View, Alert, ScrollView} from 'react-native';
//Libraries
import {Text, Icon as IconRNE, Input} from 'react-native-elements';
import NumberFormat from 'react-number-format';
//Utils
import AsyncStorageAPI from '../utils/AsyncStorageAPI';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditSupplies = ({navigation, route}) => {
  const [countIRACA, setCountIRACA] = useState(
    route.params.supple.count.count_IRACA,
  );
  const [countCommunity, setCountCommunity] = useState(
    route.params.supple.count.count_Community,
  );
  const [countOthers, setCountOthers] = useState(
    route.params.supple.count.count_Others,
  );
  const [errorCountIRACA, setErrorCountIRACA] = useState('');
  const [errorCountCommunity, setErrorCountCommunity] = useState('');
  const [errorCountOthers, setErrorCountOthers] = useState('');
  const budgetAvailableWithoutSupple =
    route.params.data.budgetAvailable +
    route.params.supple.price * route.params.supple.count.count_IRACA;
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          marginHorizontal: 20,
          marginVertical: 20,
        }}>
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
        <NumberFormat
          renderText={text => (
            <>
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
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <Icon name="monetization-on" size={30} color="black" />
                <Text style={{fontSize: 17, marginLeft: 15}}>{text}</Text>
              </View>
            </>
          )}
          value={route.params.supple.price}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
        <Input
          value={countIRACA.toString()}
          label="Cantidad de aporte IRACA"
          keyboardType="number-pad"
          onChangeText={text => {
            const new_text = text.replace(/[,.-]/g, '').trim();
            if (errorCountIRACA !== '') {
              setCountIRACA('');
            }
            setCountIRACA(new_text);
          }}
          errorStyle={{color: '#dc3545'}}
          errorMessage={errorCountIRACA}
          containerStyle={{marginTop: 10}}
        />
        <Input
          value={countCommunity.toString()}
          label="Cantidad de aporte comunidad"
          keyboardType="number-pad"
          onChangeText={text => {
            const new_text = text.replace(/[,.-]/g, '').trim();
            if (errorCountCommunity !== '') {
              setErrorCountCommunity('');
            }
            setCountCommunity(new_text);
          }}
          errorStyle={{color: '#dc3545'}}
          errorMessage={errorCountCommunity}
          containerStyle={{marginTop: 10}}
        />
        <Input
          value={countOthers.toString()}
          label="Cantidad de aporte otros"
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
        <NumberFormat
          renderText={text => (
            <>
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#88959E',
                }}>
                Valor aporte IRACA:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <Icon name="monetization-on" size={30} color="black" />
                <Text style={{fontSize: 17, marginLeft: 15}}>{text}</Text>
              </View>
            </>
          )}
          value={route.params.supple.price * countIRACA}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
        <NumberFormat
          renderText={text => (
            <>
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#88959E',
                }}>
                Valor aporte comunidad:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <Icon name="monetization-on" size={30} color="black" />
                <Text style={{fontSize: 17, marginLeft: 15}}>{text}</Text>
              </View>
            </>
          )}
          value={route.params.supple.price * countCommunity}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
        <NumberFormat
          renderText={text => (
            <>
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#88959E',
                }}>
                Valor aporte otros:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <Icon name="monetization-on" size={30} color="black" />
                <Text style={{fontSize: 17, marginLeft: 15}}>{text}</Text>
              </View>
            </>
          )}
          value={route.params.supple.price * countOthers}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
        <NumberFormat
          renderText={text => (
            <>
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#88959E',
                }}>
                Valor total:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <Icon name="monetization-on" size={30} color="black" />
                <Text style={{fontSize: 17, marginLeft: 15}}>{text}</Text>
              </View>
            </>
          )}
          value={
            route.params.supple.price * countIRACA +
            route.params.supple.price * countCommunity +
            route.params.supple.price * countOthers
          }
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
        <NumberFormat
          renderText={text => (
            <>
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#88959E',
                }}>
                Nuevo presupuesto disponible IRACA
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <Icon name="monetization-on" size={30} color="black" />
                <Text style={{fontSize: 17, marginLeft: 15}}>{text}</Text>
              </View>
            </>
          )}
          value={
            budgetAvailableWithoutSupple -
            route.params.supple.price * countIRACA
          }
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
                      data.budgetAvailable = budgetAvailableWithoutSupple;
                      data.budgetIRACAUsed =
                        data.budgetIRACA - data.budgetAvailable;
                      data.budgedCommunity =
                        data.budgedCommunity -
                        route.params.supple.price *
                          route.params.supple.count.count_Community;
                      data.budgedOthers =
                        data.budgedOthers -
                        route.params.supple.price *
                          route.params.supple.count.count_Others;
                      data.isSynchronized = false;
                      for (let i = 0; i < data.supplies.length; i++) {
                        if (data.supplies[i].id === route.params.supple.id) {
                          data.supplies.splice(i, 1);
                        }
                      }
                      await AsyncStorageAPI.updateElement(
                        route.params.index,
                        data,
                      );
                      navigation.navigate('Supplies', {
                        index: route.params.index,
                      });
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
              if (
                countIRACA === '0' ||
                countIRACA === '' ||
                countOthers === '' ||
                countCommunity === ''
              ) {
                if (countIRACA === '0' || countIRACA === '') {
                  setErrorCountIRACA('INGRESE UNA CANTIDAD VALIDA');
                }
                if (countCommunity === '') {
                  setErrorCountCommunity('VALOR MINIMO ES 0');
                }
                if (countOthers === '') {
                  setErrorCountOthers('VALOR MINIMO ES 0');
                }
              } else {
                if (countIRACA === route.params.supple.count_IRACA) {
                  Alert.alert(
                    'ALERTA',
                    'La cantidad del insumo no ha cambiado',
                    [{text: 'Aceptar'}],
                    {cancelable: false},
                  );
                } else {
                  if (
                    route.params.supple.price * countIRACA >
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
                            data.budgetAvailable =
                              budgetAvailableWithoutSupple -
                              route.params.supple.price * countIRACA;
                            data.budgetIRACAUsed =
                              data.budgetIRACA - data.budgetAvailable;
                            data.budgedCommunity =
                              route.params.supple.price * countCommunity;
                            data.budgedOthers =
                              route.params.supple.price * countOthers;
                            data.isSynchronized = false;
                            for (let i = 0; i < data.supplies.length; i++) {
                              if (
                                data.supplies[i].id === route.params.supple.id
                              ) {
                                data.supplies[i].count = {
                                  count_IRACA: countIRACA,
                                  count_Community: countCommunity,
                                  count_Others: countOthers,
                                };
                              }
                            }
                            await AsyncStorageAPI.updateElement(
                              route.params.index,
                              data,
                            );
                            navigation.navigate('Supplies', {
                              index: route.params.index,
                            });
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
    </ScrollView>
  );
};

export default EditSupplies;
