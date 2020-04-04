import React from 'react';
//Libraries
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//Pages
import Projects from './Projects';
import CreateProject from './CreateProject';
import ProjectDetail from './ProjectDetail';
import EditProject from './EditProject';
import Supplies from './Supplies';
import AddSupplies from './AddSupplies';
import EditSupplies from './EditSupplies';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Projects" component={Projects} />
        <Stack.Screen name="CreateProject" component={CreateProject} />
        <Stack.Screen name="ProjectDetail" component={ProjectDetail} />
        <Stack.Screen name="EditProject" component={EditProject} />
        <Stack.Screen name="Supplies" component={Supplies} />
        <Stack.Screen name="AddSupplies" component={AddSupplies} />
        <Stack.Screen name="EditSupplies" component={EditSupplies} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
