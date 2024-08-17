import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const { signUp, logOut, updateUserProfile } = useContext(AuthContext);
  console.log(useContext(AuthContext));
  const [show, setshow] = useState(false);
  const [signUpError, setupSignUpError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  //   signup handler
  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const termsAccepted = e.target.terms.checked;

    // validation
    if (!(password === confirmPassword)) {
      setupSignUpError("Password and confirm password should be matched");
      return;
    } else if (password.length < 6) {
      setupSignUpError("Password must be at least six character");
      return;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(password)
    ) {
      setupSignUpError(
        "Password Must have Uppercase, Lowercase, Alpha Characters"
      );
      return;
    } else if (!termsAccepted) {
      setupSignUpError("Please accept the terms and conditons");
      return;
    }

    // default error or success

    setupSignUpError("");
    setSuccess("");

    // sign up
    signUp(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        setSuccess("Account Created");

        // update profile
        updateUserProfile(name, photo).then(() => {});

        // logout
        logOut();
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setupSignUpError(errorMessage.split("(auth/")[1].split(")")[0]);
      });
  };

  return (
    <div className="mt-10">
      <Helmet>
        <title>SignUp |ProdEx</title>
      </Helmet>
      <h2 className="lg:text-2xl font-bold text-center text-primary">
        New to ProdEx? <br /> Quickly signup for an account now.
      </h2>
      <form
        onSubmit={handleSignUp}
        className="card-body  md:w-1/2 md:mx-auto bg-slate-100 rounded-2xl mt-10"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="name"
            name="name"
            className="input input-bordered"
            required
          />
        </div>
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
            <span className="label-text">Photo Url</span>
          </label>
          <input
            type="text"
            placeholder="Photo Url"
            name="photo"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className="flex items-center"></div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type={show ? "text" : "password"}
              className="grow"
              name="password"
              placeholder="Password"
              required
            />
            <span onClick={() => setshow(!show)}>
              {" "}
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <div className="flex items-center"></div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type={show ? "text" : "password"}
              className="grow"
              placeholder="Confirm passowrd"
              name="confirmPassword"
              required
            />
            <span onClick={() => setshow(!show)}>
              {" "}
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </label>
        </div>
        <label htmlFor="tems">
          <input type="checkbox" name="terms" id="terms" />{" "}
          <span>Accpet the terms and conditions</span>
        </label>

        {signUpError && <p className="text-red-500">{signUpError}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="form-control mt-6">
          <button className="btn bg-primary text-white">SignUp</button>
        </div>
      </form>
      <p className="text-center">
        Already have account? Please{" "}
        <Link to="/login" className="text-primary font-bold">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
