import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import AOS from "aos";
import "aos/dist/aos.css";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

AOS.init({
  duration: 1500,
});

function Bookingscreen() {
  if (!JSON.parse(localStorage.getItem("currentUser"))) {
    window.location.href = "/login";
  }

  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [room, setroom] = useState();

  const params = useParams();
  const { roomid } = params;
  const fromdate = moment(params.fromdate, "DD-MM-YYYY");
  const todate = moment(params.todate, "DD-MM-YYYY");

  const totaldays = todate.diff(fromdate, "days") + 1;
  const [totalamount, settotalamount] = useState();

  useEffect(() => {
    async function getRoomDetailsById() {
      try {
        setloading(true);
        const data = (
          await axios.post("/rooms/getroombyid", { roomid: roomid })
        ).data;
        setroom(data);
        settotalamount(data.rentperday * totaldays);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
        console.log(error);
      }
    }
    getRoomDetailsById();
  }, [roomid, totaldays]);

  async function onToken(token) {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totaldays,
      totalamount,
      token,
    };

    try {
      setloading(true);
      const data = axios.post("/bookings/bookroom", bookingDetails);
      setloading(false);
      Swal.fire(
        "Congratulations!",
        "Your Room Booked Successfully",
        "success"
      ).then((result) => {
        window.location.href = "/profile";
      });
    } catch (error) {
      setloading(false);
      Swal.fire("Oops!", "Something went wrong", "error");
    }
  }

  return (
    <div className="m-5" data-aos="flip-right">
      {loading ? (
        <p className="loader">
          <Loader />
        </p>
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img
                src={room.imageurls[0]}
                alt="room_image"
                className="bigimg"
              />
            </div>
            <div className="col-md-6">
              <div className="text-right">
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>
                    Name: {JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>From Date: {params.fromdate}</p>
                  <p>To Date: {params.todate}</p>
                  <p>Max Count: {room.maxcount}</p>
                </b>
              </div>

              <div className="text-right">
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days : {totaldays}</p>
                  <p>Rent per day : {room.rentperday}</p>
                  <p>Total Amount : {totalamount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency="KES"
                  stripeKey="pk_test_51KFdPFGf1BnVUlDZLz2AXvrlo67S3DNpU4PUsdKLlj9gSWQzGcQXu3d7O3CZfpU6ydyWeMiftbyooR4okl0pD80X00RJcvDxQA"
                >
                  <button className="btn btn-primary">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error message="Oops! Something wrong happened. Please ensure you have internet connection or try again later..." />
      )}
    </div>
  );
}

export default Bookingscreen;
