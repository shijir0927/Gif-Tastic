// Global Variables
let sportsList = ["Avengers", "Citizen Kane", "Forrest Gump", "Star Wars"]

// Function to render buttons, can add additional buttons using the add sport form
function renderButton() {

    $("#button-holder").empty()

    for (let i = 0; i < sportsList.length; i++) {

        let newButton = $("<button>");
        newButton.addClass("newgif btn btn-success")
        newButton.attr("data-name", sportsList[i])
        newButton.text(sportsList[i].charAt(0).toUpperCase() + sportsList[i].slice(1))
        $("#button-holder").append(newButton)


    }
}

// will append the rating and gif affiliated with the clicked button's value
function gifGenerator() {

    let apiKey = "VJbsDpwKy6yKGBcWTMuS5L3HfkyJvA6n"
    let userChoice = $(this).attr("data-name")
    console.log(userChoice)
    let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q="${userChoice}"&limit=10&offset=0&rating=&lang=en`

    $(".gif-holder").empty();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)

        let results = response.data

        for (let i = 0; i < results.length; i++) {

            // storing urls into a variable
            let animateURL = response.data[i].images.downsized.url
            let stillURL = response.data[i].images.downsized_still.url

            // rating append
            let newGifs = $(`<div class="jumbotron imgstyle border bg-dark">`)
            newGifs.append(`<h2  style="margin-bottom: 25px;">  Rating : ${results[i].rating.toUpperCase()}</h2>`)

            // image append
            let image = $("<img>").addClass("toggler img-fluid")
            image.attr("src", animateURL)
            image.attr("data-still", stillURL)
            image.attr("data-animate", animateURL)
            image.attr("data-state", "animate")
            newGifs.append(image)

            // append all gifs to the holder
            $(".gif-holder").append(newGifs)
        }
    })
}

// toggle between still and animated gifs with an on click event
function gifToggler() {

    // storing "this" attributes into variables
    let state = $(this).attr("data-state");
    let animate = $(this).attr("data-animate");
    let still = $(this).attr("data-still");

    // will set the gif to the still url
    if (state == "animate") {

        $(this).attr("src", still)
        $(this).attr("data-state", "still")
    }
    // will set the gif to the animated url
    else {
        $(this).attr("src", animate)
        $(this).attr("data-state", "animate")
    }
}

// adds a category to the button holder after it receives a response from the ajax call.  if there is no response, then the category doesn't exist
$("#add-sport").on("click", function(event) {

    event.preventDefault();

    let newSport = $("#sport-input").val().trim()

    // Checks to see if anything was typed into the search box
    if (newSport.length < 1) {
        alert("You must type something in!")
        return;
    }
    // does an AJAX call to see if the added category exists so it won't create a button that has no response
    else {

        let apiKey = "VJbsDpwKy6yKGBcWTMuS5L3HfkyJvA6n"
        let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q="${newSport}"&limit=10&offset=0&rating=&lang=en`

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            if (response.data.length == 0) {
                alert("you did not input a valid field")
                $("#sport-input").val("")
                return;

            } else {
                sportsList.push(newSport)
                renderButton()
                $("#sport-input").val("")
            }
        })
    }
})

// called functions & event listeners 
renderButton();
$(document).on("click", ".newgif", gifGenerator)
$(document).on("click", ".toggler", gifToggler)