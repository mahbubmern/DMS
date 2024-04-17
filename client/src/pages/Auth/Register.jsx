import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/frontend/img/sonali-bank-logo.png";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { createUserRegister } from "../../features/auth/authApiSlice";
import { authSelector, setEmptyMessage } from "../../features/auth/authSlice";

import { useEffect } from "react";
import createToast from "../../utils/createToast";

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, error, message } = useSelector(authSelector);

  const { input, handleInputChange, formReset } = useForm({
    index: "",
    name: "",
    email: "",
    password: "",
  });

  const handleRegisterForm = (e) => {
    e.preventDefault()
    dispatch(createUserRegister(input));

    // navigate("/account-activation-by-otp");
  };

  useEffect(() => {
    if (message) {
      createToast(message, "success");
      dispatch(setEmptyMessage());
      dispatch(formReset);
      navigate('/account-activation-by-otp')
    }
    if (error) {
      createToast(error);
      dispatch(setEmptyMessage());
    }
  }, [message, error, dispatch,formReset, navigate]);

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={logo} alt="Logo" />
              </div>
              <div className="login-right">
                <div
                  className="login-right-wrap"
                  style={{ position: "relative" }}
                >
                  <h1>User Register</h1>
                  <p className="account-subtitle">Access to DMS dashboard</p>
                  {/* Form */}
                  <form onSubmit={handleRegisterForm}>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Index"
                        name="index"
                        value={input.index}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={input.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={input.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={input.password}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-0">
                      <button
                        className="btn btn-primary w-100"
                        onClick={handleRegisterForm}
                      >
                        {loader ? "Creating..." : "Register"}
                      </button>
                    </div>
                  </form>
                  <div className="text-center dont-have">
                    Already have an account? <Link to="/login">Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default Register;
