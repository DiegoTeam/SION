import React, {useState} from 'react';
import {View, Alert} from 'react-native';
//Libraries
import {Text, Icon as IconRNE, Input} from 'react-native-elements';
import NumberFormat from 'react-number-format';
//Utils
import AsyncStorageAPI from '../utils/AsyncStorageAPI';

const EditSupplies = ({navigation, route}) => {
  const line = route.params.line;
  const supple = route.params.supple;
  const [countIRACA, setCountIRACA] = useState(supple.count.countIRACA);
  const [countCommunity, setCountCommunity] = useState(
    supple.count.countCommunity,
  );
  const [countOthers, setCountOthers] = useState(supple.count.countOthers);
  const [errorCountIRACA, setErrorCountIRACA] = useState('');
  const [errorCountCommunity, setErrorCountCommunity] = useState('');
  const [errorCountOthers, setErrorCountOthers] = useState('');
  const budgetAvailableWithoutSupple =
    line.budgetIRACAAvailable + supple.price * supple.count.countIRACA;
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
        {supple.name}
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
        value={supple.price}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
      <Input
        value={countIRACA.toString()}
        label="Cantidad IRACA"
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
        label="Cantidad comunidad"
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
        value={supple.price * countIRACA}
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
        value={budgetAvailableWithoutSupple - supple.price * countIRACA}
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
                    await AsyncStorageAPI.deleteSupple(
                      route.params.index,
                      route.params.indexLine,
                      route.params.indexSupple,
                    );
                    navigation.navigate('LineDetail', {
                      index: route.params.index,
                      indexLine: route.params.indexLine,
                      projectType: route.params.projectType,
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
              countIRACA === '' ||
              countIRACA === '' ||
              countOthers === '' ||
              countCommunity === ''
            ) {
              if (countIRACA === '') {
                setErrorCountIRACA('VALOR MINIMO ES 0');
              }
              if (countCommunity === '') {
                setErrorCountCommunity('VALOR MINIMO ES 0');
              }
              if (countOthers === '') {
                setErrorCountOthers('VALOR MINIMO ES 0');
              }
            } else if (
              countIRACA === '0' &&
              countCommunity === '0' &&
              countOthers === '0'
            ) {
              Alert.alert(
                'ALERTA',
                'Ingrese un valor para almenos una cantidad',
                [{text: 'OK'}],
                {cancelable: false},
              );
            } else {
              if (supple.price * countIRACA > budgetAvailableWithoutSupple) {
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
                        await AsyncStorageAPI.editSupple(
                          route.params.index,
                          route.params.indexLine,
                          route.params.indexSupple,
                          {
                            countIRACA: countIRACA,
                            countCommunity: countCommunity,
                            countOthers: countOthers,
                          },
                          budgetAvailableWithoutSupple -
                            supple.price * countIRACA,
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
              }
            }
          }}
        />
      </View>
    </View>
  );
};

export default EditSupplies;
