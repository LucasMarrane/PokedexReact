import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {App} from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/authContext";
import 'react-perfect-scrollbar/dist/css/styles.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
