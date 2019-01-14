window.onload = function () {



    // Initial array of topics
    var topics = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

    function renderButtons() {
        $("#gif-buttons").empty();
        // Delete the content inside the gif-buttons div before to adding a new button
        // (this is necessary otherwise you will have repeat buttons)

        // Loop through the array of topics, then generate buttons for each topic in the array
        for (i = 0; i < topics.length; i++) {
            var gifBtn = $("<button>");
            gifBtn.addClass("btn btn-secondary").attr("type", "button").attr("data-name", topics[i]);
            gifBtn.text(topics[i]);
            gifBtn.appendTo("#gif-buttons");
        }



    }

    $(document).on("click", ".gif", function () {
        console.log("gif");
        var imgEl = $(this);
        var state = imgEl.attr("data-state");
        var dataStill = imgEl.attr("data-still");
        var dataAnimate = imgEl.attr("data-animate");


        console.log(state);
        if (state === "still") {
            imgEl.attr("data-state", "animate");

            imgEl.attr("src", dataAnimate);

            console.log(state);
        } else {
            imgEl.attr("data-state", "still");

            imgEl.attr("src", dataStill);

            console.log(state);
        }
    });

    function getGifs(Search, numberOfGifs) {
        // this removes the spaces and replaces them with an +
        Search = Search.replace(/\s+/g, '+');
        //make gif-view empty
        $("#gif-view").empty();
        // Here we construct our URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            Search + "&api_key=dc6zaTOxFJmzC&limit=" + numberOfGifs;

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                var results = response.data;


                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    console.log(results[i].images);

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var personImage = $("<img>");
                    personImage.addClass("gif").attr("src", results[i].images.fixed_height_still.url);
                    personImage.attr("data-state", "still");
                    personImage.attr("data-still", results[i].images.fixed_height_still.url)
                    personImage.attr("data-animate", results[i].images.fixed_height.url)


                    // personImage.addClass("gif").attr("src", results[i].images.fixed_height.url).attr("data-state", "still");




                    gifDiv.append(p);
                    gifDiv.append(personImage);

                    $("#gif-view").append(gifDiv);
                }
            });

    };



    // This .on("click") function will trigger the AJAX Call
    $("#find-gif").on("click", function (event) {

        // Preventing the submit button from trying to submit the form
        // We're optionally using a form so the user may hit Enter to search instead of clicking the button
        event.preventDefault();
        console.log("hi");

        // Here we grab the text from the input box
        var Search = $("#gif-input").val();
        var numberOfGifs = $("#number-input").val();
        console.log(numberOfGifs);
        //is Search empty?
        if (Search !== "") {
            topics.push(Search);
            // renderButtons function call, rendering the list of buttons
            renderButtons();
            getGifs(Search, numberOfGifs);
        }

    });


    $(document).on("click", ".btn", function () {

        var selectedGif = $(this).attr("data-name");
        var numberOfGifs = $("#number-input").val();


        console.log("selected Gif ", selectedGif);
        getGifs(selectedGif, numberOfGifs);
    });


    renderButtons();

};