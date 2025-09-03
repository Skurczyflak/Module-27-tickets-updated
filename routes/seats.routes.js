const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats/random').get((req, res) => {
  const response = db.seats[Math.floor(Math.random() * db.seats.length)];
  res.json(response);
})

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    const { id } = req.params;
    const response = db.seats.find((t) => t.id === Number(id));
    res.json(response);
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const id = uuidv4();
    const newSeat = { 
        id: id, 
        day: parseInt(day),
        seat: parseInt(seat),
        client: client,
        email: email
    };
    if( db.seats.find((t) => t.day === parseInt(day) && t.seat === parseInt(seat)) ) {
        res.json({message: "The slot is already taken..."});
        return;
    }else{
    db.seats.push(newSeat);
    res.json({message: 'OK'});
    req.io.emit('seatsUpdated', db.seats);
    }

})

router.route('/seats/:id').put((req, res) => {
  const { id } = req.params;
  const { day, seat, client, email } = req.body;
  const response = db.seats.find((t) => t.id === Number(id));
  response.day = day;
  response.seat = seat;
  response.client = client;
  response.email = email;
  res.json({message: 'Updated'});
})

router.route('/seats/:id').delete((req, res) => {
  const { id } = req.params;
  const response = db.seats.find((t) => t.id === Number(id));
  const index = db.seats.indexOf(response);
  db.seats.splice(index, 1);
  res.json({message: 'Deleted'});
})

module.exports = router;