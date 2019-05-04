// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

$("#odds").on("click", function () {
  console.log("here");

  var mykey = "968ebf4314e248c0b7903d03b1ff6c2b"

  // Here we are building the URL we need to query the database
  var queryURL = "https://api.the-odds-api.com/v3/odds/?sport=baseball_mlb&region=us&mkt=h2h&apiKey=" + mykey;

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

      // Log the resulting object
      console.log(response.data);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {


        var radioBtn = $('<input type="radio" name="rbtnCount" />');
        

        var resultsDiv = $("<div>");

        // var odds1 = $("<p>").text(results[i].sites[0].odds.h2h[0]); 
        // var odds2 = $("<p>").text(results[i].sites[0].odds.h2h[1]);  

        const team1 = results[i].teams[0] + ": " + results[i].sites[0].odds.h2h[0];
        const team2 = results[i].teams[1] + ": " + results[i].sites[0].odds.h2h[1];

        const matchup = $("<p>").text(team1 + " vs " + team2 + " ");

       

        resultsDiv.append(matchup);
        radioBtn.appendTo(matchup);


        // gifRow.append(gifCol);
        // gifCol.append(gifDiv);

        $("#odds").append(resultsDiv);
      }

    });
});
