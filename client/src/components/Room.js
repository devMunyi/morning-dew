import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 1000,
});

function Room(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const facilities = props.room.facilities;
  const fromdate = props.fromdate;
  const todate = props.todate;
  return (
    <div className="row bs" data-aos="fade-up">
      <div className="col-md-5">
        <img src={props.room.imageurls[0]} alt="Room" className="smallimg" />
      </div>
      <div className="col-md-6" key={props.room._id}>
        <h1>{props.room.name}</h1>
        <p>
          Facilities: <b>{facilities.join(", ")}</b>
        </p>
        <p>
          Max Count: <b>{props.room.maxcount}</b>
        </p>
        <p>
          Phone Number: <b>{props.room.phonenumber}</b>
        </p>
        <p>
          Type: <b>{props.room.type}</b>
        </p>
        <div style={{ float: "right" }}>
          {fromdate && todate && (
            <Link to={`/book/${props.room._id}/${fromdate}/${todate}`}>
              <button className="btn btn-primary mr-2">Book Now</button>
            </Link>
          )}

          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{props.room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel key={props.room._id}>
            {props.room.imageurls.map((url) => {
              return (
                <Carousel.Item interval={1000}>
                  <img className="d-block w-100 bigimg" src={url} alt="slide" />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p style={{ fonSize: "10" }}>{props.room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
