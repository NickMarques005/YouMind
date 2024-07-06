import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "oficialyoumindnotify-278bf.firebaseapp.com",
    databaseURL: "https://oficialyoumindnotify-278bf-default-rtdb.firebaseio.com",
    projectId: "oficialyoumindnotify-278bf",
    storageBucket: "oficialyoumindnotify-278bf.appspot.com",
    messagingSenderId: "84548222482",
    appId: "1:84548222482:web:5f781d57668393fff362cb",
    measurementId: "G-1MQHCCCW1M"
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(AsyncStorage)
});
const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
const FIRESTORE = getFirestore(FIREBASE_APP);

export { FIREBASE_AUTH, FIREBASE_APP, FIREBASE_STORAGE, FIRESTORE };