// The code in add.js handles what happens when the user clicks the "Add a book" button.

// When user clicks add-btn
$("#add-btn").on("click", function(event) {
  event.preventDefault();

  // Make a newBook object
  var newPick = {
    Name: $("#name")
      .val()
      .trim(),
    GameID: $("#gameid")
      .val()
      .trim(),
    // Pick: $("#pick")
    //   .val()
    //   .trim(),
    Wager: $("#wager")
      .val()
      .trim()
  };

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newPick)
    // On success, run the following code
    .then(function(data) {
      // Log the data we found
      console.log(data);
    });

  // Empty each input box by replacing the value with an empty string
  $("#name").val("");
  // $("#pick").val("");
});
