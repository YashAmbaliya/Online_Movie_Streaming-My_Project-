import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css"
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MoviesList from "./pages/moviesList/MoviesList";
import Movie from "./pages/movie/Movie";
import NewMovie from "./pages/newMovie/NewMovie";
import ListList from "./pages/listList/ListList"
import List from "./pages/list/List"
import NewList from "./pages/newList/NewList"
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";

function App() {

  const { user } = useContext(AuthContext);

  return (
    <Router>
      {/* <Topbar /> */}
      <Routes>
        <Route exact path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
      {user &&
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route exact path="/"
                element={<Home />}
              />
              <Route path="/users"
                element={<UserList />}
              />
              <Route path="/user/:userID"
                element={<User />}
              />
              <Route path="/newUser"
                element={<NewUser />}
              />
              <Route path="/movies"
                element={<MoviesList />}
              />
              <Route path="/movie/:movieID"
                element={<Movie />}
              />
              <Route path="/newMovie"
                element={<NewMovie />}
              />
              <Route path="/lists"
                element={<ListList />}
              />
              <Route path="/list/:listID"
                element={<List />}
              />
              <Route path="/newList"
                element={<NewList />}
              />
            </Routes>
          </div>
        </>
      }
      {/* </Routes> */}
    </Router>
  );
}

export default App;
