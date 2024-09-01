import Auth from './firebase/Auth';
import Firestore from './firebase/Firestore';

const {SignInUsingEmailAndPassword, SignOut, SignUpUsingEmailAndPassword} =
  Auth();
const {AddData, getUser, getTasks} = Firestore();

export const Firebase = {
  SignUp: SignUpUsingEmailAndPassword,
  SignOut: SignOut,
  SignIn: SignInUsingEmailAndPassword,
  AddData: AddData,
  GetUser: getUser,
  GetTasks: getTasks,
};
