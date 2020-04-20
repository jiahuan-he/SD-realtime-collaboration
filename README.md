## CMPT405 Project - A Web-based System Dynamics Realtime Collaboration Tool

#### Table of Contents
1. [Motivation](#1-motivation)  
2. [Setup](#2-setup)  
    2.1. [Environment](#21-environment)  
    2.2. [npm packages](#22-npm-packages)  
    2.3. [firebase](#23-firebase)  
    2.4. [start](#24-start)  
3. [User Manual](#3-user-manual)  
4. [Implementation](#4-implementation)  
    4.1. [React](#41-react)  
       &nbsp;&nbsp;4.1.1. [Components Description](#411-components-description)  
       &nbsp;&nbsp;4.1.2. [UML](#412-uml)  
    4.2. [Synchronization with `firebase`](#42-synchronization-with-firebase)  
    4.3. [Computing simulation data](#43-computing-simulation-data)  
5. [Testing](#5-testing)  
6. [Areas of Improvements](#6-areas-of-improvements)  
    6.1. [TypeScript](#61-typescript)  
    6.2. [GUI](#61-gui)  

### 1. Motivation
  1. The Current Software doesn’t support real-time collaboration (ex. Vensim)
  2. The goal is to create a web-based tool that supports
      1. real-time collaboration: multiple clients can view/edit the same silumation in realtime.
      2. simulation: the system can run and visualize a System Dynamics simulation comprised of stocks, flows, and parameters.


### 2. Setup 
#### 2.1. environment
1. `node.js`>=`v10.16.3`
2. `npm`>=`6.9.0`


#### 2.2. npm packages
run `npm install` to install the packages
- [firebase](https://www.npmjs.com/package/firebase)  
- [mathjs](https://www.npmjs.com/package/mathjs)  
- [react](https://www.npmjs.com/package/react)  
- [react-dom](https://www.npmjs.com/package/react-dom)  
- [react-scripts](https://www.npmjs.com/package/react-scripts)  
- [recharts](https://www.npmjs.com/package/recharts)  

#### 2.3. firebase 
This project depends on firebase Real-time database. A `config.js` file needs to be filled and put under the path `./src/config.js`.
The file needs to contain the following content
```javascript
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

#### 2.4. start
Run `npm start` will start the web app at port `http://localhost:3000/`  

### 3. User Manual

### 4. Implementation

#### 4.1. React 
##### 4.1.1. Components Description
- Background: The root component
  - Board: The diagramming area, which is a `svg` wrapper that contains the svg shapes
    - Cloud
    - Arrow
    - Parameter
    - Stock
    - Flow
    - FlowText
  - Toobar: The container for all the forms that add/modify/run the simulation
    - AddParameterForm
    - AddStockForm
    - AddFlowForm
    - SimulateForm: to set up variables for the simulation and submit a simulation run
    - AddEquationForm
    - AddArrowForm
    - EditStockForm
  - Stocklist: auxiliary view to display stock information
  - Flowlist: auxiliary view to display flow information
  - Chart: chart to display simulation result
##### 4.1.2. UML  
<img src="assets/405-SD-colab-UML.jpg" alt="drawing" width="800"/>

#### 4.2. Synchronization with `firebase`
<img src="assets/405-SD-colab-firebase.png" alt="drawing" width="400"/>

- Firebase Real-time database is an essential part of the implementation. Real-time database serves as the `state` that lives on the cloud, which takes part in `react` framework's uni-directional dataflow.  
  
- User interactions trigger actions to invoke the methods to modify the `state`
  ```javascript
  firebase.database().ref('state/stocks').set(stocks);
  ```
- The view's local `state` subscrib to the cloud `state` and gets updated whenever the cloud `state` changes  
  (example: to a new stock)
  ```javascript
  const stateRef = firebase.database().ref('state');
  stateRef.on('value', (state) => {
    this.setState(state.val())
  })
  ```
#### 4.3. Computing simulation data
The simulation data is calculated at the client and pushed to the firebase realtime database instance, then the client(s)
subscribing to the instance rerenders the view to generate the chart.   
Consider the example that a model is constructed as such:
```
tank1 ===flow1===> tank2
```
And the values are
```
        initValue equation
tank1:  100       -flow1
tank2:  0         flow1
flow1:            0.1*tank1   
```
The simulation is configured as 
```
fromTime: 0, toTime: 5, timeStep:1
```
A JavaScript object that looks like this is used to keep track of the values of the stocks and flows at every time step:
```
{
   "tank1":[],
   "tank2":[],
   "flow1":[]
}
```
The following procedure is iterated until the length of the arrays hits `toTime`:
Replacing the stock/flow names in their equations with their previous values, then evaluate the values using `math.js`
and push the new values onto the arrays.
(Note: for the flows, `new value = evaluated expression`;  
whereas for the stocks, `new value = old value + evaluated expression`)  
Then step 1 `(t=0)`:
```
{
   "tank1":[100],
   "tank2":[0],
   "flow1":[10]
}
```
step 2 `(t=1)`:
```
{
   "tank1":[100, 90],
   "tank2":[0,   10],
   "flow1":[10,  9]
}
```
...
...

Final step `(t=5)`:
```
{
   "tank1":[100, 90, 81,  72.9, 65.61, 59.049],
   "tank2":[0,   10, 19,  27.1, 34.39, 40.951],
   "flow1":[10,  9,  8.1, 7.29, 6.561, 5.9049]
}
```
### 5. Testing
### 6. Areas of improvements
#### 6.1. TypeScript
- TypeScript's static type checking feature, along with proper IDE setup and development configureation, would make
the development faster by reducing debugging time caused by small errors
- TypeScript would also improve the system's code maintainability and refactorability
#### 6.2. GUI 
- More clicking, less typing: The system would be easier to use if some interactions with the system could be done
by clicking instead of typing. Eg. selecting stocks/flows to edit the initial value and add equation
