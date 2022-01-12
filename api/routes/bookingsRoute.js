const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");
const stripe = require("stripe")(
  "sk_test_51KFdPFGf1BnVUlDZCj12KvCVmeBkUsVUJ8vxf5yOoTY2tu66WN2OiqXdHaoO6jHfWPlSHTigD3l1RniGPAAxqbc800uFwvIEP4"
);
const { v4: uuidv4 } = require("uuid");

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totaldays, totalamount, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "KES",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
        const newbooking = new Booking({
          room: room.name,
          roomid: room._id,
          userid,
          fromdate: moment(fromdate).format("DD-MM-YYYY"),
          todate: moment(todate).format("DD-MM-YYYY"),
          totaldays,
          totalamount,
          transactionId: "1234",
        });

        const booking = await newbooking.save();

        const roomtemp = await Room.findOne({ _id: room._id });

        roomtemp.currentbookings.push({
          bookingid: booking._id,
          fromdate: moment(fromdate).format("DD-MM-YYYY"),
          todate: moment(todate).format("DD-MM-YYYY"),
          userid: userid,
          status: booking.status,
        });

        await roomtemp.save();
    }

    res.send("Payment Successful, Your Room is Booked!");
  } catch (error) {
    return res.status(400).json({ error });
  }
});


router.post('/getbookingsbyuserid', async(req, res)=> {
  const userid = req.body.userid;

  try {
    const bookings = await Booking.find({userid: userid});
    res.send(bookings);
  } catch (error) {
    res.status(400).json({error});
  }

})


router.post('/cancelbooking', async(req, res)=>{
  const {bookingid, roomid} = req.body;

  try {
    const bookingItem = await Booking.findOne({_id: bookingid});
    bookingItem.status = 'CANCELLED';
    await bookingItem.save();

    const room = await Room.findOne({_id: roomid});
    const bookings = room.currentbookings;

    const temp = bookings.filter((booking) => booking.bookingid.toString() !== bookingid);

    room.currentbookings = temp;
    await room.save();

    res.send("Your booking cancelled successfully.");

  } catch (error) {
    return res.status(400).json({error})
  }

})


router.get('/getallbookings', async(req, res)=>{
  try {
    const bookings = await Booking.find({});
    res.send(bookings);
  } catch (error) {
    res.status(400).json({error});
  }
})

module.exports = router;
