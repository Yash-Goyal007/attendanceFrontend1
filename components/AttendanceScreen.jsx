import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomModal from './BottomModal';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';

const AttendanceScreen = props => {
  const {mode} = props.route.params;
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [subject, setSubject] = useState('');
  const [dropDown, setDropDown] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [date, setDate] = useState(new Date());

  const years = ['First', 'Second', 'Third', 'Fourth'];
  const branches = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'ICE', 'IP'];

  const fetchSubjects = branch => {
    axios
      .post('https://attendancebackend1-lbe1.onrender.com/subject', {
        year,
        branch,
      })
      .then(res => setSubjects(res.data.subjects))
      .catch(err => console.log(err));
  };

  const markAttendance = () => {
    const dateOnly = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    props.navigation.navigate('AttendanceList', {
      year,
      branch,
      subject,
      date: dateOnly,
      mode,
      response: props.route.params.response,
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#178ae7'}}>
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            alignSelf: 'flex-end',
            borderRadius: 100,
            padding: 10,
            backgroundColor: 'white',
            margin: 10,
          }}
          onPress={() =>
            props.navigation.navigate('AddSubject', {
              response: props.route.params.response,
            })
          }>
          <Text style={{color: 'black'}}>+ Add Subject</Text>
        </TouchableOpacity>
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
            <Text style={{fontSize: 30, color: 'black'}}>
              {mode === 'edit' ? 'Mark Attendance' : 'View Attendance for'}
            </Text>
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
              <TouchableOpacity onPress={() => setDropDown('subject')}>
                <Text
                  style={{
                    borderWidth: 1,
                    padding: 10,
                    fontSize: 20,
                    marginTop: 20,
                    color: subject ? 'black' : 'gray',
                  }}>
                  {subject.length > 0
                    ? 'Subject: ' + subject
                    : 'Choose Subject'}
                </Text>
              </TouchableOpacity>
            )}
            {year && branch && subject && (
              <TouchableOpacity onPress={() => setDropDown('date')}>
                <Text
                  style={{
                    borderWidth: 1,
                    padding: 10,
                    fontSize: 20,
                    marginTop: 20,
                    color: date ? 'black' : 'gray',
                  }}>
                  {date ? 'Date: ' + date : 'Choose Date'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {year && branch && subject && date && (
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                paddingHorizontal: 80,
                paddingVertical: 10,
                backgroundColor: '#1f96f4',
                borderRadius: 10,
                marginTop: 20,
              }}
              onPress={markAttendance}>
              <Text style={{fontSize: 20, color: 'white'}}>Submit</Text>
            </TouchableOpacity>
          )}
          <DatePicker
            modal
            mode="date"
            open={dropDown === 'date'}
            date={date}
            onConfirm={date => {
              setDropDown('');
              setDate(date);
            }}
            onCancel={() => {
              setDropDown('');
            }}
          />

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
                  <Text style={{color: 'white', fontSize: 20}}>
                    Choose Year
                  </Text>
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
                        setSubject('');
                        setBranch('');
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
                        setSubject('');
                        fetchSubjects(item);
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
            modalVisible={dropDown === 'subject'}
            onBackdropPress={() => setDropDown('')}
            modalHeight={'80%'}
            modalOffset={'20%'}
            childComponent={
              <View>
                <View
                  style={{
                    backgroundColor: '#178ae7',
                    paddingVertical: 10,
                    paddingLeft: 15,
                  }}>
                  <Text style={{color: 'white', fontSize: 20}}>
                    Choose Subject
                  </Text>
                </View>
                <ScrollView>
                  {subjects.length > 0 ? (
                    subjects.map((item, index) => {
                      return (
                        <TouchableOpacity
                          style={{
                            borderBottomWidth: 1,
                            padding: 17,
                          }}
                          onPress={() => {
                            setSubject(item.subject);
                            setDropDown('date');
                          }}
                          key={index}>
                          <Text style={{color: 'black', fontSize: 17}}>
                            {item.subject}
                          </Text>
                        </TouchableOpacity>
                      );
                    })
                  ) : (
                    <Text style={{color: 'black', fontSize: 17, margin: 10}}>
                      No subjects found
                    </Text>
                  )}
                </ScrollView>
              </View>
            }
          />
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default AttendanceScreen;
