import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  ToastAndroid,
} from 'react-native';
import BottomModal from './BottomModal';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const Register = props => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [modal, setModal] = useState('');
  const [department, setDepartment] = useState('');
  const [stream, setStream] = useState('');
  const [year, setYear] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const branches = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'ICE', 'IP'];
  const batches = ['First', 'Second', 'Third', 'Fourth'];

  const registerHandler = () => {
    setSpinner(true);
    if (role === 'Teacher') {
      axios
        .post(
          'https://attendancebackend1-lbe1.onrender.com/auth/register/teacher',
          {
            name: name,
            email: username,
            password: password,
            role: 'teacher',
            department: department,
          },
        )
        .then(response => {
          setSpinner(false);
          props.navigation.navigate('ChooseOption', {response: response.data});
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post(
          'https://attendancebackend1-lbe1.onrender.com/auth/register/student',
          {
            name: name,
            email: username,
            password: password,
            role: 'student',
            branch: stream,
            year: year,
          },
        )
        .then(response => {
          setSpinner(false);
          props.navigation.navigate('ChooseOption', {response: response.data});
        })
        .catch(err => {
          setSpinner(false);
          ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
          console.log(err);
        });
    }
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
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="grey"
        />
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
          onChangeText={setUsername}
          placeholderTextColor="grey"
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
        <TouchableOpacity onPress={() => setModal('role')}>
          <Text
            style={{
              borderWidth: 1,
              padding: 10,
              fontSize: 20,
              marginVertical: 10,
              borderRadius: 10,
              color: role ? 'black' : 'gray',
            }}>
            {role ? role : 'Choose Role'}
          </Text>
        </TouchableOpacity>
        {role === 'Teacher' && (
          <TouchableOpacity onPress={() => setModal('department')}>
            <Text
              style={{
                borderWidth: 1,
                padding: 10,
                fontSize: 20,
                marginVertical: 10,
                borderRadius: 10,
                color: department ? 'black' : 'gray',
              }}>
              {department ? department : 'Choose Department'}
            </Text>
          </TouchableOpacity>
        )}
        {role === 'Student' && (
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
            placeholder="Enter 13 digit roll no"
            value={rollNo}
            onChangeText={setRollNo}
            placeholderTextColor="grey"
          />
        )}
        {rollNo && rollNo.length !== 13 && (
          <Text style={{color: 'red'}}>Please enter your correct roll no.</Text>
        )}
        {role === 'Student' && (
          <TouchableOpacity onPress={() => setModal('stream')}>
            <Text
              style={{
                borderWidth: 1,
                padding: 10,
                fontSize: 20,
                marginVertical: 10,
                borderRadius: 10,
                color: stream ? 'black' : 'gray',
              }}>
              {stream ? stream : 'Choose Stream'}
            </Text>
          </TouchableOpacity>
        )}
        {role === 'Student' && (
          <TouchableOpacity onPress={() => setModal('year')}>
            <Text
              style={{
                borderWidth: 1,
                padding: 10,
                fontSize: 20,
                marginVertical: 10,
                borderRadius: 10,
                color: year ? 'black' : 'gray',
              }}>
              {year ? year : 'Choose Year'}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            paddingHorizontal: 80,
            paddingVertical: 10,
            backgroundColor:
              !name || !username || !password || !role ? 'grey' : '#1f96f4',
            borderRadius: 10,
            marginTop: 20,
          }}
          onPress={registerHandler}
          disabled={!name || !username || !password || !role}>
          <Text style={{fontSize: 20, color: 'white'}}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignSelf: 'center', marginTop: 20}}
          onPress={() => props.navigation.popToTop()}>
          <Text style={{fontSize: 17, color: 'black'}}>
            Already a User? Click to Login
          </Text>
        </TouchableOpacity>
        <BottomModal
          modalHeight={'20%'}
          modalOffset={'80%'}
          modalVisible={modal === 'role'}
          onBackdropPress={() => setModal('')}
          childComponent={
            <View>
              <View
                style={{
                  backgroundColor: '#178ae7',
                  paddingVertical: 10,
                  paddingLeft: 15,
                }}>
                <Text style={{color: 'white', fontSize: 20}}>
                  Choose your role
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={{borderBottomWidth: 1, padding: 17}}
                  onPress={() => {
                    setRole('Teacher');
                    setModal('department');
                  }}>
                  <Text style={{fontSize: 17, color: 'black'}}>Teacher</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{padding: 17}}
                  onPress={() => {
                    setRole('Student');
                    setModal('stream');
                  }}>
                  <Text style={{fontSize: 17, color: 'black'}}>Student</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
        <BottomModal
          modalHeight={'55%'}
          modalOffset={'45%'}
          modalVisible={modal === 'department'}
          onBackdropPress={() => setModal('')}
          childComponent={
            <View>
              <View
                style={{
                  backgroundColor: '#178ae7',
                  paddingVertical: 10,
                  paddingLeft: 15,
                }}>
                <Text style={{color: 'white', fontSize: 20}}>
                  Choose your Department
                </Text>
              </View>
              <View>
                {branches.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={{padding: 17, borderBottomWidth: 1}}
                      key={index}
                      onPress={() => {
                        setDepartment(item);
                        setModal('');
                      }}>
                      <Text style={{fontSize: 17, color: 'black'}}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          }
        />
        <BottomModal
          modalHeight={'55%'}
          modalOffset={'45%'}
          modalVisible={modal === 'stream'}
          onBackdropPress={() => setModal('')}
          childComponent={
            <View>
              <View
                style={{
                  backgroundColor: '#178ae7',
                  paddingVertical: 10,
                  paddingLeft: 15,
                }}>
                <Text style={{color: 'white', fontSize: 20}}>
                  Choose your Stream
                </Text>
              </View>
              <View>
                {branches.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={{padding: 17, borderBottomWidth: 1}}
                      key={index}
                      onPress={() => {
                        setStream(item);
                        setModal('year');
                      }}>
                      <Text style={{fontSize: 17, color: 'black'}}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          }
        />
        <BottomModal
          modalHeight={'55%'}
          modalOffset={'45%'}
          modalVisible={modal === 'year'}
          onBackdropPress={() => setModal('')}
          childComponent={
            <View>
              <View
                style={{
                  backgroundColor: '#178ae7',
                  paddingVertical: 10,
                  paddingLeft: 15,
                }}>
                <Text style={{color: 'white', fontSize: 20}}>
                  Choose your Year of Study
                </Text>
              </View>
              <View>
                {batches.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={{padding: 17, borderBottomWidth: 1}}
                      key={index}
                      onPress={() => {
                        setYear(item);
                        setModal('');
                      }}>
                      <Text style={{fontSize: 17, color: 'black'}}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
