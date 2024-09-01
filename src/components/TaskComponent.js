import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../const/Color';
import {Fonts} from '../const/Fonts';
const TaskComponent = ({compeleted, updateTask, data, completeTask}) => {
  let item = data?.item?._data;
  const milliseconds =
    item?.date?.seconds * 1000 + item?.date?.nanoseconds / 1000000;

  const dateObject = new Date(milliseconds);
  const localTime = dateObject.toLocaleString();
  //   {"date": {"nanoseconds": 572000000, "seconds": 1725228343},
  //   "description": "Hello user", "priority": "MEDIUM", "title": "New task"}

  return (
    <View style={styles.container}>
      <Icon
        name={item?.completed ? 'check-circle-outline' : 'circle-outline'}
        size={30}
        color={Colors.textColor}
        onPress={() => completeTask(data?.item)}
      />
      <TouchableOpacity
        style={styles.centerView}
        onPress={() => updateTask(data?.item)}>
        <Text
          style={[
            styles.title,
            item?.completed && {
              textDecorationLine: 'line-through',
              textDecorationColor: 'black',
              textDecorationStyle: 'solid',
            },
          ]}>
          {item?.title}
        </Text>
        <Text style={styles.time}>At: {localTime}</Text>
      </TouchableOpacity>
      <Text style={styles.priority}>{item?.priority}</Text>
    </View>
  );
};

export default TaskComponent;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 4,
    marginVertical: 10,
  },
  priority: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF8080',
    padding: 10,
    borderRadius: 4,
  },
  centerView: {
    flex: 1,
    left: 20,
  },
  title: {
    fontFamily: Fonts.lato400,
    fontSize: 16,
    color: Colors.textColor,
    marginBottom: 10,
  },
  time: {
    fontFamily: Fonts.lato400,
    fontSize: 14,
    color: '#000000',
  },
});
