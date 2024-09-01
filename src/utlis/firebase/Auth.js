import auth from '@react-native-firebase/auth';

export default function Auth() {
  const SignUpUsingEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          resolve('User account created & signed in!', res);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            reject('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            reject('That email address is invalid!');
          }
          if (error.code === 'auth/weak-password') {
            reject(
              'Weak password, Please use numbers, symbols and chose long one.',
            );
          }

          reject(error);
        });
    });
  };

  const SignOut = () => {
    return new Promise((resolve, reject) => {
      auth()
        .signOut()
        .then(() => resolve('User signed out!'))
        .catch(err => reject(err));
    });
  };

  const SignInUsingEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve('User signed in ', res);
        })
        .catch(error => {
          if (error.code === 'auth/invalid-credential') {
            reject('Email or Password is incorrect!');
          }

          if (error.code === 'auth/invalid-email') {
            reject('That email address is invalid!');
          }

          reject(error);
        });
    });
  };

  return {
    SignUpUsingEmailAndPassword,
    SignInUsingEmailAndPassword,
    SignOut,
  };
}
