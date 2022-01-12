import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Error from "./Error";
import axios from "axios";

function Users() {
  const [users, setusers] = useState([]);

  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const data = (await axios.get("/users/getallusers")).data;
        console.log(data);
        setusers(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
        console.log(error);
      }
    }
    getAllUsers();
  }, []);
  return (
    <div className="row">
      <div className="col-md-12 mb-5">
        <h1>Users</h1>
        {loading && (
          <p className="text-center mb-5">
            <Loader />
          </p>
        )}
        <table className="table table-bordered table-dark table-responsive">
          <thead className="bs">
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                  </tr>
                );
              })
            ) : Users.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <i>{Users.length} records loaded</i>
                </td>
              </tr>
            ) : (
              <Error message="Oops! Something went wrong. Ensure you're connected to the internet or try again later." />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
