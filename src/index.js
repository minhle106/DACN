import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./stores/store";
import { ConfigProvider } from "antd";
import { AuthProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1rem",
              //  colorPrimary: "#000000",
            },
          }}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
