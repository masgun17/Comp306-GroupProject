import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import ProfilePage from "./Pages/ProfilePage";
import Signup from "./Pages/Signup";

import 'bootstrap/dist/css/bootstrap.min.css';
import TopFilms from "./Pages/TopFilms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/topfilms" element={<TopFilms />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
