import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDDC49L5eUH3-ylPjl3AhwDpOGQifGHsVA",
  authDomain: "react-articles-64045.firebaseapp.com",
  databaseURL: "https://react-articles-64045-default-rtdb.firebaseio.com",
  projectId: "react-articles-64045",
  storageBucket: "react-articles-64045.appspot.com",
  messagingSenderId: "144445790822",
  appId: "1:144445790822:web:34c84a7776e28f148beba7",
  measurementId: "G-SX5K7LJVR1",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
