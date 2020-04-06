import React, {useState} from 'react';
import {Picker, View, Alert} from 'react-native';
//Libraries
import {Input, Overlay, Text, Icon as IconRNE} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Utils
import NumberFormat from 'react-number-format';
import AsyncStorageAPI from '../utils/AsyncStorageAPI';

//TODO integrar API
const EditProject = ({route, navigation}) => {
  const [data, setData] = useState(route.params);
  const [name, setName] = useState(data.project_manager);
  const [errorName, setErrorName] = useState('');
  const [document, setDocument] = useState(data.document);
  const [errorDocument, setErrorDocument] = useState('');
  const [homes, setHomes] = useState(data.homes);
  const [errorHomes, setErrorHomes] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(data.project_type);
  const budget_base = 800000;

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', marginHorizontal: 20}}>
        <Input
          value={name}
          label="Representante del proyecto"
          leftIcon={<Icon name="person" size={24} color="black" />}
          onChangeText={text => {
            if (errorName !== '') {
              setErrorName('');
            }
            setName(text);
          }}
          errorStyle={{color: 'red'}}
          errorMessage={errorName}
          containerStyle={{marginBottom: 20}}
        />
        <Input
          value={document}
          label="Cedula del representante"
          leftIcon={<Icon name="apps" size={24} color="black" />}
          keyboardType="numeric"
          onChangeText={text => {
            if (errorDocument !== '') {
              setErrorDocument('');
            }
            setDocument(text.replace(/[,.-]/g, '').trim());
          }}
          errorStyle={{color: 'red'}}
          errorMessage={errorDocument}
          containerStyle={{marginBottom: 20}}
        />
        <View
          style={{
            marginBottom: 20,
            backgroundColor: 'white',
            borderRadius: 5,
            marginHorizontal: 10,
          }}>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              fontWeight: 'bold',
              fontSize: 15,
              color: '#88959E',
            }}>
            Tipo de proyecto:
          </Text>
          <Picker
            selectedValue={selectedValue}
            style={{marginLeft: 10}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="Productivo" value="Productivo" />
            <Picker.Item label="Alimentario" value="Alimentario" />
          </Picker>
        </View>
        <Input
          value={homes.toString()}
          label="Numero de hogares"
          leftIcon={<Icon name="home" size={24} color="black" />}
          keyboardType="number-pad"
          onChangeText={text => {
            const new_text = text.replace(/[,.-]/g, '').trim();
            if (errorHomes !== '') {
              setErrorHomes('');
            }
            setHomes(new_text);
          }}
          errorStyle={{color: 'red'}}
          errorMessage={errorHomes}
          containerStyle={{marginBottom: 20}}
        />
        <NumberFormat
          renderText={text => (
            <Input
              value={text}
              label="Presupuesto utilizado"
              leftIcon={<Icon name="monetization-on" size={24} color="black" />}
              containerStyle={{marginBottom: 20}}
              disabled={true}
            />
          )}
          value={data.budget_used}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
        <NumberFormat
          renderText={text => (
            <Input
              value={text}
              label="Nuevo presupuesto"
              leftIcon={<Icon name="monetization-on" size={24} color="black" />}
              containerStyle={{marginBottom: 20}}
              disabled={true}
            />
          )}
          value={homes * budget_base}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
        <IconRNE
          containerStyle={{alignSelf: 'center'}}
          raised
          reverse
          name="save"
          type="MaterialIcons"
          color="#3B666F"
          size={20}
          onPress={() => {
            if (
              name === '' ||
              document === '' ||
              homes === '' ||
              homes === '0'
            ) {
              if (name === '') {
                setErrorName('INGRESE UN VALOR VALIDO');
              }
              if (document === '') {
                setErrorDocument('INGRESE UN VALOR VALIDO');
              }
              if (homes === '' || homes === '0') {
                setErrorHomes('INGRESE UN VALOR VALIDO');
              }
            } else {
              const new_budget = budget_base * homes;
              if (
                data.budget_used > new_budget &&
                data.project_type === selectedValue
              ) {
                Alert.alert(
                  'ALERTA',
                  'El nuevo presupuesto es menor al presupuesto ya utilizado en este proyecto',
                  [{text: 'Aceptar'}],
                  {cancelable: false},
                );
              } else {
                if (data.project_type !== selectedValue) {
                  Alert.alert(
                    'ALERTA',
                    'Al cambiar el tipo de proyecto, se eliminaran todos los insumos creados anteriormente',
                    [
                      {
                        text: 'Aceptar',
                        onPress: () => setVisible(true),
                      },
                      {
                        text: 'Cancelar',
                        style: 'cancel',
                      },
                    ],
                    {
                      cancelable: false,
                    },
                  );
                } else {
                  setVisible(true);
                }
              }
            }
          }}
        />
      </View>
      <Overlay
        isVisible={isVisible}
        borderRadius={10}
        animationType={'fade'}
        width={300}
        height={'auto'}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 20}}>
            Se editara el proyecto con los siguientes valores
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Representante:
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Icon name="person" size={30} color="black" />
            <Text style={{fontSize: 17, marginLeft: 15}}>{name}</Text>
          </View>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Cedula:
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Icon name="apps" size={30} color="black" />
            <Text style={{fontSize: 17, marginLeft: 15}}>{document}</Text>
          </View>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Tipo:
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Icon name="card-travel" size={30} color="black" />
            <Text style={{fontSize: 17, marginLeft: 15}}>{selectedValue}</Text>
          </View>
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
                  Presupuesto:
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
            value={homes * budget_base}
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
                setVisible(false);
              }}
            />
            <IconRNE
              raised
              reverse
              name="save"
              type="MaterialIcons"
              color="#28A745"
              size={20}
              onPress={async () => {
                if (data.project_type !== selectedValue) {
                  const newData = {
                    id: data.id,
                    project_manager: name,
                    project_type: selectedValue,
                    document: document,
                    homes: homes,
                    budget: budget_base * homes,
                    budget_used: 0,
                    budget_available: budget_base * homes,
                    supplies: [],
                  };
                  await AsyncStorageAPI.updateElement(data.id, newData);
                } else {
                  const newData = {
                    id: data.id,
                    project_manager: name,
                    project_type: selectedValue,
                    document: document,
                    homes: homes,
                    budget: budget_base * homes,
                    budget_used: data.budget_used,
                    budget_available: budget_base * homes - data.budget_used,
                    supplies: data.supplies,
                  };
                  await AsyncStorageAPI.updateElement(data.id, newData);
                }
                setVisible(false);
                navigation.navigate('ProjectDetail', data.id);
              }}
            />
          </View>
        </View>
      </Overlay>
    </>
  );
};

export default EditProject;
