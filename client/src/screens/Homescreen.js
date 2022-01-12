import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
//import Error from "../components/Error";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import moment from "moment";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  const [cfromdate, setcfromdate] = useState();
  const [ctodate, setctodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState();

  const [searchkey, setsearchkey] = useState("");
  const [type, settype] = useState("all");

  useEffect(() => {
    async function fetchRooms() {
      try {
        setloading(true);
        const data = (await axios.get("/rooms/getallrooms")).data;
        //console.log(data);
        setrooms(data);
        setduplicaterooms(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
        console.log(error);
      }
    }
    fetchRooms();
  }, []);

  function filterByDate(dates) {
    setcfromdate(moment(dates[0], "DD-MM-YYYY").format("DD-MM-YYYY"));
    setctodate(moment(dates[1], "DD-MM-YYYY").format("DD-MM-YYYY"));

    console.log(
      "Selected from date is : ",
      moment(dates[0], "DD-MM-YYYY").format("DD-MM-YYYY")
    );
    console.log(
      "Selected to date is : ",
      moment(dates[1], "DD-MM-YYYY").format("DD-MM-YYYY")
    );

    var temprooms = [];
    var availability = false;
    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          console.log(booking.fromdate);
          console.log(booking.todate);
          if (
            !moment(
              moment(dates[0], "DD-MM-YYYY").format("DD-MM-YYYY")
            ).isBetween(booking.fromdate, booking.todate) &&
            !moment(
              moment(dates[1], "DD-MM-YYYY").format("DD-MM-YYYY")
            ).isBetween(booking.fromdate, booking.todate) &&
            !moment(moment(dates[0], "DD-MM-YYYY").format("DD-MM-YYYY")).isSame(
              booking.fromdate
            ) &&
            !moment(moment(dates[0], "DD-MM-YYYY").format("DD-MM-YYYY")).isSame(
              booking.todate
            ) &&
            !moment(moment(dates[1], "DD-MM-YYYY").format("DD-MM-YYYY")).isSame(
              booking.fromdate
            ) &&
            !moment(moment(dates[1], "DD-MM-YYYY").format("DD-MM-YYYY")).isSame(
              booking.todate
            )
          ) {
            availability = true;
          }
        }
      }
      if (availability === true || room.currentbookings.length === 0) {
        temprooms.push(room);
      }

      setrooms(temprooms);
    }
  }

  function filterBySearch() {
    const temprooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );

    setrooms(temprooms);
  }

  function filterByType(e) {
    settype(e);
    if (e !== "all") {
      const temprooms = duplicaterooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setrooms(temprooms);
    } else {
      setrooms(duplicaterooms);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-4 bs mr-5 ml-5">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="search rooms..."
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center mb-5">
        {loading ? (
          <p className="loader">
            <Loader />
          </p>
        ) : (
          rooms.map((room) => {
            return (
              <div key={room._id.toString()} className="col-md-9 mt-2">
                <Room room={room} fromdate={cfromdate} todate={ctodate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
