// Document Ready
$(document).ready(function() {

    // This function handles events where a sports button is clicked
    $("#add-sports").on("click", function(event) {
        
      // This line grabs the input from the textbox
      var sportInput = $("#sports-input").val().trim();

        // Then dynamicaly generating buttons for sport added throught the input
        var a = $("<button>");

        // Adding a class to the new buttons
        a.addClass("sports-btn");
       
        // Adding a data-attribute
        a.attr("data-sports", sportInput);


        // Providing the initial button text
        a.text(sportInput);

        // Adding the button to the buttons-view div
        $(".btns").append(a);
        
        event.preventDefault();
        
        console.log (a);
     
        // Will clear input value after button is rendered
        $("#sports-input").val("");
    

    });

   // Now Targeting All Buttons Created
    // Creating an on click event listener to display gif
    $(document).on("click", ".sports-btn", function() {

      // Creating variables for our data-sports
      var sports = $(this).attr("data-sports");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        sports + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Calling upon our ajax to retrieve queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      }) .done(function(response) {

          var results = response.data;
 
          // For Looping through the results length
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='results'>");

            var rating = results[i].rating;

            // Setting the rating variable to print
            var p = $("<p>").text("Rating: " + rating);

            var sportsImage = $("<img>");

            sportsImage.addClass("gif-results")

            // Giving each new button a data still/animate attribute
            sportsImage.attr("src", results[i].images.fixed_height_still.url);
            sportsImage.attr("data-still", results[i].images.fixed_height_still.url);
            sportsImage.attr("data-animate",results[i].images.fixed_height.url);
            sportsImage.attr("data-state","still");
     
          

            gifDiv.prepend(p);
            gifDiv.prepend(sportsImage);


            // Printing gifs to webpage
            $("#gifs-appear-here").prepend(gifDiv);


          }

        // On Click of the Gif to make it animated
        $(".gif-results").on("click", function() {
    
          var state = $(this).attr("data-state");
    
          // If the current state is still, change to animated on click
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          // and if animated, change to still
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
        
      });


    
      // empty results fiels when new button is clicked
      $(".results").empty();

    });


});

