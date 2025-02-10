import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
