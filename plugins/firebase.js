// Import the functions you need from the SDKs you need
import { onGlobalSetup, provide } from '@nuxtjs/composition-api'
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAnlpU0J1AWIULIzPHV3laVFRqH_fnwL6M',
  authDomain: 'nuxt-book-ffbe1.firebaseapp.com',
  projectId: 'nuxt-book-ffbe1',
  storageBucket: 'nuxt-book-ffbe1.appspot.com',
  messagingSenderId: '1028327796093',
  appId: '1:1028327796093:web:c46b5b90e34319da88f014',
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
// 以下を追加すると他のファイルでも使用可能( 使う時はinject("firebase") )
export default () => {
  onGlobalSetup(() => {
    provide('firebase', firebase)
  })
}
