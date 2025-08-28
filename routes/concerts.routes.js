const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts/random').get((req, res) => {
  const response = db.concerts[Math.floor(Math.random() * db.concerts.length)];
  res.json(response);
})

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    const { id } = req.params;
    const response = db.concerts.find((t) => t.id === Number(id));
    res.json(response);
});

router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const id = uuidv4();
    const newTestimonial = { 
        id: id, 
        performer: performer,
        genre: genre,
        price: parseInt(price),
        day: parseInt(day),
        image: image
    };
    db.concerts.push(newTestimonial);
    res.json({message: 'OK'});
})

router.route('/concerts/:id').put((req, res) => {
  const { id } = req.params;
  const { performer, genre, price, day, image } = req.body;
  const response = db.concerts.find((t) => t.id === Number(id));
  response.performer = performer;
  response.genre = genre;
  response.price = price;
  response.day = day;
  response.image = image;
  res.json({message: 'Updated'});
})

router.route('/concerts/:id').delete((req, res) => {
  const { id } = req.params;
  const response = db.concerts.find((t) => t.id === Number(id));
  const index = db.concerts.indexOf(response);
  db.concerts.splice(index, 1);
  res.json({message: 'Deleted'});
})


module.exports = router;