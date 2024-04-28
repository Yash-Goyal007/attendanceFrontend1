import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from './Login';
import AttendanceScreen from './AttendanceScreen';
import AttendanceList from './AttendanceList';
import Register from './Register';
import AddSubject from './AddSubject';
import ChooseOptionScreen from './ChooseOptionScreen';
import ReportScreen from './ReportScreen';
import ShowReports from './ShowReports';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerStyle: {backgroundColor: '#178ae7'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="AttendanceScreen"
          component={AttendanceScreen}
          options={{
            headerStyle: {backgroundColor: '#178ae7'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="AttendanceList"
          component={AttendanceList}
          options={{
            headerStyle: {backgroundColor: '#178ae7'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerStyle: {backgroundColor: '#178ae7'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="AddSubject"
          component={AddSubject}
          options={{
            headerStyle: {backgroundColor: '#178ae7'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="ChooseOption"
          component={ChooseOptionScreen}
          options={{
            headerStyle: {backgroundColor: '#178ae7'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Report"
          component={ReportScreen}
          options={{
            headerStyle: {backgroundColor: '#178ae7'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="ShowReports"
          component={ShowReports}
          options={{
            headerStyle: {backgroundColor: '#178ae7'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
