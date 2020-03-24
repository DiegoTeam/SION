import React from 'react';
//Libraries
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//Pages
import Home from './Home';
import CreateProject from './CreateProject';
import ProjectDetail from './ProjectDetail';
import Supplies from './Supplies';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateProject" component={CreateProject} />
        <Stack.Screen name="ProjectDetail" component={ProjectDetail} />
        <Stack.Screen name="Supplies" component={Supplies} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
