var connection = require("./connection")

// Helper function for sql syntax
// Loops through and creates an array of question marks and turns it into a string
function printQuestionMarks(num) {
    var arr = []

    for (var i = 0; i < num; i++) {
        arr.push("?")
    }
    return arr.toString()
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = []
    for (var key in ob) {
        var value = ob[key]
        // Check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations 
            if (typeof value === "string" && value.indexOf(" ") > -0) {
                value = "'" + value + "'"
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value)
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString()
}

var orm = {
    // selects all from the table
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";"
        connection.query(queryString, function (err, result) {
            if (err) throw err
            // call back for the result
            cb(result)
        })

    },
    // creates a function ???
    // takes in table column values and call back
    insertOne: function (table, cols, vals, cb) {
        // insert into table (column) values ()
        var queryString = "INSERT INTO " + table
        queryString += " ("
        queryString += cols.toString()
        queryString += ") "
        queryString += "VALUES ("
        queryString += printQuestionMarks(vals.length)
        queryString += ") "

        console.log(queryString)

        connection.query(queryString, vals, function (err, result) {
            if (err) throw err

            cb(result)
        })
    },
    // updates table
    updateOne: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table

        queryString += " SET "
        queryString += objToSql(objColVals)
        queryString += " WHERE "
        queryString += condition

        console.log(queryString)
        connection.query(queryString, function (err, res) {
            if (err) throw err
            cb(result)
        })
    },
    // deletes from the table
    delete: function (table, condition, cb) {
        var queryString = "DELETE FROM " + table
        queryString += " WHERE "
        queryString += condition

        connection.query(queryString, function (err, res) {
            if (err) throw err

            cb(result)
        })
    }
}

module.exports = orm