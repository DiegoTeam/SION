import React, {useState} from 'react';
import {View, Alert} from 'react-native';
//Libraries
import {Input, Icon, Icon as IconRNE} from 'react-native-elements';
//Utils
import AsyncStorageAPI from '../utils/AsyncStorageAPI';

const AddHomes = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');
  const [document, setDocument] = useState('');
  const [errorDocument, setErrorDocument] = useState('');
  return (
    <View style={{flex: 1, justifyContent: 'center', marginHorizontal: 20}}>
      <Input
        value={name}
        label="Nombre jefe del hogar"
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
      <IconRNE
        containerStyle={{alignSelf: 'center'}}
        raised
        reverse
        name="add"
        type="MaterialIcons"
        color="#3B666F"
        size={20}
        onPress={async () => {
          if (name === '' || document === '') {
            if (name === '') {
              setErrorName('INGRESE UN NOMBRE');
            }
            if (document === '') {
              setErrorDocument('INGRESE UNA CEDULA');
            }
          } else {
            const homes = route.params.homes;
            if (homes.some(element => element.document === document)) {
              Alert.alert(
                'Alerta',
                'Este proyecto ya tiene un integrate con la misma cedula',
                [{text: 'Acaptar'}],
                {cancelable: false},
              );
            } else {
              const allData = await AsyncStorageAPI.getData();
              if (allData === null) {
                homes.push({
                  name: name,
                  document: document,
                });
                navigation.navigate(route.params.route, {
                  homes: homes,
                  selectedValue: route.params.selectedValue,
                });
              } else {
                let find = false;
                for (let i = 0; i < allData.length; i++) {
                  for (let j = 0; j < allData[i].managers.length; j++) {
                    if (
                      allData[i].managers[j].document === document &&
                      allData[i].project_type === route.params.selectedValue
                    ) {
                      if (allData[i].homes === 1 && homes.length + 1 === 1) {
                        find = true;
                      }
                      if (allData[i].homes > 1 && homes.length + 1 > 1) {
                        find = true;
                      }
                    }
                  }
                }
                if (find) {
                  Alert.alert(
                    'Alerta',
                    'Esta cedula ya esta ingresada en un proyecto con las mismas caracteriasticas',
                    [{text: 'Acaptar'}],
                    {cancelable: false},
                  );
                } else {
                  homes.push({
                    name: name,
                    document: document,
                  });
                  navigation.navigate(route.params.route, {
                    homes: homes,
                    selectedValue: route.params.selectedValue,
                  });
                }
              }
            }
          }
        }}
      />
    </View>
  );
};

export default AddHomes;
