var express = require("express")
var router = express.Router()
var burger = require("../models/burger")

// The get for the home page  "/"
router.get("/", function(req,res){
    // Passes the call back function into model burgers.js burger.all method
    burger.all(function(data){
        var hbsObject = {
            burgers: data
        }
        console.log(hbsObject)
        res.render("index", hbsObject)
    })
})
// sets up the post for /api/burgers
router.post("/api/burgers", function(req,res){
    /**
     * calls the burger object's create method and connects to column burger_name and devoured
     * gets info from clientside? req.body_name and req.body.devoured
     * passes to create method 
     */
    burger.create(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured],
    // sets up call back function from burger.create
    function (result){
        res.json({id: result.insertId})
    })
})

router.put("/api/burgers/:id", function(req, res){
    // sets up a condition
    var condition = "id = " + req.params.id
    console.log("condition: ", condition)
    // connects to burger.update method and sends thru info from client side
    burger.update({
        devoured: req.body.devoured
    }, condition, function(result){
        // a just incase 404 set up call back function
        if(result.changedRows == 0){
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end()
        } else{
            // return everything went through
            res.status(200).end()
        }
    })
})

router.delete("/api/burgers", function(req,res){
    // sets up condition variable
    var condition = "id = " + req.params.id
    // passes condition variable to burger.delete method with call back
    burger.delete(condition, function(result){
        if (result.affectedRows == 0){
            // Fires 404 if id doesn't exist
            return res.status(404).end()
        }/**Everything clear */ else res.status(200).end()
    })
})

module.exports = router