var connection = require("./connection.js");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
var orm = {
  selectAll: function(table_name, cb) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [table_name], function(err, result) {
      if (err) throw err;
      // return value
      cb(result);
    });
  },
  insertOne: function(table_name, column_name, column_value, cb) {
    //INSERT INTO devour (food, devoured) VALUES ("STEAK", TRUE);
    var queryString = `INSERT INTO ?? ( ??, ?? ) VALUES ( ?, ? ) `;
    console.log(queryString);
    connection.query(queryString, [table_name, column_name[0], column_name[1], column_value[0], column_value[1]], function(err, result) {
      if (err) throw err;
      // return value
      cb(result);
    });
  },
  updateOne: function(table_name, objColVals, condition, cb) {
    // UPDATE `table_name` SET `column_name` = `new_value' WHERE id = id
    var queryString = "UPDATE ?? SET devoured = ? WHERE  id = ?";
    var query = connection.query(queryString, [table_name, objColVals, condition], function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
    });
    // console log the MySQL command line that's executed
    console.log(query.sql);
  }
};

module.exports = orm;
    