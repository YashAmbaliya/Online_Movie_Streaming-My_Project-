import firebase from "firebase/compat/app";
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDJLpajD5zWXmBncp6_PrDQNBt6njlN7S8",
    authDomain: "netflix-6882e.firebaseapp.com",
    projectId: "netflix-6882e",
    storageBucket: "netflix-6882e.appspot.com",
    messagingSenderId: "973430629254",
    appId: "1:973430629254:web:9dc3f19028f9b1c49d0207",
    measurementId: "G-Y8YE2S48K9"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;