//this sets up our api endpoints that our application can access
//requires the express router middleware
const express = require("express");
const router = express.Router();

//uses the query model
const Query = require("../../models/Query");

router.get("/", (req, res) => {
  Query.find()
    .sort({ _id: -1 })
    .then(items => res.json(items));
});

//gets items that are connected to your email
//sorts by recent first
router.get("/:email", (req, res) => {
  Query.find({
    email: req.body.email
  })
    .sort({ _id: -1 })
    .then(items => res.json(items));
});

// @route   DELETE api/items/:email
// @desc    Delete All items belonging to a certain email
// @access  Public
router.delete("/:email", (req, res) => {
  Query.remove({
    email: req.body.email
  })
    .then(query => query.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post("/:email", (req, res) => {
  const newQuery = new Query({
    email: req.body.email,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    location: req.body.location,
    keyword: req.body.keyword,
    price: req.body.price,
    distance: req.body.distance
  });

  newQuery
    .save()
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

//export this as router
module.exports = router;
