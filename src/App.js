import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import ViewEmployee from './pages/ViewEmployee/ViewEmployee';
import ListEmployees from './pages/ListEmployees/ListEmployees';
import ProtectedRoute from './features/navigation/ProtectedRoute';
import { UserAuthContextProvider } from './context/UserAuthContext';
import AddOrEditEmployee from './pages/AddOrEditEmployee/AddOrEditEmployee';
import SearchedListEmployee from './pages/SearchedListEmployee/SearchedListEmployee';

const App = () => {
  return (
    <UserAuthContextProvider>
      <ToastContainer position="top-right" autoClose={5000} theme="colored" />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ListEmployees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search-list-emp"
          element={
            <ProtectedRoute>
              <SearchedListEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-emp/:id"
          element={
            <ProtectedRoute>
              <ViewEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-emp"
          element={
            <ProtectedRoute>
              <AddOrEditEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-emp/:id"
          element={
            <ProtectedRoute>
              <AddOrEditEmployee />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </UserAuthContextProvider>
  );
};

export default App;
