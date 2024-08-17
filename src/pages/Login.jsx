import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [signInError, setupSignInError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // login
    login(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setLoginSuccess("Logged In");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged In Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        // naviage after login
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setupSignInError(errorMessage.split("(auth/")[1].split(")")[0]);
      });
  };

  //   google login

  const GoogleLoginHandler = () => {
    googleLogin().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged In Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(location?.state ? location.state : "/");
    });
  };

  return (
    <div className="mt-10">
      <Helmet>
        <title>Login | ProdEx</title>
      </Helmet>
      <h2 className="  lg:text-4xl font-bold text-center text-primary">
        Login
      </h2>
      <div className="flex items-center justify-center gap-10 mt-10">
        <button
          onClick={GoogleLoginHandler}
          className="btn btn-circle border-2 border-gray-400 text-3xl"
        >
          <FcGoogle />
        </button>
      </div>
      <div className="divider">Or</div>
      <form
        onSubmit={handleLogin}
        className="card-body md:w-1/2 md:mx-auto bg-slate-100 rounded-2xl mt-10"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            name="email"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            name="password"
            required
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        {signInError && <p className=" text-red-800">{signInError}</p>}
        {loginSuccess && <p className="text-green-800">{loginSuccess}</p>}
        <div className="form-control mt-6">
          <button className="btn bg-primary text-white ">Sign In</button>
        </div>
      </form>
      <p className="text-center">
        New to CraftyFiber.com? Quickly{" "}
        <Link to="/sign_up" className="text-primary font-bold">
          Sign Up
        </Link>{" "}
        for an account now.
      </p>
    </div>
  );
};

export default Login;
