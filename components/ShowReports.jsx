import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import BottomModal from './BottomModal';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import AttendanceList from './AttendanceList';

const ShowReports = props => {
  const [dropDown, setDropDown] = useState('');
  const [view, setView] = useState('');
  const [year, setYear] = useState('');
  const [attendanceYear, setAttendanceYear] = useState('');
  const [month, setMonth] = useState('');
  const [branch, setBranch] = useState('');
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState('');
  const [date, setDate] = useState(new Date());

  const views = ['Year', 'Month', 'Day'];
  const years = ['First', 'Second', 'Third', 'Fourth'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const branches = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'ICE', 'IP'];

  const viewReport = () => {
    const dateOnly = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    if (view === 'Year')
      props.navigation.navigate('Report', {
        year,
        attendanceYear,
        branch,
        subject,
        student,
        view,
      });
    else if (view === 'Month')
      props.navigation.navigate('Report', {
        view,
        year,
        attendanceYear,
        branch,
        subject,
        student,
        month,
      });
    else
      props.navigation.navigate('Report', {
        year,
        branch,
        subject,
        date: dateOnly,
        view,
      });
  };

  const fetchSubjects = branch => {
    axios
      .post('https://attendancebackend1-lbe1.onrender.com/subject', {
        year,
        branch,
      })
      .then(res => setSubjects(res.data.subjects))
      .catch(err => console.log(err));
  };

  const fetchStudents = () => {
    axios
      .post(
        'https://attendancebackend1-lbe1.onrender.com/attendance/students',
        {
          year,
          branch,
        },
      )
      .then(res => setStudents(res.data.students))
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#178ae7'}}>
      <View
        style={{
          justifyContent: 'center',
          marginVertical: 'auto',
          backgroundColor: 'white',
          marginHorizontal: 20,
          borderRadius: 10,
          padding: 20,
        }}>
        <View style={{alignSelf: 'center', marginBottom: 10}}>
          <Text style={{fontSize: 30, color: 'black'}}>View Reports for</Text>
        </View>
        <TouchableOpacity onPress={() => setDropDown('view')}>
          <Text
            style={{
              borderWidth: 1,
              padding: 10,
              fontSize: 20,
              marginTop: 20,
              color: view ? 'black' : 'gray',
            }}>
            {view ? 'View: ' + view : 'Choose View'}
          </Text>
        </TouchableOpacity>
        <BottomModal
          modalVisible={dropDown === 'view'}
          onBackdropPress={() => setDropDown('')}
          modalHeight={'30%'}
          modalOffset={'70%'}
          childComponent={
            <View>
              <View
                style={{
                  backgroundColor: '#178ae7',
                  paddingVertical: 10,
                  paddingLeft: 15,
                }}>
                <Text style={{color: 'white', fontSize: 20}}>
                  Show reports for
                </Text>
              </View>
              {views.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      borderBottomWidth: 1,
                      padding: 17,
                    }}
                    onPress={() => {
                      setView(item);
                      setYear('');
                      setAttendanceYear('');
                      setMonth('');
                      setBranch('');
                      setStudent('');
                      setSubject('');
                      setDropDown('');
                      setDate(new Date());
                    }}
                    key={index}>
                    <Text style={{color: 'black', fontSize: 17}}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
        />
        {(view === 'Year' || view === 'Month') && (
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
            placeholder="Enter Attendance Year"
            value={attendanceYear}
            onChangeText={setAttendanceYear}
            placeholderTextColor="grey"
          />
        )}
        {view === 'Month' && (
          <TouchableOpacity onPress={() => setDropDown('month')}>
            <Text
              style={{
                borderWidth: 1,
                padding: 10,
                fontSize: 20,
                marginTop: 20,
                color: month ? 'black' : 'gray',
              }}>
              {month ? 'Month: ' + month : 'Choose Month'}
            </Text>
          </TouchableOpacity>
        )}
        <BottomModal
          modalVisible={dropDown === 'month'}
          onBackdropPress={() => setDropDown('')}
          modalHeight={'85%'}
          modalOffset={'15%'}
          childComponent={
            <View>
              <View
                style={{
                  backgroundColor: '#178ae7',
                  paddingVertical: 10,
                  paddingLeft: 15,
                }}>
                <Text style={{color: 'white', fontSize: 20}}>Choose Month</Text>
              </View>
              {months.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      borderBottomWidth: 1,
                      padding: 17,
                    }}
                    onPress={() => {
                      setMonth(item);
                      setDropDown('year');
                      setYear('');
                      setBranch('');
                      setStudent('');
                      setSubject('');
                    }}
                    key={index}>
                    <Text style={{color: 'black', fontSize: 17}}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
        />
        {view && (
          <TouchableOpacity onPress={() => setDropDown('year')}>
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
        )}
        <BottomModal
          modalVisible={dropDown === 'year'}
          onBackdropPress={() => setDropDown('')}
          modalHeight={'35%'}
          modalOffset={'65%'}
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
                      setBranch('');
                      setSubject('');
                      setStudent('');
                      setDropDown('branch');
                    }}
                    key={index}>
                    <Text style={{color: 'black', fontSize: 17}}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
        />
        {view && (
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
                      setSubject('');
                      setStudent('');
                      fetchSubjects(item);
                      setDropDown('Subject');
                    }}
                    key={index}>
                    <Text style={{color: 'black', fontSize: 17}}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
        />
        {view && (
          <TouchableOpacity onPress={() => setDropDown('subject')}>
            <Text
              style={{
                borderWidth: 1,
                padding: 10,
                fontSize: 20,
                marginTop: 20,
                color: branch ? 'black' : 'gray',
              }}>
              {subject ? 'Subject: ' + subject : 'Choose Subject'}
            </Text>
          </TouchableOpacity>
        )}
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
                          fetchStudents();
                          if (view == 'Day') setDropDown('date');
                          else setDropDown('student');
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
        {(view === 'Year' || view === 'Month') && (
          <TouchableOpacity onPress={() => setDropDown('student')}>
            <Text
              style={{
                borderWidth: 1,
                padding: 10,
                fontSize: 20,
                marginTop: 20,
                color: student ? 'black' : 'gray',
              }}>
              {student ? 'Student: ' + student.name : 'Choose Student'}
            </Text>
          </TouchableOpacity>
        )}
        <BottomModal
          modalVisible={dropDown === 'student'}
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
                  Choose Students
                </Text>
              </View>
              {students.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      borderBottomWidth: 1,
                      padding: 17,
                    }}
                    onPress={() => {
                      setStudent(item);
                      fetchSubjects(item);
                      setDropDown('Subject');
                    }}
                    key={index}>
                    <Text style={{color: 'black', fontSize: 17}}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
        />
        {view === 'Day' && (
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
        {view &&
          ((view === 'Year' &&
            attendanceYear &&
            year &&
            branch &&
            subject &&
            student) ||
            (view === 'Month' &&
              year &&
              attendanceYear &&
              branch &&
              subject &&
              student) ||
            (view === 'Day' && year && branch && subject && date)) && (
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                paddingHorizontal: 80,
                paddingVertical: 10,
                backgroundColor: '#1f96f4',
                borderRadius: 10,
                marginTop: 20,
              }}
              onPress={viewReport}>
              <Text style={{fontSize: 20, color: 'white'}}>Submit</Text>
            </TouchableOpacity>
          )}
      </View>
    </SafeAreaView>
  );
};

export default ShowReports;
