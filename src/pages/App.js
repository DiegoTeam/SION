import React from 'react';
//Libraries
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//Pages
import Home from './Home';
import CreateProject from './CreateProject';
import ProjectDetail from './ProjectDetail';
import Supplies_IP from './Supplies_IP';
import Supplies_IA from './Supplies_IA';
import AddSupplies_IP from './AddSupplies_IP';
import AddSupplies_IA from './AddSupplies_IA';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateProject" component={CreateProject} />
        <Stack.Screen name="ProjectDetail" component={ProjectDetail} />
        <Stack.Screen name="Supplies_IP" component={Supplies_IP} />
        <Stack.Screen name="Supplies_IA" component={Supplies_IA} />
        <Stack.Screen name="AddSupplies_IP" component={AddSupplies_IP} />
        <Stack.Screen name="AddSupplies_IA" component={AddSupplies_IA} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
