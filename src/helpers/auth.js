import {ref, firebaseAuth} from '../config/constants'


export function auth(email, pw){
  return firebaseAuth().createUserWithEmailAndPassword(email,pw).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // ...
          })
          .then(saveUser)
}

export function login(email, pw){
  return firebaseAuth().signInWithEmailAndPassword(email, pw).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            
          })
}

export function logout () {
  return firebaseAuth().signOut()
}

export function resetPassword(email){
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser(user){
  return ref.child(`users/${user.uid}/info`)
  .set({email: user.email,
        uid: user.uid
    })
    .then(()=>user)
}
