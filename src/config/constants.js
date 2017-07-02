import firebase from 'firebase'

const config ={
      //==Your Firebase Config data here
  }

export default firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
