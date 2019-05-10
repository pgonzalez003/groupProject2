// Get references to page elements
var $name = $("#name");
var $gameid = $("#gameid");
var $picks = $("#pick");
var $wager = $("#wager");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
// eslint-disable-next-line no-unused-vars
var games;

// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function(users) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(users)
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
        .attr("href", "/users/" + user.id);

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
    username: $name.val().trim(),
    // gameID: $gameid.val().trim(),

    picks: $picks.val().trim()
    // wager: $wager.val().trim()
  };

  if (!(user.username && user.wager)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveUser(user).then(function() {
    refreshUsers();
  });

  $name.val("");
  $gameid.val("");
  $picks.val("");
  $wager.val("");
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

function showGames() {
  // Here we are building the URL we need to query the database
  var queryURL = "api/games";

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
      // Log the resulting object


      var results = response[0].data;
      console.log(results[0]);


      //Creates radio buttons for all games
      for (var i = 0; i < results.length; i++) {
        var team1 = results[i].teams[0];
        var team2 = results[i].teams[1];

        $("#games").append(
          `<input type="radio" id = "pick" name="pick${[
            i
          ]}"value="${team1}">${team1} at <input type="radio" name="pick${[
            i
          ]}" value="${team2}">${team2}<br>`
        );
      }
    });
}

$(document).ready(function() {

  $("#gameArea").hide();
  $("#inputUser").show();
  showGames();
});

$("#submit").on("click", function() {
  console.log("works");
  $("#inputUser").hide();
  $("#gameArea").show();
});
