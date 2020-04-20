import React, {useState, useEffect} from 'react';
import {View, Alert, FlatList, ScrollView} from 'react-native';
//Libraries
import {Icon as IconRNE, ListItem, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FloatingAction} from 'react-native-floating-action';
//Utils
import NumberFormat from 'react-number-format';
import AsyncStorageAPI from '../utils/AsyncStorageAPI';
import ProjectData from '../utils/ProjectData';
//Components
import Loading from '../components/Loading';

const ProjectDetail = ({route, navigation}) => {
  const [data, setData] = useState({managers: [{}]});
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
      text: 'Sincronizar proyecto',
      color: '#3B666F',
      icon: <Icon name="backup" size={24} color="white" />,
      name: 'synchronize_project',
      position: 3,
    },
    {
      text: 'Eliminar proyecto',
      color: '#DC3545',
      icon: <Icon name="delete" size={24} color="white" />,
      name: 'delete_project',
      position: 4,
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
      <ScrollView>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Integrantes:
          </Text>
          {data.managers.map((item, i) => (
            <ListItem
              key={i}
              title={item.name}
              subtitle={item.document}
              bottomDivider
              leftIcon={
                <IconRNE
                  containerStyle={{alignSelf: 'center'}}
                  raised
                  reverse
                  name="person"
                  type="MaterialIcons"
                  color="#3B666F"
                  size={10}
                />
              }
            />
          ))}
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
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 20,
              alignItems: 'center',
            }}>
            <Icon
              name="backup"
              size={30}
              color={data.isSynchronized ? '#28A745' : '#DC3545'}
            />
            <Text style={{fontSize: 17, marginLeft: 15}}>
              {data.isSynchronized
                ? 'Proyecto sincronizado'
                : 'Proyecto no sincronizado'}
            </Text>
          </View>
        </View>
      </ScrollView>
      <FloatingAction
        actions={actions}
        color="#3B666F"
        onPressItem={name => {
          if (name === 'edit_project') {
            navigation.navigate('EditProject', {
              homes: data.managers,
              selectedValue: data.project_type,
              data: data,
            });
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
          if (name === 'synchronize_project') {
            if (data.isSynchronized) {
              Alert.alert(
                'ALERTA',
                'Este proyecto ya esta sincronizado',
                [
                  {
                    text: 'Aceptar',
                    style: 'OK',
                  },
                ],
                {cancelable: false},
              );
            } else {
              Alert.alert(
                'ALERTA',
                'Esta seguro de sincronizar este proyecto?',
                [
                  {
                    text: 'Cancelar',
                    style: 'cancel',
                  },
                  {
                    text: 'Sincronizar',
                    onPress: async () => {
                      const userData = await AsyncStorageAPI.getUserData();
                      const projectData = {
                        json: {
                          data: data,
                          nombre: userData.name,
                          documento: userData.document,
                        },
                      };
                      await ProjectData.post(projectData);
                      const newData = data;
                      newData.isSynchronized = true;
                      await AsyncStorageAPI.updateElement(newData.id, newData);
                      navigation.navigate('ProjectDetail', newData.id);
                    },
                    style: 'OK',
                  },
                ],
                {cancelable: false},
              );
            }
          }
        }}
      />
    </>
  );
};

export default ProjectDetail;
