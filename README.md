## CMPT405 Project - A Web-based System Dynamics Realtime Collaboration Tool

### 1. Motivation
  1. The Current Software doesn’t support real-time collaboration (ex. Vensim)
  2. The goal is to create a web-based tool that supports 
    1. real-time collaboration: multiple clients can view/edit the same silumation in realtime.
    2. simulation: the system can run and visualize a System Dynamics simulation comprised of stocks, flows, and parameters.


### 2. Setup 
#### 1. environment
1. `node.js`>=`v10.16.3`
2. `npm`>=`6.9.0`


#### 2. npm packages
run `npm install` to install the packages
- [firebase](https://www.npmjs.com/package/firebase)  
- [mathjs](https://www.npmjs.com/package/mathjs)  
- [mathjs-simple-integral](https://www.npmjs.com/package/mathjs-simple-integral)  
- [react](https://www.npmjs.com/package/react)  
- [react-dom](https://www.npmjs.com/package/react-dom)  
- [react-scripts](https://www.npmjs.com/package/react-scripts)  
- [recharts](https://www.npmjs.com/package/recharts)  

#### 3. firebase 
This project depends on firebase. A `config.js` file needs to be filled and put under the path `./src/config.js`.
The file needs to contain the following content
```
var firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};
```
Read the [official instruction](https://firebase.google.com/docs/web/setup) for the complete guide on how to setup firebase

#### 4. start
Run `npm start` will start the web app at port `http://localhost:3000/`  

### 3. Implementation
#### 1. React Components
