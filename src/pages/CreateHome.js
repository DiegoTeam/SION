import React, {useState} from 'react';
import {View} from 'react-native';
//Libraries
import {Button, Input, CheckBox, Overlay, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Utils
import formatMoney from '../utils/formatMoney';
import AsyncStorageAPI from '../utils/AsyncStorageAPI';

const CreateHome = ({navigation}) => {
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');
  const [document, setDocument] = useState('');
  const [errorDocument, setErrorDocument] = useState('');
  const [checked, setChecked] = useState(false);
  const [homes, setHomes] = useState(1);
  const [errorHomes, setErrorHomes] = useState('');
  const [isVisible, setVisible] = useState(false);
  return (
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
          errorStyle={{color: 'red'}}
          errorMessage={errorHomes}
          containerStyle={{marginBottom: 20}}
        />
      )}
      <Button
        icon={<Icon name="save" size={15} color="white" />}
        title="Guardar"
        onPress={() => {
          if (
            name === '' ||
            document === '' ||
            homes === '' ||
            homes === '0' ||
            (homes === 1 && checked)
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
            if (homes === 1 && checked) {
              setErrorHomes('DEBE INGRESAR MAS DE 1 HOGAR');
            }
          } else {
            setVisible(true);
          }
        }}
        buttonStyle={{backgroundColor: '#3B666F'}}
      />
      <Overlay
        isVisible={isVisible}
        borderRadius={10}
        animationType={'fade'}
        width={300}
        height={400}>
        <>
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 20}}>
            Se creara un proyecto con los siguientes valores
          </Text>
          <Input
            value={name}
            label="Representante del proyecto"
            leftIcon={<Icon name="person" size={24} color="black" />}
            containerStyle={{marginBottom: 20}}
            disabled={true}
          />
          <Input
            value={document}
            label="Cedula del representante"
            leftIcon={<Icon name="apps" size={24} color="black" />}
            containerStyle={{marginBottom: 20}}
            disabled={true}
          />
          <Input
            value={formatMoney.format(homes * 800000).toString()}
            label="Presupuesto del proyecto"
            leftIcon={<Icon name="monetization-on" size={24} color="black" />}
            containerStyle={{marginBottom: 20}}
            disabled={true}
          />
          <View
            style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              icon={<Icon name="check" size={15} color="white" />}
              title="Aceptar"
              onPress={async () => {
                const data = {
                  id: 0,
                  project_manager: name,
                  document: document,
                  homes: homes,
                  budget: 800000 * homes,
                  budget_used: 0,
                  data: [],
                };
                if (await AsyncStorageAPI.isNull('projectsData')) {
                  data.id = 1;
                  const newData = [];
                  newData.push(data);
                  await AsyncStorageAPI.setData('projectsData', newData);
                  setVisible(false);
                  navigation.navigate('Home');
                } else {
                  const oldData = await AsyncStorageAPI.getData('projectsData');
                  const lastElementId = await AsyncStorageAPI.lastElementId(
                    'projectsData',
                  );
                  data.id = lastElementId + 1;
                  oldData.push(data);
                  await AsyncStorageAPI.setData('projectsData', oldData);
                  setVisible(false);
                  navigation.navigate('Home');
                }
              }}
              buttonStyle={{backgroundColor: 'green'}}
            />
            <Button
              icon={<Icon name="clear" size={15} color="white" />}
              title="Cancelar"
              onPress={() => {
                setVisible(false);
              }}
              buttonStyle={{backgroundColor: 'red'}}
            />
          </View>
        </>
      </Overlay>
    </View>
  );
};

export default CreateHome;
