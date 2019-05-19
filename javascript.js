$(document).ready(function(){

var joestars = [
'joestar',
]

function addImages(array, classToUse, WhereToAdd){
    $(WhereToAdd).empty();

    for (var i = 0; i < array.lenght; i++){
        var button = $("<button>");
        button.addClass(classToUse);
        button.attr("data-type", array[i]);
        button.text(array[i]);
        $(WhereToAdd).append(button);
    }

}

$(document).on("click", ".gif-button", function() {
    $("#gifs").empty();
    $(".gif-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=mBoR3nZ7qXtet9jiPGz483RPeP1OMwyy";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;

        for (var i =0; i < results.lenght; i++){
            var gifDiv = $("<div class=\'gif-item\'>");
            var rating = results[i].rating;
            var p = $("<p>").text("rating: " + rating);
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;

            var gifImage = $("<img>");
            gifImage.attr("src", still);
            gifImage.attr("data-still", still);
            gifImage.attr("data-animate",animated);
            gifImage.attr("data-state","still");
            gifImage.addClass("gif-image");

            gifDiv.append(p);
            gifDiv.append(gifImage);

            $("#gifs").append(gifDiv);
        }
    });
});

$(document).on("click", ".gif-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    var newGif = $("input").eq(0).val();

    if (newGif.length > 2) {
      joestars.push(newGif);
    }

    addImages(joestars, "gif-button", "#gif-buttons");

  });

  addImages(joestars, "gif-button", "#gif-buttons");

})