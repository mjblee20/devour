  var connection = require("./connection.js");

  // Object Relational Mapper (ORM)

  // The ?? signs are for swapping out table or column names
  // The ? signs are for swapping out other values
  // These help avoid SQL injection
  var orm = {
      selectAll: function(table_name, column_name) {
        var queryString = "SELECT ?? FROM ??";
        connection.query(queryString, [column_name, table_name], function(err, result) {
          if (err) throw err;
          console.log(result);

          // return value

        });
      },
      insertOne: function(table_name, column_name, column_value) {
        //INSERT INTO devour (food, devoured) VALUES ("STEAK", TRUE);
        var queryString = `INSERT INTO ?? ( ??, ?? ) VALUES ( ?? ) `;
        console.log(queryString);
        connection.query(queryString, [table_name, column_name, column_value], function(err, result) {
          if (err) throw err;
          console.log(result);
          // return value
          
        });
      },
      updateOne: function(table_name, column_name, cb) {
        // UPDATE `table_name` SET `column_name` = `new_value' [WHERE id = id];
        var queryString =
          "UPDATE ?? SET ?? = ?, ?? = ? [WHERE ?? = ??];";
    
        connection.query(
          queryString,
          [table_name, column_name],
          function(err, result) {
            if (err) {
              throw err;
            }
      
            cb(result);
          }
        );
      }
    };
    
    module.exports = orm;
    