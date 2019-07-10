$(function () {
    $(".change-state").on("click", function (event) {
        var id = $(this).data("id")
        var newDevoured = $(this).data("newDevoured")

        var newState = {
            devoured: newDevoured
        }
        // send put request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newState
        }).then(function () {
            console.log("Changed state: ", newState)

            location.reload()
        })
    })

    $(".create-form").on("submit", function(event){

        event.preventDefault()

        var newBurger = {
            name: $("#burgerForm").val().trim(),
            // what does this even do?
            devoured: $("[name=devoured]:checked").val().trim()
        }

        // send post request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function(){
                console.log("Created a new burger")

                location.reload()
            }
        )
    })

    $(".delete").on("click", function(event){
        var id = $(this).data("id")

        // Send the delete request
        $.ajax("/api/burgers" + id, {
            type: "DELETE"
        }).then(
            function(){
                console.log("deleted burger: ", id)
                // Reloads the page
                location.reload()
            }
        )
    })
})