import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="825167054894-du27q3boqancihf6j1aoid5f82h9ki8f.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
