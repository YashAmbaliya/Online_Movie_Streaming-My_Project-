import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/authContext/AuthContext';
import {MovieContextProvider} from "./context/movieContext/MovieContext";
import {ListContextProvider} from "./context/listContext/ListContext"
import { UserContextProvider } from './context/userContext/UserContext';
import {SnackbarProvider} from "notistack"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={5} preventDuplicate>
    <AuthContextProvider>
      <UserContextProvider>
      <MovieContextProvider>
        <ListContextProvider>
          <App />
        </ListContextProvider>
      </MovieContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
    </SnackbarProvider>
  </React.StrictMode>
);

