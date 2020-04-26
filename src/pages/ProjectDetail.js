import React, {useState, useEffect} from 'react';
import {View, Alert, ScrollView} from 'react-native';
//Libraries
import {Icon as IconRNE, ListItem, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FloatingAction} from 'react-native-floating-action';
//Utils
import NumberFormat from 'react-number-format';
import AsyncStorageAPI from '../utils/AsyncStorageAPI';
import ProjectData from '../utils/ProjectData';
import moment from 'moment';
//Components
import Loading from '../components/Loading';

const ProjectDetail = ({route, navigation}) => {
  const [data, setData] = useState({
    managers: [{}],
    specificObjectives: [],
    RepresentativeCouncil: {name: '', document: ''},
    RepresentativeCommittee: {name: '', document: ''},
    Official: {name: '', document: ''},
  });
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
    // {
    //   text: 'Eliminar proyecto',
    //   color: '#DC3545',
    //   icon: <Icon name="delete" size={24} color="white" />,
    //   name: 'delete_project',
    //   position: 4,
    // },
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
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Descripción del proyecto:
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Convenio:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.agreement}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Código:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.projectCode}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Fecha de elaboración:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {moment(data.createdAt).format('DD/MM/YYYY')}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Representante legal:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.legalRepresentative}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Nombre del proyecto:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.projectName}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Linea:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.line}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Duración:
          </Text>
          {data.duration === '1' ? (
            <Text
              style={{
                marginLeft: 30,
                marginBottom: 10,
                fontWeight: 'bold',
                fontSize: 17,
              }}>
              {data.duration} Mes
            </Text>
          ) : (
            <Text
              style={{
                marginLeft: 30,
                marginBottom: 10,
                fontWeight: 'bold',
                fontSize: 17,
              }}>
              {data.duration} Meses
            </Text>
          )}
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Ubicación del proyecto:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.projectLocation}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Producto/Servicio:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.productService}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Problema:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.problem}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Justificación:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.justification}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Criterios Socioculturales y técnicos:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.criterion}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Objetivo General:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.objective}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Objetivos Especificos:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Objetivo 1:
          </Text>
          <Text
            style={{
              marginLeft: 60,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.specificObjectives[0]}
          </Text>
          {data.specificObjectives[1] !== '' && (
            <>
              <Text
                style={{
                  marginLeft: 30,
                  marginTop: 10,
                  marginBottom: 10,
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#88959E',
                }}>
                Objetivo 2:
              </Text>
              <Text
                style={{
                  marginLeft: 60,
                  marginBottom: 10,
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>
                {data.specificObjectives[1]}
              </Text>
            </>
          )}
          {data.specificObjectives[2] !== '' && (
            <>
              <Text
                style={{
                  marginLeft: 30,
                  marginTop: 10,
                  marginBottom: 10,
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#88959E',
                }}>
                Objetivo 3:
              </Text>
              <Text
                style={{
                  marginLeft: 60,
                  marginBottom: 10,
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>
                {data.specificObjectives[2]}
              </Text>
            </>
          )}
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Conservación y manejo ambiental:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.environmentalManagement}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Sustentabilidad:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.sustainability}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Riesgos y Acciones de tratamiento:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.risks}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Concepto Técnico socio/operador/Contratista
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.technicalConcept}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Representante del consejo/cabildo:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Nombre:
          </Text>
          <Text
            style={{
              marginLeft: 60,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.RepresentativeCouncil.name}
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Cedula:
          </Text>
          <Text
            style={{
              marginLeft: 60,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.RepresentativeCouncil.document}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Representante del comité de control social:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Nombre:
          </Text>
          <Text
            style={{
              marginLeft: 60,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.RepresentativeCommittee.name}
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Cedula:
          </Text>
          <Text
            style={{
              marginLeft: 60,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.RepresentativeCommittee.document}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Funcionario entidad implementadora:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Nombre:
          </Text>
          <Text
            style={{
              marginLeft: 60,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.Official.name}
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Cedula:
          </Text>
          <Text
            style={{
              marginLeft: 60,
              marginBottom: 40,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {data.Official.document}
          </Text>
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
