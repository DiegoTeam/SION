import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
//Libraries
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
//Utils
import formatMoney from '../utils/formatMoney';

const ProjectDetail = ({route, navigation}) => {
  const [data, setData] = useState(route.params);
  useEffect(() => {
    navigation.setOptions({title: data.project_manager});
  });
  return (
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
          value={data.homes.toString()}
          label="Numero de hogares"
          leftIcon={<Icon name="home" size={24} color="black" />}
          keyboardType="number-pad"
          containerStyle={{marginBottom: 20}}
          disabled={true}
        />
        <Input
          value={formatMoney.format(data.budget).toString()}
          label="Presupuesto del proyecto"
          leftIcon={<Icon name="monetization-on" size={24} color="black" />}
          containerStyle={{marginBottom: 20}}
          disabled={true}
        />
        <Input
          value={formatMoney.format(data.budget_used).toString()}
          label="Presupuesto gastado"
          leftIcon={<Icon name="monetization-on" size={24} color="black" />}
          containerStyle={{marginBottom: 20}}
          disabled={true}
        />
        <Input
          value={formatMoney.format(data.budget_available).toString()}
          label="Presupuesto disponible"
          leftIcon={<Icon name="monetization-on" size={24} color="black" />}
          containerStyle={{marginBottom: 20}}
          disabled={true}
        />
        <Button
          icon={<Icon name="remove-red-eye" size={15} color="white" />}
          title=" Ver insumos"
          buttonStyle={{backgroundColor: '#3B666F'}}
          onPress={() => {
            navigation.navigate('Supplies', data);
          }}
        />
      </View>
      <ActionButton
        renderIcon={() => {
          return <Icon name="build" size={15} color="white" />;
        }}
        buttonColor="#3B666F"
        onPress={() => {
          console.log('config');
          //TODO configurar boton
        }}
      />
    </>
  );
};

export default ProjectDetail;
