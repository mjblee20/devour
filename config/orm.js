var connection = require("./connection.js");

// Object Relational Mapper (ORM)

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
        console.log(table_name);
        console.log(column_name);
        console.log(column_value);
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
        // UPDATE `table_name` SET `column_name` = `new_value' [WHERE id = id];
        var queryString = "UPDATE ?? SET ?? WHERE id = ?";
        connection.query(queryString, [table_name, objToSql(objColVals), condition], function(err, result) {
            console.log(queryString, table_name, objColVals, condition);
            if (err) {
              throw err;
            }
            console.log("update", result);
            cb(result);
          }
        );
      }
    };
    
    module.exports = orm;
    