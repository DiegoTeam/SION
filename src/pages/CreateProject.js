import React, {useState} from 'react';
import {View, Picker} from 'react-native';
//Libraries
import {
  Input,
  CheckBox,
  Overlay,
  Text,
  Icon as IconRNE,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';
//Utils
import AsyncStorageAPI from '../utils/AsyncStorageAPI';

const CreateProject = ({navigation}) => {
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');
  const [document, setDocument] = useState('');
  const [errorDocument, setErrorDocument] = useState('');
  const [checked, setChecked] = useState(false);
  const [homes, setHomes] = useState(1);
  const [errorHomes, setErrorHomes] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Productivo');
  const budget_base_a = 800000;
  const budget_base_p = 1750000;
  const budget_base_f = 180000;
  const [budgetBase, setBudgetBase] = useState(budget_base_p);

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', marginHorizontal: 20}}>
        <Input
          value={name}
          label="Jefe del hogar"
          leftIcon={<Icon name="person" size={24} color="black" />}
          onChangeText={text => {
            if (errorName !== '') {
              setErrorName('');
            }
            setName(text);
          }}
          errorStyle={{color: '#DC3545'}}
          errorMessage={errorName}
          containerStyle={{marginBottom: 20}}
        />
        <Input
          value={document}
          label="Cedula"
          leftIcon={<Icon name="apps" size={24} color="black" />}
          keyboardType="numeric"
          onChangeText={text => {
            if (errorDocument !== '') {
              setErrorDocument('');
            }
            setDocument(text.replace(/[,.-]/g, '').trim());
          }}
          errorStyle={{color: '#DC3545'}}
          errorMessage={errorDocument}
          containerStyle={{marginBottom: 20}}
        />
        <View
          style={{
            marginBottom: 20,
            backgroundColor: 'white',
            borderRadius: 5,
            margin: 10,
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
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue(itemValue);
              if (itemValue === 'Productivo') {
                setBudgetBase(budget_base_p);
              } else if (itemValue === 'Alimentario') {
                setBudgetBase(budget_base_a);
              } else if (itemValue === 'Fortalecimiento') {
                setBudgetBase(budget_base_f);
              }
            }}>
            <Picker.Item label="Productivo" value="Productivo" />
            <Picker.Item label="Alimentario" value="Alimentario" />
            <Picker.Item label="Fortalecimiento" value="Fortalecimiento" />
          </Picker>
        </View>
        <CheckBox
          center
          title="Proyecto colectivo"
          iconType="MaterialIcons"
          checkedColor="#3B666F"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
          checked={checked}
          onPress={() => {
            setChecked(!checked);
            setHomes(1);
            if (errorHomes !== '') {
              setErrorHomes('');
            }
          }}
          containerStyle={{marginBottom: 20}}
        />
        {checked && (
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
            errorStyle={{color: '#dc3545'}}
            errorMessage={errorHomes}
            containerStyle={{marginBottom: 20}}
          />
        )}
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
              homes === '0' ||
              (homes === 1 && checked)
            ) {
              if (name === '') {
                setErrorName('INGRESE UN NOMBRE');
              }
              if (document === '') {
                setErrorDocument('INGRESE UNA CEDULA');
              }
              if (homes === '' || homes === '0') {
                setErrorHomes('INGRESE UN NUMERO VALIDO DE HOGARES');
              }
              if (homes === 1 && checked) {
                setErrorHomes('DEBE INGRESAR MAS DE UN HOGAR');
              }
            } else {
              setVisible(true);
            }
          }}
        />
      </View>
      <Overlay
        isVisible={isVisible}
        borderRadius={10}
        animationType={'fade'}
        width={320}
        height={'auto'}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 20}}>
            Se creara un proyecto con los siguientes valores
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Jefe del hogar:
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
            value={homes * budgetBase}
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
              name="check"
              type="MaterialIcons"
              color="#28A745"
              size={20}
              onPress={async () => {
                const data = {
                  id: 0,
                  isSynchronized: false,
                  project_manager: name,
                  document: document,
                  project_type: selectedValue,
                  homes: homes,
                  budget: budgetBase * homes,
                  budget_used: 0,
                  budget_available: budgetBase * homes,
                  supplies: [],
                };
                if (await AsyncStorageAPI.isNull()) {
                  data.id = 1;
                  const newData = [];
                  newData.push(data);
                  await AsyncStorageAPI.setData(newData);
                  setVisible(false);
                  navigation.navigate('Projects');
                } else {
                  const oldData = await AsyncStorageAPI.getData();
                  const lastElementId = await AsyncStorageAPI.lastElementId();
                  data.id = lastElementId + 1;
                  oldData.push(data);
                  await AsyncStorageAPI.setData(oldData);
                  setVisible(false);
                  navigation.navigate('Projects');
                }
              }}
            />
          </View>
        </View>
      </Overlay>
    </>
  );
};

export default CreateProject;
