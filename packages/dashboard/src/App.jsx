import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Layout from "./components/Layout";

import About from "./pages/about";
import AdsPage from "./pages/advertisements";
import Categories from "./pages/categories";
import Home from "./pages/home";
import Listings from "./pages/listings";
import SignIn from "./pages/signin";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/advertisements" element={<AdsPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
