import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {Swipeable} from 'react-native-gesture-handler';

const AttendanceList = props => {
  const {year, branch, subject, date, mode} = props.route.params;
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState([]);
  const [viewAttendance, setViewAttendance] = useState([]);

  const leftSwipe = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'green',
          width: '30%',
        }}>
        <Text style={{color: 'white', fontSize: 17}}>Present</Text>
      </View>
    );
  };

  const rightSwipe = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          width: '30%',
        }}>
        <Text style={{color: 'white', fontSize: 17}}>Absent</Text>
      </View>
    );
  };

  const handleAttendance = (direction, id) => {
    let statusNew = status;
    statusNew = statusNew?.map(item => {
      if (item?.student_id === id)
        return {
          student_id: item.student_id,
          status: direction === 'left' ? 'Present' : 'Absent',
        };
      else return item;
    });
    setStatus(statusNew);
  };

  const Student = props => {
    return (
      <Swipeable
        onSwipeableOpen={direction =>
          handleAttendance(direction, props.student._id)
        }
        renderLeftActions={leftSwipe}
        renderRightActions={rightSwipe}>
        <View style={{borderBottomWidth: 1, width: '100%'}}>
          <Text style={{padding: 20, fontSize: 17, color: 'black'}}>
            {props.student.name} -{' '}
            {props.student.rollNo ? props.student.rollNo : 'NA'}
          </Text>
        </View>
      </Swipeable>
    );
  };

  const StudentView = props => {
    let student = viewAttendance.find(
      item => item.student_id === props.student._id,
    );
    return (
      <View style={{borderBottomWidth: 1, width: '100%', flexDirection: 'row'}}>
        <Text style={{padding: 20, fontSize: 17, color: 'black'}}>
          {props.student.name} -{' '}
          {props.student.rollNo ? props.student.rollNo : 'NA'}
        </Text>
        {student && (
          <Text
            style={{
              color: student.status === 'Present' ? 'green' : 'red',
              alignSelf: 'center',
              marginLeft: 'auto',
              marginRight: 20,
              fontSize: 17,
            }}>
            {student.status}
          </Text>
        )}
      </View>
    );
  };

  useEffect(() => {
    if (mode === 'view') {
      axios
        .post('https://attendancebackend1-lbe1.onrender.com/attendance/fetch', {
          year,
          branch,
          subject,
          date,
        })
        .then(res => {
          setViewAttendance(res.data.attendance.students);
        })
        .catch(err => console.log(err));
    }
    axios
      .post(
        'https://attendancebackend1-lbe1.onrender.com/attendance/students',
        {
          year,
          branch,
        },
      )
      .then(res => {
        setStudents(res.data.students);
        let status = [];
        res.data?.students?.map(item =>
          status.push({
            student_id: item._id,
            status: 'Absent',
          }),
        );
        setStatus(status);
      })
      .catch(err => console.log(err));
  }, []);

  const createAttendance = () => {
    axios
      .post('https://attendancebackend1-lbe1.onrender.com/attendance/', {
        year,
        branch,
        subject,
        date,
        students: status,
      })
      .then(res => {
        props.navigation.navigate('ChooseOption', {
          response: props.route.params.response,
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      {((mode === 'view' && viewAttendance.length > 0) || mode === 'edit') && (
        <ScrollView>
          {students.map(student =>
            mode === 'edit' ? (
              <Student key={student._id} student={student} />
            ) : (
              <StudentView key={student._id} student={student} />
            ),
          )}
        </ScrollView>
      )}
      {mode === 'view' && viewAttendance.length === 0 && (
        <Text style={{fontSize: 17, color: 'black', padding: 10}}>
          No attendance found for the given data.
        </Text>
      )}
      {mode === 'edit' && (
        <TouchableOpacity
          onPress={createAttendance}
          style={{
            alignSelf: 'center',
            paddingHorizontal: 80,
            paddingVertical: 10,
            backgroundColor: '#1f96f4',
            borderRadius: 10,
            marginVertical: 20,
          }}>
          <Text style={{fontSize: 17, color: 'white'}}>Submit</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default AttendanceList;
