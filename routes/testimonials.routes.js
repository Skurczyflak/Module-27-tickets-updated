const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials/random').get((req, res) => {
  const response = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.json(response);
})

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
    const { id } = req.params;
    const response = db.testimonials.find((t) => t.id === Number(id));
    res.json(response);
});

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    const id = uuidv4();
    const newTestimonial = { 
        id: id, 
        author:author, 
        text: text 
    };
    db.testimonials.push(newTestimonial);
    res.json({message: 'OK'});
})

router.route('/testimonials/:id').put((req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;
  const response = db.testimonials.find((t) => t.id === Number(id));
  response.author = author;
  response.text = text;
  res.json({message: 'Updated'});
})

router.route('/testimonials/:id').delete((req, res) => {
  const { id } = req.params;
  const response = db.testimonials.find((t) => t.id === Number(id));
  const index = db.testimonials.indexOf(response);
  db.testimonials.splice(index, 1);
  res.json({message: 'Deleted'});
})


module.exports = router;