import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AttendanceStatusScreen = ({ route,navigation}) => {
  const { attendanceStatus } = route.params;

  // Dummy image source, replace it with the actual source of the user's image
  const userImageSource = require('../images/profile.jpg');
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={userImageSource} style={styles.profileImage} />
        <Text style={styles.userName}>John Doe</Text>
      </View>

      {/* Attendance Status Section */}
      <View style={styles.attendanceStatusSection}>
        <Icon name="check-circle" size={30} color="#2ecc71" style={styles.icon} />
        <Text style={styles.statusText}>Attendance has been marked {attendanceStatus}</Text>
      </View>

      {/* Selection Status Section */}
      <View style={styles.selectionStatusSection}>
        {attendanceStatus === 'Absent' ? (
          <>
            <Icon name="calendar-times-o" size={30} color="#e74c3c" style={styles.icon} />
            <Text style={styles.selectionText}>You have not selected for the day</Text>
          </>
        ) : (
          <>
            <Icon name="calendar-check-o" size={30} color="#3498db" style={styles.icon} />
            <Text style={styles.selectionText}>You have selected for the day</Text>
          </>
        )}
      </View>

      {/* Retail Execution Section */}
      <View style={styles.retailExecutionSection}>
        <Text style={styles.retailExecutionText} >Go to Retail Execution Tab to start Executing Tasks</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  attendanceStatusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  statusText: {
    fontSize: 18,
  },
  selectionStatusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  retailExecutionSection: {
    // backgroundColor: '#3498db',
    borderWidth:1,
    padding: 15,
    borderRadius: 10,
  },
  retailExecutionText: {
    // color: '#fff',
    fontSize: 18,
  },
});

export default AttendanceStatusScreen;
