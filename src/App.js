import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";

// Homepage
import {
  Home,
  Community,
  Job,
  Company,
  Review,
  Login,
  SignUp,
} from "./pages/pages";

function App() {
  return (
    <Routes>
      <Route path="" element={<Home />}>
        <Route path="/community" element={<Community />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/companies" element={<Company />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
