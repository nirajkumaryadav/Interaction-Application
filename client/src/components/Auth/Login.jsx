import React, { useEffect, useState } from "react";
import { useSigninMutation } from "../../redux/api";
import { toast } from "react-toastify";
import "../../index.css";
import { Backdrop, CircularProgress } from "@mui/material";

const Login = ({ onLoginSuccess }) => {
  const [signin, { data: response, isSuccess, isError, error, isLoading }] =
    useSigninMutation();
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: emailField,
      password: passwordField,
    };
    
    try {
      await signin(data).unwrap();
      // The useEffect above will handle success
      // No need to duplicate the callback here
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    if (isSuccess && response) {
      // Keep the localStorage setting if needed
      localStorage.setItem("user", JSON.stringify(response.result));
      toast.success(`Logged in as ${response.result.name}`);
      
      // Call the success callback here instead
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }
    //eslint-disable-next-line
  }, [isSuccess, response]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-3">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-sm-3 mb-md-5">
                      Please enter your login credentials!
                    </p>
                    {isError && (
                      <div className="alert alert-danger">
                        {error?.data?.message || "Login failed. Please try again."}
                      </div>
                    )}
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline form-white mb-4">
                        <input
                          required
                          autoFocus
                          id="email"
                          label="Email"
                          type="email"
                          value={emailField}
                          onChange={(e) => setEmailField(e.target.value)}
                          placeholder="Email"
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          required
                          id="password"
                          label="Password"
                          type="password"
                          value={passwordField}
                          onChange={(e) => setPasswordField(e.target.value)}
                          placeholder="Password"
                          className="form-control form-control-lg"
                        />
                      </div>

                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
