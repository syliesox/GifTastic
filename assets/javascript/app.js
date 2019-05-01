// APIkey: bniG08ipWae7ubhIHWNrTDNSLzz5QcCh

$(document).ready(function() {

    // Starting buttons
    var animals = ["cat","dog","bunny","horse","mouse","giraffe"];

    // Function for rendering data that the user inputs into the search
    function createButtons() {

        // Make sure the div is empty to start with
        $("#buttons").empty();

        // Loop through the array of animals
        for (var i = 0; i < animals.length; i++) {
            var createButton = $("<button>");

            createButton.addClass(".Animal");
            createButton.attr("Animal-name", animals[i]);
            createButton.text(animals[i]);

            // Adding the created button to the appropriate div in the html
            $("#buttons").append(createButton);

            // When the created button is clicked, it will display the gifs for that animal
            createButton.on( "click", function() {
                displayGifs($( this ).attr("Animal-name"))
            });
        }
    }

    // Function to get the gifs displayed to the screen through api call
    function displayGifs(animal) {
        // Make sure the display div with the gifs is not showing anything
        $("#gifs").empty();

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "+animal&api_key=bniG08ipWae7ubhIHWNrTDNSLzz5QcCh";
        // console.log(queryURL);

        // AJAX request with url being requested
        $.ajax({
            url: queryURL,
            method: "GET"
        })

        // Once the data is returned, this will render
        .then(function(response) {
            // console.log(queryURL);
            // console.log(response);

            // Store the results
            var results = response.data;

            // Loop through each item
            for (var i = 0; i < results.length; i++) {
                // Create a div tag
                var animalDiv = $("<div class:'animalSelected'>");

                // Need to put rating info on screen
                var rating = results[i].rating;
                var ratingText = $("<p>").text("Rating: " + rating);

                // Set up of play/pause functionality
                var urlStill = results[i].images.fixed_height_still.url;
                urlMoving = results[i].images.fixed_height.url;

                var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlMoving).attr("data-state", "still");

                // Append image and paragraph to animalDiv
                animalDiv.append(ratingText);
                animalDiv.append(gif);

                // Set info to display in the div
                $("#gifs").append(animalDiv);
            }

            // When the gif is clicked
            $(".gif").on("click", function() {

                // To play and pause gif
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    }
    // When the submit button is clicked, this code will run
    $("#addAnimal").on("click", function(event) {

        // Prevents the page from reloading
        event.preventDefault();

        // Grabs the text from the user input
        var Animal = $("#Animal-input").val().trim();

        if (Animal === "") {
            // Do nothing
        } else {
            // Add animal to animals array
            animals.push(Animal);

            // Process array and create buttons
            createButtons();
        };
    });

    createButtons();

});