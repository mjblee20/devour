var connection = require("./connection.js");

// Object Relational Mapper (ORM)

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}


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
    "UPDATE ?? SET ?? WHERE  ??";
    var queryString = "UPDATE ?? SET devoured = ? WHERE  id = ?";
    // console.log(objColVals, objToSql(objColVals))
    var query = connection.query(queryString, [table_name, objColVals, condition], function(err, result) {
      // console.log(result.query);
        if (err) {
          throw err;
        }
        cb(result);
    });
    console.log(query.sql);
  }
};

module.exports = orm;
    