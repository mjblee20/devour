var express = require("express");

var router = express.Router();

// Import the model (devour.js) to use its database functions.
var devour = require("../models/devour.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  devour.selectAll(function(data) {
    var hbsObject = {
      devour: data
    };
    res.render("index", hbsObject);
  });
});

router.post("/api/devour", function(req, res) {
  devour.insertOne([
    "food", "devoured"
  ], [
    req.body.food, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.id });
  });
});

router.put("/api/devour/:id", function(req, res) {
  var condition = req.params.id;
  console.log()
  devour.updateOne(req.body.devoured, condition, function(result) {
    if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


// removing information

// router.delete("/api/devour/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   dev.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// Export routes for server.js to use.
module.exports = router;
