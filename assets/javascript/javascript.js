$(document).ready(function () {
    // Tv show array
    var actions = ["Hey Arnold", "Teen Titans Go", "Doug", "Spiderman", "Teenage Mutan Ninja Turtles", "Dragon Ball Z", "Care Bears", "Fraggle Rock", "Attack on Titans", "One Punch"];

    // Display and Erase Giphy
    function displayGiphyButtons() {
        $("#buttons").empty();
        for (var i = 0; i < actions.length; i++) {
            var giphyButton = $("<button>");
            giphyButton.addClass("action");
            giphyButton.addClass("btn btn-primary")
            giphyButton.attr("data-name", actions[i]);
            giphyButton.text(actions[i]);
            $("#buttons").append(giphyButton);
        }
    }
    //Add Giphy Button
    function addNewButton() {
        $("#add").on("click", function () {
            var action = $("#action-input").val().trim();
            if (action == "") {
                return false;
            }
            actions.push(action);

            displayGiphyButtons();
            return false;
        });
    }
    // Remove and empty last
    function removeLastButton() {
        $("removeGiphys").on("click", function () {
            actions.pop(action);
            displayGiphyButtons();
            return false;
        });
    }
    // Displays all of the giphy// Console log
    function displayGiphys() {
        var action = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=7i2Zej99sLJuGZVtjkV0Ts26aGdlcVVK";
        console.log(queryURL);
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function (response) {
                console.log(response);
                $("#giphy").empty();
                var results = response.data;
                if (results == "") {
                    alert("No Giphy available");
                }
                for (var i = 0; i < results.length; i++) {

                    var divs = $("<div>");
                    divs.addClass("giphyDiv");
                    // Rating
                    var rating = $("<p>").text("Rating: " + results[i].rating);
                    divs.append(rating);
                    // Images
                    var image = $("<img>");
                    image.attr("src", results[i].images.fixed_height_small_still.url);
                    image.attr("data-still", results[i].images.fixed_height_small_still.url);
                    image.attr("data-animate", results[i].images.fixed_height_small.url);
                    image.attr("data-state", "still");
                    image.addClass("image");
                    divs.append(image);
                    $("#giphy").prepend(divs);
                }
            });
    }
    // Calling Button
    displayGiphyButtons();
    addNewButton();
    removeLastButton();

    // Event Listeners
    $(document).on("click", ".action", displayGiphys);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});