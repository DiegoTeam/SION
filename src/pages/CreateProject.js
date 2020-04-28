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

const CreateProject = ({navigation, route}) => {
  const [homes, setHomes] = useState(route.params.homes);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    route.params.selectedValue,
  );
  const [agreement, setAgreement] = useState('187-2019');
  const [error, setError] = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [createdAt, setCreatedAt] = useState(moment.now());
  const [showDate, setShowDate] = useState(false);
  const [legalRepresentative, setLegalRepresentative] = useState('');
  const [projectName, setProjectName] = useState('');
  const [line, setLine] = useState('');
  const [duration, setDuration] = useState('1');
  const [projectLocation, setProjectLocation] = useState('');
  const [productService, setProductService] = useState('');
  const [problem, setProblem] = useState('');
  const [justification, setJustification] = useState('');
  const [criterion, setCriterion] = useState('');
  const [objective, setObjective] = useState('');
  const [objective1, setObjective1] = useState('');
  const [objective2, setObjective2] = useState('');
  const [objective3, setObjective3] = useState('');
  const [environmentalManagement, setEnvironmentalManagement] = useState('');
  const [sustainability, setSustainability] = useState('');
  const [risks, setRisks] = useState('');
  const [technicalConcept, setTechnicalConcept] = useState('');
  const [nameRepresentativeCouncil, setNameRepresentativeCouncil] = useState(
    '',
  );
  const [
    documentRepresentativeCouncil,
    setDocumentRepresentativeCouncil,
  ] = useState('');
  const [
    nameRepresentativeCommittee,
    setNameRepresentativeCommittee,
  ] = useState('');
  const [
    documentRepresentativeCommittee,
    setDocumentRepresentativeCommittee,
  ] = useState('');
  const [nameOfficial, setNameOfficial] = useState('');
  const [documentOfficial, setDocumentOfficial] = useState('');
  const budget_base_a = 800000;
  const budget_base_p = 1750000;
  const budget_base_f = 180000;
  const [budgetBase, setBudgetBase] = useState(() => {
    if (selectedValue === 'Productivo') {
      return budget_base_p;
    } else if (selectedValue === 'Alimentario') {
      return budget_base_a;
    } else {
      return budget_base_f;
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
                }
              }}>
              <Picker.Item label="Productivo" value="Productivo" />
              <Picker.Item label="Alimentario" value="Alimentario" />
              <Picker.Item label="Fortalecimiento" value="Fortalecimiento" />
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
                  route: 'CreateProject',
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
                      color="#025930"
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
              <ListItem title={'No hay hogares en este proyecto'} />
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
                color="#025930"
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
          <Input
            value={technicalConcept}
            label="Concepto técnico socio/operador/contratista"
            onChangeText={text => {
              setTechnicalConcept(text);
            }}
            errorStyle={{color: '#DC3545'}}
            errorMessage={error}
            containerStyle={{marginBottom: 20}}
          />
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
            label="Nombre funcionario entidad implementadora:"
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
            color="#025930"
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
                technicalConcept === '' ||
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
                  technicalConcept === '' ||
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
                setIsVisible(true);
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
              name="check"
              type="MaterialIcons"
              color="#28A745"
              size={20}
              onPress={async () => {
                const data = {
                  id: 0,
                  creationDate: moment(),
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
                  technicalConcept: technicalConcept,
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
                if (await AsyncStorageAPI.isNull()) {
                  data.id = 1;
                  const newData = [];
                  newData.push(data);
                  await AsyncStorageAPI.setData(newData);
                  setIsVisible(false);
                  navigation.navigate('Projects');
                } else {
                  const oldData = await AsyncStorageAPI.getData();
                  const lastElementId = await AsyncStorageAPI.lastElementId();
                  data.id = lastElementId + 1;
                  oldData.push(data);
                  await AsyncStorageAPI.setData(oldData);
                  setIsVisible(false);
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
