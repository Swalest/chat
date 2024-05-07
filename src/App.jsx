import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import { Layout } from "./Layout";
import { Inbox } from "./pages/Inbox/Inbox";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Presentation from "communication/Presentation";

const App = () => (
  <Layout>
    <Routes>
      <Route path="" element={<Presentation />} />
      <Route path=":conversationId" element={<Inbox />} />
    </Routes>
  </Layout>
);
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
