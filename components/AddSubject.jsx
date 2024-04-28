import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import BottomModal from './BottomModal';
import axios from 'axios';

const AddSubject = props => {
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [subject, setSubject] = useState('');
  const [dropDown, setDropDown] = useState('');

  const years = ['First', 'Second', 'Third', 'Fourth'];
  const branches = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'ICE', 'IP'];

  const addSubject = () => {
    axios
      .post('https://attendancebackend1-lbe1.onrender.com/subject/add', {
        year,
        branch,
        subject,
      })
      .then(res => {
        console.log(res);
        props.navigation.navigate('ChooseOption', {
          response: props.route.params.response,
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#178ae7'}}>
      <SafeAreaView
        style={{
          justifyContent: 'center',
          marginVertical: 'auto',
          backgroundColor: 'white',
          marginHorizontal: 20,
          borderRadius: 10,
          padding: 20,
        }}>
        <View style={{alignSelf: 'center', marginBottom: 10}}>
          <Text style={{fontSize: 30, color: 'black'}}>Add Subject</Text>
        </View>
        <TouchableOpacity onPress={() => setDropDown('years')}>
          <Text
            style={{
              borderWidth: 1,
              padding: 10,
              fontSize: 20,
              marginTop: 20,
              color: year ? 'black' : 'gray',
            }}>
            {year ? 'Year: ' + year : 'Choose Year'}
          </Text>
        </TouchableOpacity>
        <View>
          {year && (
            <TouchableOpacity onPress={() => setDropDown('branch')}>
              <Text
                style={{
                  borderWidth: 1,
                  padding: 10,
                  fontSize: 20,
                  marginTop: 20,
                  color: branch ? 'black' : 'gray',
                }}>
                {branch ? 'Branch: ' + branch : 'Choose Branch'}
              </Text>
            </TouchableOpacity>
          )}
          {year && branch && (
            <TextInput
              style={{
                height: 50,
                borderWidth: 1,
                backgroundColor: 'white',
                paddingHorizontal: 10,
                fontSize: 20,
                marginTop: 20,
                color: 'black',
              }}
              placeholder="Enter Subject"
              value={subject}
              onChangeText={setSubject}
              placeholderTextColor="grey"
            />
          )}
        </View>
        {year && branch && subject && (
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              paddingHorizontal: 80,
              paddingVertical: 10,
              backgroundColor: '#1f96f4',
              borderRadius: 10,
              marginTop: 20,
            }}
            onPress={addSubject}>
            <Text style={{fontSize: 20, color: 'white'}}>Submit</Text>
          </TouchableOpacity>
        )}
        <BottomModal
          modalVisible={dropDown === 'years'}
          onBackdropPress={() => setDropDown('')}
          modalHeight={'40%'}
          modalOffset={'60%'}
          childComponent={
            <View>
              <View
                style={{
                  backgroundColor: '#178ae7',
                  paddingVertical: 10,
                  paddingLeft: 15,
                }}>
                <Text style={{color: 'white', fontSize: 20}}>Choose Year</Text>
              </View>
              {years.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      borderBottomWidth: 1,
                      padding: 17,
                    }}
                    onPress={() => {
                      setYear(item);
                      setDropDown('');
                    }}
                    key={index}>
                    <Text style={{color: 'black', fontSize: 17}}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
        />
        <BottomModal
          modalVisible={dropDown === 'branch'}
          onBackdropPress={() => setDropDown('')}
          modalHeight={'55%'}
          modalOffset={'45%'}
          childComponent={
            <View>
              <View
                style={{
                  backgroundColor: '#178ae7',
                  paddingVertical: 10,
                  paddingLeft: 15,
                }}>
                <Text style={{color: 'white', fontSize: 20}}>
                  Choose Branch
                </Text>
              </View>
              {branches.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      borderBottomWidth: 1,
                      padding: 17,
                    }}
                    onPress={() => {
                      setBranch(item);
                      setDropDown('');
                    }}
                    key={index}>
                    <Text style={{color: 'black', fontSize: 17}}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default AddSubject;
