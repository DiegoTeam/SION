import React, {useState} from 'react';
import {View} from 'react-native';
//Libraries
import {Button, Input, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateHome = ({navigation}) => {
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');
  const [document, setDocument] = useState('');
  const [errorDocument, setErrorDocument] = useState('');
  const [checked, setChecked] = useState(false);
  const [homes, setHomes] = useState(1);
  const [errorHomes, setErrorHomes] = useState('');
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
            //TODO guardar en data
            console.log('ALL OK');
          }
        }}
        buttonStyle={{backgroundColor: '#3B666F'}}
      />
    </View>
  );
};

export default CreateHome;
