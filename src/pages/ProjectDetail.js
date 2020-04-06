import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
//Libraries
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FloatingAction} from 'react-native-floating-action';
//Utils
import NumberFormat from 'react-number-format';
import AsyncStorageAPI from '../utils/AsyncStorageAPI';
//Components
import Loading from '../components/Loading';

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
      color: '#DC3545',
      icon: <Icon name="delete" size={24} color="white" />,
      name: 'delete_project',
      position: 3,
    },
  ];
  useEffect(() => {
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
    <Loading />
  ) : (
    <>
      <View style={{marginHorizontal: 20, marginTop: 20}}>
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
          <Text style={{fontSize: 17, marginLeft: 15}}>
            {data.project_manager}
          </Text>
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
          <Text style={{fontSize: 17, marginLeft: 15}}>{data.document}</Text>
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
          <Text style={{fontSize: 17, marginLeft: 15}}>
            {data.project_type}
          </Text>
        </View>
        <Text
          style={{
            marginLeft: 10,
            marginTop: 10,
            fontWeight: 'bold',
            fontSize: 17,
            color: '#88959E',
          }}>
          Numero de hogares:
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Icon name="home" size={30} color="black" />
          <Text style={{fontSize: 17, marginLeft: 15}}>{data.homes}</Text>
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
          value={data.budget}
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
                Presupuesto gastado:
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
          value={data.budget_used}
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
                Presupuesto disponible:
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
                  style: 'OK',
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
