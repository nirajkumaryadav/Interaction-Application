import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

const AuthContainer = () => {
  const [alignment, setAlignment] = React.useState("login");
  const navigate = useNavigate();
  const [hasAuthenticated, setHasAuthenticated] = useState(false);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleAuthSuccess = () => {
    setHasAuthenticated(true);
  };

  // Use effect to navigate after state has been updated
  useEffect(() => {
    if (hasAuthenticated) {
      // Navigate to rooms page after successful login/signup
      navigate("/rooms", { replace: true });
    }
  }, [hasAuthenticated, navigate]);

  // Rest of your component...
  return (
    <div className="container h-100 center d-flex flex-column justify-content-center pt-3">
      <ToggleButtonGroup
        className="center"
        value={alignment}
        exclusive
        onChange={handleChange}
        sx={{ bgcolor: "whitesmoke", borderRadius: "8px" }}
      >
        <ToggleButton value="login" sx={{ color: "black", bgcolor: "white" }}>
          Login
        </ToggleButton>
        <ToggleButton value="register" sx={{ color: "black", bgcolor: "white" }}>
          Register
        </ToggleButton>
      </ToggleButtonGroup>
      {alignment === "login" ? 
        <Login onLoginSuccess={handleAuthSuccess} /> : 
        <Register onRegisterSuccess={handleAuthSuccess} />
      }
    </div>
  );
};

export default AuthContainer;
