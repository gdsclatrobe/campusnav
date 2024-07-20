import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCdo9hT8myr6Qvy9bqBKNPUCGY22g_3pjk",
    authDomain: "campusnav-gdscltu.firebaseapp.com",
    databaseURL: "https://campusnav-gdscltu-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "campusnav-gdscltu",
    storageBucket: "campusnav-gdscltu.appspot.com",
    messagingSenderId: "256287626307",
    appId: "1:256287626307:web:833de0c265d6f05adf70f6",
    measurementId: "G-DMFP5XBSPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

export { app, database };