import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Error from "./Error";
import axios from "axios";

function Rooms() {
  const [rooms, setrooms] = useState([]);

  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  useEffect(() => {
    async function getAllRooms() {
      try {
        const data = (await axios.get("/rooms/getallrooms")).data;
        console.log(data);
        setrooms(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
        console.log(error);
      }
    }
    getAllRooms();
  }, []);
  return (
    <div className="row">
      <div className="col-md-12 mb-5">
        <h1>Rooms</h1>
        {loading && (
          <p className="text-center mb-5">
            <Loader />
          </p>
        )}
        <table className="table table-bordered table-dark table-responsive">
          <thead className="bs">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length ? (
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })
            ) : rooms.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <i>{rooms.length} records loaded</i>
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

export default Rooms;
