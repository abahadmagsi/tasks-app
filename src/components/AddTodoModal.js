import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInput,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Colors} from '../const/Color';
import Title from './Title';
import CustomInput from './CustomInput';
import {Fonts} from '../const/Fonts';
import DatePicker from 'react-native-date-picker';
import CustomButton from './CustomButton';

const AddTodoModal = ({
  showModal,
  setShowModal,
  taskDetails,
  setTaskDetails,
  addTask,
}) => {
  const slideAnim = useMemo(() => new Animated.Value(0), []);
  const [taskDate, setTaskDate] = useState(new Date());

  const [titleFocus, setTitleFocus] = useState(false);
  const [descriptionFocus, setDescriptionFocus] = useState(false);

  useEffect(() => {
    if (showModal) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showModal, slideAnim]);

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowModal(false));
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0], // 300 is the height from the bottom you want to slide up
  });
  return (
    <Modal transparent={true} visible={showModal} onRequestClose={closeModal}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPressOut={closeModal}>
        <Animated.View style={[styles.modalView, {transform: [{translateY}]}]}>
          <Title title={'Add todo'} titleStyles={styles.modalText} />
          <ModalInput
            label={'Title'}
            focus={titleFocus}
            setFocus={setTitleFocus}
            value={taskDetails?.title}
            setValue={e => setTaskDetails({...taskDetails, title: e})}
          />
          <ModalInput
            label={'Description'}
            focus={descriptionFocus}
            setFocus={setDescriptionFocus}
            value={taskDetails?.description}
            setValue={e => setTaskDetails({...taskDetails, description: e})}
          />
          <View style={styles.priorityView}>
            <TaskPriority
              label={'LOW'}
              priority={taskDetails?.priority}
              setPriority={e => setTaskDetails({...taskDetails, priority: e})}
            />
            <TaskPriority
              label={'MEDIUM'}
              priority={taskDetails?.priority}
              setPriority={e => setTaskDetails({...taskDetails, priority: e})}
            />
            <TaskPriority
              label={'HIGH'}
              priority={taskDetails?.priority}
              setPriority={e => setTaskDetails({...taskDetails, priority: e})}
            />
          </View>
          <ModalDatePicker date={taskDate} setDate={setTaskDate} />
          <CustomButton
            label={'Add task'}
            onPress={() => {
              addTask();
              closeModal();
            }}
          />
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const ModalInput = ({focus, label, setFocus, value, setValue}) => {
  return (
    <TextInput
      placeholder={label}
      placeholderTextColor={Colors.inactiveTextColor}
      style={[styles.modalInput, focus && styles.focusModalInput]}
      value={value}
      onChangeText={e => setValue(e)}
      onFocus={() => setFocus(true)}
      //   onPressOut={() => setFocus(false)}
      //   onPressIn={() => setFocus(true)}
    />
  );
};

const TaskPriority = ({label, priority, setPriority}) => {
  return (
    <TouchableOpacity
      style={[
        styles.TaskPriorityButton,
        priority == label && {backgroundColor: Colors.primaryColor},
      ]}
      onPress={() => setPriority(label)}>
      <Text style={styles.TaskPriorityButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const ModalDatePicker = ({date, setDate}) => {
  return (
    <>
      <Text style={styles.taskDatePickerText}>Choose time / date</Text>
      <DatePicker date={date} onDateChange={setDate} />
    </>
  );
};

export default AddTodoModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    backgroundColor: Colors.borderColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    // textAlign: 'center',
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalInput: {
    // borderWidth: 1,
    // borderColor: Colors.textColor,
    width: '100%',
    paddingHorizontal: 20,
    fontFamily: Fonts.lato400,
    fontSize: 18,
    color: Colors.textColor,
    // backgroundColor: Colors.inputColor,
    marginVertical: 10,
  },
  focusModalInput: {
    borderWidth: 1,
    borderColor: Colors.textColor,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  priorityView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  TaskPriorityButton: {
    backgroundColor: '#272727',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 4,
  },
  TaskPriorityButtonText: {
    color: Colors.textColor,
    fontFamily: Fonts.lato400,
    fontSize: 16,
  },
  taskDatePickerText: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginVertical: 20,
    color: Colors.textColor,
    fontFamily: Fonts.lato400,
    fontSize: 12,
  },
});
