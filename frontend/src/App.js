// General Imports
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import ImageUpload from "./components/ImageUpload/ImageUpload";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const [file, setFile] = useState();
  const [user, setUser] = useState();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
           <Route
          path="/AboutMe"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        
      </Routes>
      {!user || !user.image ? <ImageUpload file = {file} setFile={setFile}/> : <button><img src={`http://localhost:5000/${user.image}`}/></button>}
      <Footer />
    </div>
  );
}

export default App;
