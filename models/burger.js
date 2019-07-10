var orm = require("../config/orm")
// copy from cats

// creates a burger model
var burger = {
    // a function that connects to the orm methods and brings back all the data from the table
    all: function(cb){
        orm.selectAll("burgers", function(res){
            cb(res)
        })
    },
    // connects to the orm methods and inserts into the table
    create: function(cols,vals,cb){
        orm.insertOne("burgers", cols, vals, function(res){
            cb(res)
        })
    },
    // connects to the orm and updates the table values
    update: function(objColVals, condition, cb){
        orm.updateOne("burgers", objColVals, condition, cb)
        cb(res)
    },
    // connects to the orm and deletes the data from the table
    delete: function(condition, cb){
        orm.delete("burgers", condition, function(res){
            cb(res)
        })
    }
}

module.exports = burger