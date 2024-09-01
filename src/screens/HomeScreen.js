import {
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Firebase} from '../utlis';
import {AuthContext} from '../navigation/AppStackNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../const/Color';
import Header from '../components/Header';
import EmptyHomeScreenComponent from '../components/EmptyHomeScreenComponent';
import AddTodoModal from '../components/AddTodoModal';
import CategoryComponent from '../components/CategoryComponent';
import TaskComponent from '../components/TaskComponent';
import firestore from '@react-native-firebase/firestore';
const {GetUser, AddData, GetTasks} = Firebase;
const HomeScreen = ({route}) => {
  const {user} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    priority: null,
    date: new Date(),
    completed: false,
  });

  const userData = async () => {
    try {
      const userSnapshot = await firestore()
        .collection('Users')
        .where('email', '==', user?.email)
        .get();

      if (!userSnapshot.empty) {
        userSnapshot.forEach(doc => {
          console.log('User data:', doc.data());
          setCurrentUser(doc.data());
        });
      } else {
        console.log('No matching documents.');
      }
    } catch (error) {
      console.error('Error getting documents:', error);
    }
  };

  useEffect(() => {
    userData();
  }, []);

  const getAllTasks = async () => {
    try {
      setLoading(true);

      let response = await GetTasks();

      let completed = response?.docs?.filter(
        item => item.data().completed == true,
      );
      let notCompleted = response?.docs?.filter(
        item => item.data().completed != true,
      );
      setCompletedTasks(completed);
      setTasks(notCompleted);
      // setCompletedTasks(arr);
      setLoading(false);
    } catch (error) {
      console.log('Error getting tasks => ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // userData();
    getAllTasks();
  }, []);

  const handleCompleteTask = item => {
    console.log('FOR COMPLETE => ', item.id);
    firestore()
      .collection('tasks')
      .doc(item.id)
      .update({completed: true})
      .then(() => {
        console.log('Updated');
        getAllTasks();
      });
  };

  const handleAddTask = async (update = false) => {
    if (
      !taskDetails.title ||
      !taskDetails.description ||
      !taskDetails.priority ||
      !taskDetails.date
    ) {
      return ToastAndroid.show('All fields are important.', ToastAndroid.SHORT);
    }

    if (!update) {
      await AddData(taskDetails, 'tasks');
      getAllTasks();
    }
  };

  const handleUpdateTask = async item => {
    if (currentUser?.role != 'admin') {
      return;
    }
    console.log('UPDATE TASK => ', item.data());
    const milliseconds =
      item.data().date?.seconds * 1000 +
      item.data().date?.nanoseconds / 1000000;

    const dateObject = new Date(milliseconds);
    setTaskDetails({
      title: item.data().title || '',
      description: item.data().description || '',
      priority: item.data().priority || null,
      date: dateObject,
      completed: false,
    });
    setShowModal(true);
    firestore().collection('tasks').doc(item?.id).delete();
  };

  return (
    <View style={styles.container}>
      <Header />
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={Colors.primaryColor}
          style={{alignSelf: 'center'}}
        />
      ) : tasks.length > 0 || completedTasks.length > 0 ? (
        <>
          <View style={{flex: 1, paddingHorizontal: 20}}>
            <CategoryComponent label={'Incompelete'} />
            <FlatList
              data={tasks}
              renderItem={item => (
                <TaskComponent
                  data={item}
                  completeTask={handleCompleteTask}
                  updateTask={handleUpdateTask}
                />
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
          <View style={{flex: 1, paddingHorizontal: 20}}>
            <CategoryComponent label={'Completed'} />
            <FlatList
              data={completedTasks}
              renderItem={item => (
                <TaskComponent
                  data={item}
                  completeTask={() => null}
                  updateTask={() => null}
                />
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
        </>
      ) : (
        <EmptyHomeScreenComponent />
      )}

      {currentUser?.role == 'admin' && (
        <RenderAddTodoButton setShowModal={setShowModal} />
      )}
      <AddTodoModal
        showModal={showModal}
        setShowModal={setShowModal}
        taskDetails={taskDetails}
        setTaskDetails={setTaskDetails}
        addTask={handleAddTask}
      />
    </View>
  );
};

const RenderAddTodoButton = ({setShowModal}) => {
  return (
    <TouchableOpacity
      style={styles.plusButton}
      onPress={() => setShowModal(true)}>
      <Icon name="plus" size={30} color="white" />
    </TouchableOpacity>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.themeColor},
  plusButton: {
    backgroundColor: Colors.primaryColor,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
