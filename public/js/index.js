// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(example)
    });
  },
  getUsers: function() {
    return $.ajax({
      url: "api/users",
      type: "GET"
    });
  },
  deleteUser: function(id) {
    return $.ajax({
      url: "api/users/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshUsers = function() {
  API.getUsers().then(function(data) {
    var $examples = data.map(function(user) {
      var $a = $("<a>")
        .text(user.username)
        .attr("href", "/example/" + user.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": user.id
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
var handleFormSubmit = function(event) {
  event.preventDefault();

  var user = {
    username: $exampleText.val().trim(),
    picks: $exampleDescription.val().trim()
  };

  if (!(user.username && user.picks)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveUser(user).then(function() {
    refreshUsers();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteUser(idToDelete).then(function() {
    refreshUsers();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);


function showGames(){
  
  

  // Here we are building the URL we need to query the database
  var queryURL = "api/examples";

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
      // Log the resulting object
      console.log(response.data);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {


      //   var radioBtn = $('<input type="radio" name="rbtnCount" />');
      //   var gameForm = $("<form>");

        var resultsDiv = $("<div>");
        

        // var odds1 = $("<p>").text(results[i].sites[0].odds.h2h[0]);
        // var odds2 = $("<p>").text(results[i].sites[0].odds.h2h[1]);

        const team1 =
          results[i].teams[0] + ": " + results[i].sites[0].odds.h2h[0];
        const team2 =
          results[i].teams[1] + ": " + results[i].sites[0].odds.h2h[1];

        // const team1 = results[i].teams[0];
        // const team2 = results[i].teams[1];
        
        const matchup = team1 +  " vs " + team2;

        resultsDiv.append(matchup);
        

        // gifRow.append(gifCol);
        // gifCol.append(gifDiv);

        $("#games").append(resultsDiv);
        console.log("appends");
      }
    });
}

// axios
// .get("https://api.the-odds-api.com/v3/odds/?sport=baseball_mlb&region=us&mkt=h2h&apiKey=968ebf4314e248c0b7903d03b1ff6c2b")
// .then(function(response) {
//   res.json(response.data);
// });



$(document).ready(function(){
  console.log("works");
  showGames();
});

