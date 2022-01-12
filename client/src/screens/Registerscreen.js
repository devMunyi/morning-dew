import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-spinners/HashLoader";
import Error from "../components/Error";
import Success from "../components/Success";
import {Link} from "react-router-dom";

function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);

  async function register() {
    if(password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      //console.log(user);
      try {
        setloading(true);
        const userdata = (await axios.post("/users/register", user)).data;
        setloading(false);
        setsuccess(true);

        //empty input fields after registration is successful
        setname("");
        setemail("");
        setpassword("");
        setcpassword("");

        //Set error to false
        seterror(false);
      } catch (error) {
        setloading(false);
        seterror(true);
        setsuccess(false);
        console.log(error);
      }
    } else {
      alert("Passwords don't match");
    }
  }

  return (
    <div>
      <h1 className="lgloader">{loading && <Loader />}</h1>
      <div className="row justify-content-center mt-5">
        <div className="col-sm-5">
          {error && <Error message= "Registration Error!" />}
          {success && <Success message="Registration success!" />}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              required={true}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              required={true}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              required={true}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Cornfirm Password"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
              required={true}
            />

            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>
            <p className="mt-3">Already have an account? <Link to='/login'>Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
