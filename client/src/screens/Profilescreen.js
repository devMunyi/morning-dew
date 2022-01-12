import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Tabs, Tag } from "antd";
import Swal from "sweetalert2";
const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "/login";
  }

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>isAdmin: {user.isAdmin ? "YES" : "NO"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setbookings] = useState([]);

  const [loading, setloading] = useState();
  const [error, seterror] = useState(false);

  useEffect(() => {
    async function getbookingsbyuserid() {
      try {
        setloading(true);
        const data = (
          await axios.post("/bookings/getbookingsbyuserid", {
            userid: user._id,
          })
        ).data;
        setloading(false);
        setbookings(data);
        //console.log(data);
      } catch (error) {
        setloading(false);
        seterror(true);
        console.log(error);
      }
    }
    getbookingsbyuserid();
  }, [user._id]);

  async function cancelBooking(bookingid, roomid) {
    try {
      setloading(true);
      const result = await axios.post("/bookings/cancelbooking", {
        bookingid,
        roomid,
      }).data;
      setloading(false);
      Swal.fire("Success", "Your booking has been cancelled", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      setloading(false);
      Swal.fire("Oops!", "Something went wrong", "error");
      console.log(error);
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading ? (
            <p className="loader">
              <Loader />
            </p>
          ) : bookings.length > 0 ? (
            bookings.map((booking) => {
              return (
                <div className="bs" key={booking._id}>
                  <h1>{booking.room}</h1>
                  <p>
                    <b>BookingId</b>: {booking._id}
                  </p>
                  <p>
                    <b>Check In</b>: {booking.fromdate}
                  </p>
                  <p>
                    <b>Check Out</b> : {booking.todate}
                  </p>
                  <p>
                    <b>Amount</b>: {booking.totalamount}
                  </p>
                  <p>
                    <b>Status</b>:&nbsp;
                    {booking.status === "booked" ? (
                      <Tag color="green"> CONFIRMED</Tag>
                    ) : (
                      <Tag color="red"> CANCELLED</Tag>
                    )}
                  </p>
                  <div className="text-right">
                    {booking.status !== "CANCELLED" && (
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          cancelBooking(booking._id, booking.roomid)
                        }
                      >
                        CANCEL BOOKING
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : bookings.length === 0 ? (
            <h1>No Records Available</h1>
          ) : (
            <Error message="Oops! Something wrong happened. Please ensure you have internet connection or try again later..." />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profilescreen;
