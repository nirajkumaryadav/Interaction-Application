import React, { Suspense, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Backdropp from "./utils/Backdropp";
import Auth from "./Pages/AuthPage/Auth";
import Landing from "./Pages/LandingPage/Landing";

const ChatPage = React.lazy(() => import("./Pages/ChatPage/ChatPage"));
const Room = React.lazy(() => import("./components/Room/Room"));
const NoChatSelected = React.lazy(() =>
  import("./components/Room/NoChatSelected")
);

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  // Check authentication status on mount and token changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuth(!!token);
    };
    
    checkAuth();
    
    // Listen for storage changes (in case token is set in another tab)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return (
    <>
      <Router>
        <Routes>
          {/* Landing route - redirect to /rooms if authenticated */}
          <Route 
            path="/" 
            element={isAuth ? <Navigate to="/rooms" /> : <Landing />} 
          />
          
          {/* Auth route - redirect to /rooms if authenticated */}
          <Route 
            path="/auth" 
            element={isAuth ? <Navigate to="/rooms" /> : <Auth />} 
          />
          
          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/rooms" element={
              <Suspense fallback={<Backdropp />}>
                <ChatPage />
              </Suspense>
            }>
              <Route
                path=":roomId"
                element={
                  <Suspense fallback={<Backdropp />}>
                    <Room />
                  </Suspense>
                }
              />
              <Route
                path=""
                element={
                  <Suspense fallback={<Backdropp />}>
                    <NoChatSelected />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        autoClose={3000}
        newestOnTop
        closeOnClick
        draggable
        position="top-center"
      />
    </>
  );
};

export default App;