import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useAuth } from "./AuthProvider";
import { red } from "@material-ui/core/colors";

const Login = () => {
  const [data, setData] = useState();
  const { redirectToDashboard, setIsLoggedIn, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      redirectToDashboard();
    }
  });

  const OnChangeHandle = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const OnSubmitHandle = (e) => {
    e.preventDefault();
    AuthService.signin(data)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.tokens.accessToken);
        localStorage.setItem("refreshToken", res.data.tokens.refreshToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setIsLoggedIn(true);
        redirectToDashboard();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <section
        className="login_part section_padding "
        style={{ padding: "20px 0" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="login_part_text text-center">
                <div className="login_part_text_iner">
                  <h2>If You Don't Have An Account:</h2>
                  <Link to="/signup_v">
                    <a href="#" className="btn_3">
                      Create an Account Vendeur
                    </a>
                  </Link>
                  <Link to="/signup_c">
                    <a href="#" className="btn_3">
                      {" "}
                      Create an Account Client{" "}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="login_part_form">
                <div className="login_part_form_iner">
                  <h3>
                    Welcome Back ! <br />
                    Please Sign in now
                  </h3>
                  <form
                    className="row contact_form"
                    action="#"
                    method="post"
                    noValidate="novalidate"
                  >
                    <div className="col-md-12 form-group p_star">
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Username"
                        onChange={OnChangeHandle}
                      />
                    </div>
                    <div className="col-md-12 form-group p_star">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        onChange={OnChangeHandle}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <div className="creat_account d-flex align-items-center">
                        <input type="checkbox" id="f-option" name="selector" />
                        <label htmlFor="f-option">Remember me</label>
                      </div>
                      <button
                        type="submit"
                        value="submit"
                        className="btn_3"
                        onClick={OnSubmitHandle}
                      >
                        log in
                      </button>
                      <a className="lost_pass" href="#">
                        forget password?
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
