// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".devour").on("click", function(event) {
        var id = $(this).data("id");
        var devoured = $(this).data("devour");
        console.log("client side", devoured);
        var newDevoured = {
            devoured: devoured
        };
        
        // Send the PUT request.
        $.ajax("/api/devour/" + id, {
            type: "PUT",
            data: newDevoured
        }).then(
            function() {
                console.log("changed devoured to", devoured);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newFood = {
        food: $("#food").val().trim().toUpperCase(),
        devoured: $("[name=devoured]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/devour", {
        type: "POST",
        data: newFood
    }).then(
        function() {
            console.log("added new food");
            // Reload the page to get the updated list
            location.reload();
        }
    );
    });

    // $(".delete-cat").on("click", function(event) {
    //   var id = $(this).data("id");

    //   // Send the DELETE request.
    //   $.ajax("/api/cats/" + id, {
    //     type: "DELETE"
    //   }).then(
    //     function() {
    //       console.log("deleted cat", id);
    //       // Reload the page to get the updated list
    //       location.reload();
    //     }
    //   );
    // });
});
