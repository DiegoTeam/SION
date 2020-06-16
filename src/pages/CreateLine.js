import React, {useState, useEffect} from 'react';
//Libraries
import {View, Text} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import NumberFormat from 'react-number-format';

const CreateLine = ({navigation, route}) => {
  useEffect(() => {
    console.log(route.params);
  });
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');
  const [homes, setHomes] = useState('1');
  const [errorHomes, setErrorHomes] = useState('');
  const budget_base_a = 800000;
  const budget_base_p = 1750000;
  const budget_base_f = 180000;
  const budget_base_f_c = 0;
  const [budgetBase, setBudgetBase] = useState(() => {
    if (route.params.selectedValue === 'Productivo') {
      return budget_base_p;
    } else if (route.params.selectedValue === 'Alimentario') {
      return budget_base_a;
    } else if (route.params.selectedValue === 'Fortalecimiento') {
      return budget_base_f;
    } else {
      return budget_base_f_c;
    }
  });
  return (
    <View style={{flex: 1, justifyContent: 'center', marginHorizontal: 20}}>
      <Input
        value={name}
        label="Nombre:"
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
        value={homes}
        label="Hogares:"
        keyboardType="numeric"
        onChangeText={text => {
          if (errorHomes !== '') {
            setErrorHomes('');
          }
          setHomes(text.replace(/[,.-]/g, '').trim());
        }}
        errorStyle={{color: '#DC3545'}}
        errorMessage={errorHomes}
        containerStyle={{marginBottom: 20}}
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
              Presupuesto IRACA para esta linea:
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
        value={homes * budgetBase}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
      <Icon
        containerStyle={{alignSelf: 'center'}}
        raised
        reverse
        name="add"
        type="MaterialIcons"
        color="#3B666F"
        size={20}
        onPress={() => {
          if (homes === '' || homes === '0' || name === '') {
            if (homes === '') {
              setErrorHomes('* Campo obligatorio');
            }
            if (homes === '0') {
              setErrorHomes('No puede ser 0');
            }
            if (name === '') {
              setErrorName('* Campo obligatorio');
            }
          } else {
            let found = false;
            route.params.lines.forEach(e => {
              if (e.name === name) {
                found = true;
              }
            });
            if (found) {
              setErrorName(
                'Ya existe una línea con este nombre asignada a este proyecto',
              );
            } else {
              route.params.lines.push({
                name: name,
                homes: homes,
                budgetIRACA: budgetBase * homes,
                budgetIRACAUsed: 0,
                budgetIRACAAvailable: budgetBase * homes,
                supplies: [],
              });
              if (route.params.selectedValue === 'CreateProject') {
                navigation.navigate(route.params.route, {
                  lines: route.params.lines,
                  selectedValue: route.params.selectedValue,
                });
              } else {
                navigation.navigate(route.params.route, {
                  selectedValue: route.params.selectedValue,
                  data: route.params.data,
                  index: route.params.index,
                  lines: route.params.lines,
                });
              }
            }
          }
        }}
      />
    </View>
  );
};

export default CreateLine;
