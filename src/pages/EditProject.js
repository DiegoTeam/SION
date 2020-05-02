import React, {useState} from 'react';
import {View, Picker, Alert, Platform, ScrollView} from 'react-native';
//Libraries
import {
  Text,
  Icon as IconRNE,
  ListItem,
  Overlay,
  Input,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
//Utils
import AsyncStorageAPI from '../utils/AsyncStorageAPI';
import NumberFormat from 'react-number-format';

const EditProject = ({navigation, route}) => {
  const [homes, setHomes] = useState(route.params.homes);
  const [isVisible, setIsVisible] = useState(false);
  const data = route.params.data;
  const [selectedValue, setSelectedValue] = useState(
    route.params.selectedValue,
  );
  const [agreement, setAgreement] = useState(data.agreement);
  const [error, setError] = useState('');
  const [projectCode, setProjectCode] = useState(data.projectCode);
  const [createdAt, setCreatedAt] = useState(data.createdAt);
  const [showDate, setShowDate] = useState(false);
  const [legalRepresentative, setLegalRepresentative] = useState(
    data.legalRepresentative,
  );
  const [projectName, setProjectName] = useState(data.projectName);
  const [line, setLine] = useState(data.line);
  const [duration, setDuration] = useState(data.duration);
  const [projectLocation, setProjectLocation] = useState(data.projectLocation);
  const [productService, setProductService] = useState(data.productService);
  const [problem, setProblem] = useState(data.problem);
  const [justification, setJustification] = useState(data.justification);
  const [criterion, setCriterion] = useState(data.criterion);
  const [objective, setObjective] = useState(data.objective);
  const [objective1, setObjective1] = useState(data.specificObjectives[0]);
  const [objective2, setObjective2] = useState(data.specificObjectives[1]);
  const [objective3, setObjective3] = useState(data.specificObjectives[2]);
  const [environmentalManagement, setEnvironmentalManagement] = useState(
    data.environmentalManagement,
  );
  const [sustainability, setSustainability] = useState(data.sustainability);
  const [risks, setRisks] = useState(data.risks);
  const [nameRepresentativeCouncil, setNameRepresentativeCouncil] = useState(
    data.RepresentativeCouncil.name,
  );
  const [
    documentRepresentativeCouncil,
    setDocumentRepresentativeCouncil,
  ] = useState(data.RepresentativeCouncil.document);
  const [
    nameRepresentativeCommittee,
    setNameRepresentativeCommittee,
  ] = useState(data.RepresentativeCommittee.name);
  const [
    documentRepresentativeCommittee,
    setDocumentRepresentativeCommittee,
  ] = useState(data.RepresentativeCommittee.document);
  const [nameOfficial, setNameOfficial] = useState(data.Official.name);
  const [documentOfficial, setDocumentOfficial] = useState(
    data.Official.document,
  );
  const budget_base_a = 800000;
  const budget_base_p = 1750000;
  const budget_base_f = 180000;
  const budget_base_f_c = 0;
  const [budgetBase, setBudgetBase] = useState(() => {
    if (selectedValue === 'Productivo') {
      return budget_base_p;
    } else if (selectedValue === 'Alimentario') {
      return budget_base_a;
    } else if (selectedValue === 'Fortalecimiento') {
      return budget_base_f;
    } else {
      return budget_base_f_c;
    }
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || createdAt;
    setShowDate(Platform.OS === 'ios');
    setCreatedAt(currentDate);
  };

  return (
    <>
      <ScrollView>
        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              marginBottom: 10,
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
                } else if (itemValue === 'Financiacion complementaria') {
                  setBudgetBase(budget_base_f_c);
                }
              }}>
              <Picker.Item label="Productivo" value="Productivo" />
              <Picker.Item label="Alimentario" value="Alimentario" />
              <Picker.Item label="Fortalecimiento" value="Fortalecimiento" />
              <Picker.Item
                label="Financiacion complementaria"
                value="Financiacion complementaria"
              />
            </Picker>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <IconRNE
              containerStyle={{alignSelf: 'center'}}
              raised
              reverse
              name="add"
              type="MaterialIcons"
              color="#28A745"
              size={15}
              onPress={() => {
                navigation.navigate('AddHomes', {
                  selectedValue: selectedValue,
                  homes: homes,
                  route: 'EditProject',
                });
              }}
            />
            <Text>Agregar hogar</Text>
          </View>
          <View style={{marginHorizontal: 10, marginBottom: 20}}>
            {homes.length > 0 ? (
              homes.map((item, i) => (
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
                  rightIcon={
                    <IconRNE
                      containerStyle={{alignSelf: 'center'}}
                      raised
                      reverse
                      name="clear"
                      type="MaterialIcons"
                      color="#DC3545"
                      size={10}
                      onPress={() => {
                        const newHomes = homes.filter(
                          element => element !== item,
                        );
                        setHomes(newHomes);
                      }}
                    />
                  }
                />
              ))
            ) : (
              <ListItem title={'No hay hogares agregados a este proyecto'} />
            )}
          </View>
          <Input
            value={agreement}
            label="Convenio:"
            onChangeText={text => {
              setAgreement(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
            editable={false}
          />
          <Input
            value={projectCode}
            label="Código del proyecto:"
            onChangeText={text => {
              setProjectCode(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <View
            style={{
              marginBottom: 10,
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
              Fecha de elaboración:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginBottom: 10,
              }}>
              <Text style={{fontSize: 17}}>
                {moment(createdAt).format('DD/MM/YYYY')}
              </Text>
              <IconRNE
                containerStyle={{alignSelf: 'center'}}
                raised
                reverse
                name="date-range"
                type="MaterialIcons"
                color="#3B666F"
                size={15}
                onPress={() => {
                  setShowDate(true);
                }}
              />
            </View>
            {showDate && (
              <DateTimePicker
                value={createdAt}
                mode="default"
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          <Input
            value={legalRepresentative}
            label="Nombre representante legal/Gobernador:"
            onChangeText={text => {
              setLegalRepresentative(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={projectName}
            label="Nombre del proyecto:"
            onChangeText={text => {
              setProjectName(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={line}
            label="Linea:"
            onChangeText={text => {
              setLine(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <View
            style={{
              marginBottom: 10,
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
              Duración:
            </Text>
            <Picker
              selectedValue={duration}
              style={{marginLeft: 10}}
              onValueChange={(itemValue, itemIndex) => {
                setDuration(itemValue);
              }}>
              <Picker.Item label="1 mes" value="1" />
              <Picker.Item label="2 meses" value="2" />
              <Picker.Item label="3 meses" value="3" />
              <Picker.Item label="4 meses" value="4" />
              <Picker.Item label="5 meses" value="5" />
              <Picker.Item label="6 meses" value="6" />
              <Picker.Item label="7 meses" value="7" />
              <Picker.Item label="8 meses" value="8" />
              <Picker.Item label="9 meses" value="9" />
              <Picker.Item label="10 meses" value="10" />
              <Picker.Item label="11 meses" value="11" />
              <Picker.Item label="12 meses" value="12" />
            </Picker>
          </View>
          <Input
            value={projectLocation}
            label="Ubicación del proyecto:"
            onChangeText={text => {
              setProjectLocation(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={productService}
            label="Producto/Servicio:"
            onChangeText={text => {
              setProductService(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={problem}
            label="Problema:"
            onChangeText={text => {
              setProblem(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={justification}
            label="Justificación:"
            onChangeText={text => {
              setJustification(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={criterion}
            label="Criterios Socioculturales y técnicos:"
            onChangeText={text => {
              setCriterion(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={objective}
            label="Objetivo general:"
            onChangeText={text => {
              setObjective(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={objective1}
            label="Objetivo especifico #1:"
            onChangeText={text => {
              setObjective1(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={objective2}
            label="Objetivo especifico #2:"
            onChangeText={text => {
              setObjective2(text);
            }}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={objective3}
            label="Objetivo especifico #3:"
            onChangeText={text => {
              setObjective3(text);
            }}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={environmentalManagement}
            label="Conservación y manejo ambiental:"
            onChangeText={text => {
              setEnvironmentalManagement(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={sustainability}
            label="Sustentabilidad:"
            onChangeText={text => {
              setSustainability(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={risks}
            label="Riesgos y acciones de tratamiento:"
            onChangeText={text => {
              setRisks(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          {/*TODO articulacion*/}
          {/*TODO anexo*/}
          <Input
            value={nameRepresentativeCommittee}
            label="Nombre del representante del consejo/cabildo:"
            onChangeText={text => {
              setNameRepresentativeCommittee(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={documentRepresentativeCommittee}
            label="Cedula del representante del consejo/cabildo:"
            keyboardType="numeric"
            onChangeText={text => {
              setDocumentRepresentativeCommittee(
                text.replace(/[,.-]/g, '').trim(),
              );
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={nameRepresentativeCouncil}
            label="Nombre del representante del comité de control social:"
            onChangeText={text => {
              setNameRepresentativeCouncil(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={documentRepresentativeCouncil}
            label="Cedula del representante del comité de control social:"
            keyboardType="numeric"
            onChangeText={text => {
              setDocumentRepresentativeCouncil(
                text.replace(/[,.-]/g, '').trim(),
              );
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={nameOfficial}
            label="Nombre funcionario entidad implementadora"
            onChangeText={text => {
              setNameOfficial(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <Input
            value={documentOfficial}
            label="Cedula funcionario entidad implementadora:"
            keyboardType="numeric"
            onChangeText={text => {
              setDocumentOfficial(text.replace(/[,.-]/g, '').trim());
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
          <IconRNE
            containerStyle={{alignSelf: 'center', marginBottom: 10}}
            raised
            reverse
            name="save"
            type="MaterialIcons"
            color="#3B666F"
            size={20}
            onPress={() => {
              // TODO Optimizar
              if (
                homes.length === 0 ||
                agreement === '' ||
                projectCode === '' ||
                createdAt === '' ||
                legalRepresentative === '' ||
                projectName === '' ||
                duration === '' ||
                productService === '' ||
                problem === '' ||
                justification === '' ||
                criterion === '' ||
                objective === '' ||
                objective1 === '' ||
                environmentalManagement === '' ||
                sustainability === '' ||
                risks === '' ||
                nameRepresentativeCouncil === '' ||
                documentRepresentativeCouncil === '' ||
                nameRepresentativeCommittee === '' ||
                documentRepresentativeCommittee === '' ||
                nameOfficial === '' ||
                documentOfficial === ''
              ) {
                if (homes.length === 0) {
                  Alert.alert(
                    'Alerta',
                    'Debe agregar al menos un hogar para este proyecto',
                    [{text: 'Aceptar'}],
                    {cancelable: false},
                  );
                  setError('');
                }
                if (
                  agreement === '' ||
                  projectCode === '' ||
                  createdAt === '' ||
                  legalRepresentative === '' ||
                  projectName === '' ||
                  duration === '' ||
                  productService === '' ||
                  problem === '' ||
                  justification === '' ||
                  criterion === '' ||
                  objective === '' ||
                  objective1 === '' ||
                  environmentalManagement === '' ||
                  sustainability === '' ||
                  risks === '' ||
                  nameRepresentativeCouncil === '' ||
                  documentRepresentativeCouncil === '' ||
                  nameRepresentativeCommittee === '' ||
                  documentRepresentativeCommittee === '' ||
                  nameOfficial === '' ||
                  documentOfficial === ''
                ) {
                  Alert.alert(
                    'Alerta',
                    'Hay campos obligatorios sin diligenciar',
                    [{text: 'Aceptar'}],
                    {cancelable: false},
                  );
                  setError('* Campo obligatorio');
                }
              } else {
                const new_budget = budgetBase * homes.length;
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
                          onPress: () => setIsVisible(true),
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
                    setIsVisible(true);
                  }
                }
              }
            }}
          />
        </View>
      </ScrollView>
      <Overlay
        isVisible={isVisible}
        borderRadius={10}
        animationType={'fade'}
        width={320}
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
            value={homes.length * budgetBase}
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
                setIsVisible(false);
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
                    creationDate: data.creationDate,
                    isSynchronized: false,
                    managers: homes,
                    project_type: selectedValue,
                    homes: homes.length,
                    agreement: agreement,
                    projectCode: projectCode,
                    createdAt: createdAt,
                    legalRepresentative: legalRepresentative,
                    projectName: projectName,
                    line: line,
                    duration: duration,
                    projectLocation: projectLocation,
                    productService: productService,
                    problem: problem,
                    justification: justification,
                    criterion: criterion,
                    objective: objective,
                    specificObjectives: [objective1, objective2, objective3],
                    environmentalManagement: environmentalManagement,
                    sustainability: sustainability,
                    risks: risks,
                    RepresentativeCouncil: {
                      name: nameRepresentativeCouncil,
                      document: documentRepresentativeCouncil,
                    },
                    RepresentativeCommittee: {
                      name: nameRepresentativeCommittee,
                      document: documentRepresentativeCommittee,
                    },
                    Official: {
                      name: nameOfficial,
                      document: documentOfficial,
                    },
                    budget: budgetBase * homes.length,
                    budget_used: 0,
                    budget_available: budgetBase * homes.length,
                    supplies: [],
                  };
                  await AsyncStorageAPI.updateElement(
                    route.params.index,
                    newData,
                  );
                } else {
                  const newData = {
                    creationDate: data.creationDate,
                    isSynchronized: false,
                    managers: homes,
                    project_type: selectedValue,
                    homes: homes.length,
                    agreement: agreement,
                    projectCode: projectCode,
                    createdAt: createdAt,
                    legalRepresentative: legalRepresentative,
                    projectName: projectName,
                    line: line,
                    duration: duration,
                    projectLocation: projectLocation,
                    productService: productService,
                    problem: problem,
                    justification: justification,
                    criterion: criterion,
                    objective: objective,
                    specificObjectives: [objective1, objective2, objective3],
                    environmentalManagement: environmentalManagement,
                    sustainability: sustainability,
                    risks: risks,
                    RepresentativeCouncil: {
                      name: nameRepresentativeCouncil,
                      document: documentRepresentativeCouncil,
                    },
                    RepresentativeCommittee: {
                      name: nameRepresentativeCommittee,
                      document: documentRepresentativeCommittee,
                    },
                    Official: {
                      name: nameOfficial,
                      document: documentOfficial,
                    },
                    budget: budgetBase * homes.length,
                    budget_used: data.budget_used,
                    budget_available:
                      budgetBase * homes.length - data.budget_used,
                    supplies: data.supplies,
                  };
                  await AsyncStorageAPI.updateElement(
                    route.params.index,
                    newData,
                  );
                }
                setIsVisible(false);
                navigation.navigate('ProjectDetail', route.params.index);
              }}
            />
          </View>
        </View>
      </Overlay>
    </>
  );
};

export default EditProject;
