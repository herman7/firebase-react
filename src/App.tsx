import "./App.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import AuthProvider from "./store/AuthContext";
import routes from './routes'
import { ToastContainer } from "react-toastify";
import CustomRouter from '@/components/CustomRouter'
import Navbar from '@/components/navbar/Navbar'

function App() {
  const location = useLocation();
  return (
    <div className="bg-lightgray dark:bg-darkgray text-dark dark:text-light">
      {}
      {location.pathname !== '/signin' &&
        location.pathname !== '/signup' &&
        routes.find(route => route.path === location.pathname) !==
          undefined && <Navbar />}
      <CustomRouter />
    </div>
  );
}

const WrappedApp = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default WrappedApp;
