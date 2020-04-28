import React, {useState, useEffect} from 'react';
import {View, Image, Keyboard} from 'react-native';
//Libraries
import {Icon as IconRNE, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Utils
import AsyncStorageAPI from '../utils/AsyncStorageAPI';
//Components
import Loading from '../components/Loading';
//Images
import logo from '../images/logo.png';

const Login = ({navigation}) => {
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');
  const [document, setDocument] = useState('');
  const [errorDocument, setErrorDocument] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await AsyncStorageAPI.getUserData();
      if (response !== null) {
        setName(response.name);
        setDocument(response.document);
        setIsDisabled(true);
      }
      setIsLoading(false);
    }
    fetchData();
    return navigation.addListener('focus', () => {
      fetchData();
    });
  }, [navigation]);

  return isLoading ? (
    <Loading />
  ) : (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#025930',
      }}>
      <Image
        source={logo}
        style={{width: 200, height: 100, alignSelf: 'center'}}
        resizeMode="contain"
      />
      <View
        style={{
          backgroundColor: '#f2f2f2',
          marginHorizontal: 20,
          padding: 15,
          borderRadius: 20,
        }}>
        <Input
          value={name}
          label="Nombre del gestor"
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
          disabled={isDisabled}
        />
        <Input
          value={document}
          label="Cedula del gestor"
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
          disabled={isDisabled}
        />
        <IconRNE
          containerStyle={{alignSelf: 'center'}}
          raised
          reverse
          name="arrow-forward"
          type="MaterialIcons"
          color="#025930"
          size={20}
          onPress={async () => {
            Keyboard.dismiss();
            if (name === '') {
              setErrorName('INGRESE UN NOMBRE');
            } else if (document === '') {
              setErrorDocument('INGRESE UN DOCUMENTO');
            } else {
              const data = {
                name: name,
                document: document,
              };
              await AsyncStorageAPI.setUserData(data);
              navigation.navigate('Projects');
            }
          }}
        />
      </View>
    </View>
  );
};

export default Login;
