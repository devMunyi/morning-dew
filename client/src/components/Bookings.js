import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Error from "./Error";
import axios from "axios";

function Bookings() {
  const [bookings, setbookings] = useState([]);

  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  useEffect(() => {
    async function getAllBookings() {
      try {
        const data = (await axios.get("/bookings/getallbookings")).data;
        console.log(data);
        setbookings(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
        console.log(error);
      }
    }
    getAllBookings();
  }, []);
  return (
    <div className="row">
      <div className="col-md-12 mb-5">
        <h1>Bookings</h1>
        {loading && (
          <p className="text-center mb-5">
            <Loader />
          </p>
        )}
        <table className="table table-bordered table-dark table-responsive">
          <thead className="bs">
            <tr>
              <th>Bookind Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length ? (
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <i>{bookings.length} records loaded</i>
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

export default Bookings;
