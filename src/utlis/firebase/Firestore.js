import firestore from '@react-native-firebase/firestore';

export default function Firestore() {
  function AddData(data, doc = 'users', id) {
    return new Promise((resolve, reject) => {
      firestore()
        .collection(doc)
        .add(data)
        .then(res => {
          resolve('User added!', res);
        })
        .catch(err => reject(err));
    });
  }

  async function getUser(email) {
    return new Promise((resolve, reject) => {
      firestore()
        .collection('Users')
        .where('email', '==', email)
        .get()
        .then(res => {
          resolve(res.docs);
        })
        .catch(err => reject(err));
    });
  }

  async function getTasks(params) {
    return new Promise((resolve, reject) => {
      function onResult(QuerySnapshot) {
        console.log('Got Users collection result.');
        resolve(QuerySnapshot);
      }
      console.log('Load');

      function onError(error) {
        console.error('Error getting tasks => ', error);
        reject(error);
      }
      firestore().collection('tasks').onSnapshot(onResult, onError);
    });
  }

  return {
    AddData,
    getUser,
    getTasks,
  };
}
