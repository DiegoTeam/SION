import React, {useEffect, useState} from 'react';
//Libraries
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
//Pages
import Login from './Login';
import Projects from './Projects';
import CreateProject from './CreateProject';
import AddHomes from './AddHome';
import ProjectDetail from './ProjectDetail';
import EditProject from './EditProject';
import Supplies from './Supplies';
import AddSupplies from './AddSupplies';
import EditSupplies from './EditSupplies';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Projects"
          component={Projects}
          options={{
            title: 'Proyectos',
            headerLeft: null,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#3B666F',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="CreateProject"
          component={CreateProject}
          options={{
            title: 'Crear proyecto',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#3B666F',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AddHomes"
          component={AddHomes}
          options={{
            title: 'Agregar Hogar',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#3B666F',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ProjectDetail"
          component={ProjectDetail}
          options={{
            title: 'Detalles del proyecto',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#3B666F',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="EditProject"
          component={EditProject}
          options={{
            title: 'Editar proyecto',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#3B666F',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Supplies"
          component={Supplies}
          options={{
            title: 'Insumos',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#3B666F',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AddSupplies"
          component={AddSupplies}
          options={{
            title: 'Agregar insumo',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#3B666F',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="EditSupplies"
          component={EditSupplies}
          options={{
            title: 'Editar insumo',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#3B666F',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
