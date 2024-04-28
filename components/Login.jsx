import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
  Image,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
// import Pie from 'react-native-pie';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = () => {
    setSpinner(true);
    axios
      .post('https://attendancebackend1-lbe1.onrender.com/auth/login', {
        email: username,
        password: password,
      })
      .then(response => {
        setSpinner(false);
        props.navigation.navigate('ChooseOption', {response: response.data});
      })
      .catch(err => {
        setSpinner(false);
        ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
        console.log(err, 'yash');
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#178ae7'}}>
      <Spinner visible={spinner} color="gray" />
      <KeyboardAvoidingView
        style={{
          justifyContent: 'center',
          backgroundColor: 'white',
          marginVertical: 'auto',
          marginHorizontal: 20,
          padding: 20,
          borderRadius: 10,
        }}>
        <TextInput
          style={{
            height: 50,
            borderWidth: 1,
            backgroundColor: 'white',
            paddingHorizontal: 10,
            fontSize: 20,
            marginVertical: 10,
            borderRadius: 10,
            color: 'black',
          }}
          placeholder="Enter your email"
          value={username}
          placeholderTextColor="grey"
          onChangeText={setUsername}
        />
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderRadius: 10,
            alignItems: 'center',
            marginVertical: 10,
            padding: 2,
          }}>
          <TextInput
            style={{
              height: 50,
              backgroundColor: 'white',
              paddingHorizontal: 10,
              fontSize: 20,
              width: '90%',
              color: 'black',
            }}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="grey"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              style={{
                height: 20,
                width: 20,
                marginLeft: 'auto',
                padding: 0,
              }}
              source={
                showPassword
                  ? require('../assets/eye-line.png')
                  : require('../assets/eye-off-line.png')
              }
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            paddingHorizontal: 80,
            paddingVertical: 10,
            backgroundColor: '#1f96f4',
            borderRadius: 10,
            marginTop: 20,
          }}
          onPress={loginHandler}>
          <Text style={{fontSize: 20, color: 'white'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignSelf: 'center', marginTop: 20}}
          onPress={() => props.navigation.navigate('Register')}>
          <Text style={{fontSize: 17, color: 'black'}}>
            New to app? Click to Register.
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
