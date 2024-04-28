import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import axios from 'axios';

const ReportScreen = props => {
  //   const {year, branch, subject, date} = props.route.params;
  const {view} = props.route.params;

  //   console.log(props.route.params);
  const [tableHead, setTableHead] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (view === 'Day') {
      const {year, branch, subject, date} = props.route.params;
      axios
        .post('https://attendancebackend1-lbe1.onrender.com/attendance/fetch', {
          year,
          branch,
          subject,
          date,
        })
        .then(res => {
          const present = res.data.attendance.students.filter(
            item => item.status === 'Present',
          ).length;
          const absent = res.data.attendance.students.length - present;
          setTableData([
            ['Present', present],
            ['Absent', absent],
            ['Total', res.data.attendance.students.length],
          ]);
          setTableHead([`${year} ${branch} ${subject} ${date}`]);
        })
        .catch(err => console.log(err));
    } else if (view === 'Month' || view === 'Year') {
      const {year, attendanceYear, branch, subject, student} =
        props.route.params;
      if (view === 'Month') {
        var month =
          [
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
          ].indexOf(props.route.params.month) + 1;
      }
      let filteredData = [];
      let present = 0,
        absent = 0;
      console.log(month);
      axios
        .post(
          'https://attendancebackend1-lbe1.onrender.com/attendance/monthly',
          {
            year,
            branch,
            subject,
          },
        )
        .then(res => {
          if (view === 'Month') {
            filteredData = res.data.report.filter(item => {
              if (
                item.date.substring(0, 4) == attendanceYear &&
                item.date.substring(5, 7) == month
              )
                return item;
            });
          }
          if (view === 'Year') {
            filteredData = res.data.report.filter(item => {
              if (item.date.substring(0, 4) == attendanceYear) return item;
            });
          }
          filteredData.map(report =>
            report.students.map(item => {
              if (item.student_id == student._id) {
                if (item.status === 'Present') present++;
                else absent++;
              }
              return item;
            }),
          );
          setTableData([
            ['Present', present],
            ['Absent', absent],
            ['Total', present + absent],
          ]);
          setTableHead([
            `${student.name} ${year} ${
              view === 'Month' ? props.route.params.month + '' : ''
            }${branch} ${subject}`,
          ]);
        })
        .catch(err => console.log(err));
    }
  }, []);
  return (
    <View style={styles.container}>
      {tableHead.length > 0 && tableData.length > 0 && (
        <View style={{marginVertical: 50}}></View>
      )}
      {tableHead.length > 0 && tableData.length > 0 ? (
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      ) : (
        <Text style={{fontSize: 17, color: 'black', padding: 10}}>
          No reports found for the given data.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6, fontSize: 20, color: 'black', paddingLeft: 5},
});

export default ReportScreen;
