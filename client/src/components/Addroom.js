import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Error from "./Error";
import axios from "axios";
import Swal from "sweetalert2";

function Addroom() {
  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState("");
  const [maxcount, setmaxcount] = useState("");
  const [description, setdescription] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [type, settype] = useState("");
  const [imgurl1, setimgurl1] = useState("");
  const [imgurl2, setimgurl2] = useState("");
  const [imgurl3, setimgurl3] = useState("");

  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  async function addRoom() {
    const newroom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imgurl1, imgurl2, imgurl3],
    };

    try {
      setloading(true);
      const result = (await axios.post("/rooms/addroom", newroom)).data;
      //console.log(result);
      setloading(false);
      Swal.fire("Success", "New Room Added Successfully", "success").then(
        (result) => {
          //empty input fields without reloading the page
          setname("");
          setrentperday("");
          setmaxcount("");
          setdescription("");
          setphonenumber("");
          settype("");
          setimgurl1("");
          setimgurl2("");
          setimgurl3("");
        }
      );
    } catch (error) {
      setloading(false);
      console.log(error);
      Swal.fire("Error", "Oops!. Something went wrong", "error");
    }
  }

  return (
    <div className="row">
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="room name"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="rent per day"
          value={rentperday}
          onChange={(e) => {
            setrentperday(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="max count"
          value={maxcount}
          onChange={(e) => {
            setmaxcount(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="phone number"
          value={phonenumber}
          onChange={(e) => {
            setphonenumber(e.target.value);
          }}
        />
      </div>
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="type"
          value={type}
          onChange={(e) => {
            settype(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 1"
          value={imgurl1}
          onChange={(e) => {
            setimgurl1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 2"
          value={imgurl2}
          onChange={(e) => {
            setimgurl2(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 3"
          value={imgurl3}
          onChange={(e) => {
            setimgurl3(e.target.value);
          }}
        />

        <div className="text-right mt-3">
          <button className="btn btn-primary" onClick={addRoom}>
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addroom;
