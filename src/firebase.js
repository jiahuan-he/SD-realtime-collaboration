import * as firebase from "firebase";
import {firebaseConfig} from './config.js'

let initDone = false 

if(!initDone) {
    const config = firebaseConfig
    firebase.initializeApp(config);
    firebase.analytics();
    // const database = firebase.database()
    initDone = true
}

export default firebase