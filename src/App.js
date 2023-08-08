import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import backimg from "./assets/img1.jpg";

import Home from "./components/Home";
import Bookmark from "./components/Bookmark";
import RootLayout from "./components/RootLayout";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register from "./components/Register";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" exact element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoutes  />}>
        <Route path="/profile" element={<Profile />} />
          <Route path="/bookmark" element={<Bookmark />} />
         
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );

  return (
    <div
      className="App mx-auto min-h-screen  px-8 md:px-20"
      style={{ backgroundImage: `url(${backimg})`, backgroundSize: "contain" }}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
