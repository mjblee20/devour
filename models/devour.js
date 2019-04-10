// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var devour = {
  selectAll: function(cb) {
    orm.selectAll("devour", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("devour", cols, vals, function(res) {
      cb(res);
    });
  },
  
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("devour", objColVals, condition, function(res) {
      cb(res);
    });
  }
}

// Export the database functions for the controller (devour-controller.js).
module.exports = devour;
