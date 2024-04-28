import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

const ChooseOptionScreen = props => {
  const {response} = props.route.params;
  const userType = response.foundStudent ? 'Student' : 'Teacher';
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#178ae7', justifyContent: 'center'}}>
      <View style={{alignItems: 'center'}}>
        {userType === 'Teacher' && (
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 20,
              borderWidth: 1,
              margin: 10,
            }}
            onPress={() =>
              props.navigation.navigate('AttendanceScreen', {
                mode: 'edit',
                response,
              })
            }>
            <Text style={{fontSize: 20, color: 'black'}}>Mark Attendance</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 20,
            borderWidth: 1,
            margin: 10,
          }}
          onPress={() =>
            props.navigation.navigate('AttendanceScreen', {
              mode: 'view',
              response,
            })
          }>
          <Text style={{fontSize: 20, color: 'black'}}>View Attendance</Text>
        </TouchableOpacity>
        {userType === 'Teacher' && (
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 20,
              borderWidth: 1,
              margin: 10,
            }}
            onPress={() => props.navigation.navigate('ShowReports')}>
            <Text style={{fontSize: 20, color: 'black'}}>View Reports</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChooseOptionScreen;
