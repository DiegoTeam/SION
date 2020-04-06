import React, {useState, useEffect} from 'react';
import {View, Alert, ActivityIndicator} from 'react-native';
//Libraries
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FloatingAction} from 'react-native-floating-action';
//Utils
import NumberFormat from 'react-number-format';
import AsyncStorageAPI from '../utils/AsyncStorageAPI';

const ProjectDetail = ({route, navigation}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const actions = [
    {
      text: 'Ver Insumos',
      color: '#3B666F',
      icon: <Icon name="remove-red-eye" size={24} color="white" />,
      name: 'see_supplies',
      position: 1,
    },
    {
      text: 'Editar proyecto',
      color: '#3B666F',
      icon: <Icon name="edit" size={24} color="white" />,
      name: 'edit_project',
      position: 2,
    },
    {
      text: 'Eliminar proyecto',
      color: '#CB3737',
      icon: <Icon name="delete" size={24} color="white" />,
      name: 'delete_project',
      position: 3,
    },
  ];
  useEffect(() => {
    navigation.setOptions({title: 'Detalle del proyecto'});
    async function fetchData() {
      setIsLoading(true);
      const response = await AsyncStorageAPI.getProject(route.params);
      setData(response);
      setIsLoading(false);
    }
    fetchData();
    return navigation.addListener('focus', () => {
      fetchData();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return isLoading ? (
    <View>
      {/*TODO crear indicardor de carga*/}
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <>
      <View style={{marginHorizontal: 20}}>
        <Input
          value={data.project_manager}
          label="Representante del proyecto"
          leftIcon={<Icon name="person" size={24} color="black" />}
          errorStyle={{color: 'red'}}
          containerStyle={{marginBottom: 20, marginTop: 20}}
          disabled={true}
        />
        <Input
          value={data.document}
          label="Cedula del representante"
          leftIcon={<Icon name="apps" size={24} color="black" />}
          containerStyle={{marginBottom: 20}}
          disabled={true}
        />
        <Input
          value={data.project_type}
          label="Tipo de proyecto"
          leftIcon={<Icon name="card-travel" size={24} color="black" />}
          keyboardType="number-pad"
          containerStyle={{marginBottom: 20}}
          disabled={true}
        />
        {/*<Input*/}
        {/*  value={data.homes.toString()}*/}
        {/*  label="Numero de hogares"*/}
        {/*  leftIcon={<Icon name="home" size={24} color="black" />}*/}
        {/*  keyboardType="number-pad"*/}
        {/*  containerStyle={{marginBottom: 20}}*/}
        {/*  disabled={true}*/}
        {/*/>*/}
        {/*TODO render del numero de hogares*/}
        <NumberFormat
          renderText={text => (
            <Input
              value={text}
              label="Presupuesto del proyecto"
              leftIcon={<Icon name="monetization-on" size={24} color="black" />}
              containerStyle={{marginBottom: 20}}
              disabled={true}
            />
          )}
          value={data.budget}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
        <NumberFormat
          renderText={text => (
            <Input
              value={text}
              label="Presupuesto gastado"
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
              label="Presupuesto disponible"
              leftIcon={<Icon name="monetization-on" size={24} color="black" />}
              containerStyle={{marginBottom: 20}}
              disabled={true}
            />
          )}
          value={data.budget_available}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </View>
      <FloatingAction
        actions={actions}
        color="#3B666F"
        onPressItem={name => {
          if (name === 'edit_project') {
            navigation.navigate('EditProject', data);
          }
          if (name === 'delete_project') {
            Alert.alert(
              'ALERTA',
              'Esta seguro de eliminar este proyecto?',
              [
                {
                  text: 'Cancelar',
                  style: 'cancel',
                },
                {
                  text: 'Eliminar',
                  onPress: async () => {
                    await AsyncStorageAPI.deleteElement(data.id);
                    navigation.navigate('Projects');
                  },
                },
              ],
              {cancelable: false},
            );
          }
          if (name === 'see_supplies') {
            navigation.navigate('Supplies', data.id);
          }
        }}
      />
    </>
  );
};

export default ProjectDetail;
