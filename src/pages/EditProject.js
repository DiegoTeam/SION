import React, {useState, useEffect} from 'react';
import {View, Picker, FlatList, Alert} from 'react-native';
//Libraries
import {Text, Icon as IconRNE, ListItem, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Components
import Empty from '../components/Empty';
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

  useEffect(() => {
    console.log(route.params);
  }, [route]);

  const renderHomes = ({item}) => (
    <ListItem
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
            const newHomes = homes.filter(element => element !== item);
            setHomes(newHomes);
          }}
        />
      }
    />
  );

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', marginHorizontal: 20}}>
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
                route: 'EditProject',
              });
            }}
          />
          <Text>Agregar hogar</Text>
        </View>
        <FlatList
          data={homes}
          renderItem={renderHomes}
          ListEmptyComponent={
            <Empty text="No hay hogares agregados a este proyecto" />
          }
          keyExtractor={item => item.document.toString()}
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
            if (homes.length === 0) {
              Alert.alert(
                'Alerta',
                'Debe agregar almenos un hogar para este proyecto',
                [{text: 'Aceptar'}],
                {cancelable: false},
              );
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
                    id: data.id,
                    isSynchronized: false,
                    managers: homes,
                    project_type: selectedValue,
                    homes: homes.length,
                    budget: budgetBase * homes.length,
                    budget_used: 0,
                    budget_available: budgetBase * homes.length,
                    supplies: [],
                  };
                  await AsyncStorageAPI.updateElement(data.id, newData);
                } else {
                  const newData = {
                    id: data.id,
                    isSynchronized: false,
                    managers: homes,
                    project_type: selectedValue,
                    homes: homes.length,
                    budget: budgetBase * homes.length,
                    budget_used: data.budget_used,
                    budget_available:
                      budgetBase * homes.length - data.budget_used,
                    supplies: data.supplies,
                  };
                  await AsyncStorageAPI.updateElement(data.id, newData);
                }
                setIsVisible(false);
                navigation.navigate('ProjectDetail', data.id);
              }}
            />
          </View>
        </View>
      </Overlay>
    </>
  );
};

export default EditProject;
