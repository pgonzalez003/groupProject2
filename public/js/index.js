// Get references to page elements
var $userText = $("#user-text");
var $userDescription = $("#user-description");
var $submitBtn = $("#submit");
var $userList = $("#user-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveuser: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(user)
    });
  },
  getusers: function() {
    return $.ajax({
      url: "api/users",
      type: "GET"
    });
  },
  deleteuser: function(id) {
    return $.ajax({
      url: "api/users/" + id,
      type: "DELETE"
    });
  }
};

// refreshusers gets new users from the db and repopulates the list
var refreshusers = function() {
  API.getusers().then(function(data) {
    var $users = data.map(function(user) {
      var $a = $("<a>")
        .text(user.text)
        .attr("href", "/user/" + user.id);

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

    $userList.empty();
    $userList.append($users);
  });
};

// handleFormSubmit is called whenever we submit a new user
// Save the new user to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var user = {
    text: $userText.val().trim(),
    description: $userDescription.val().trim()
  };

  if (!(user.text && user.description)) {
    alert("You must enter an user text and description!");
    return;
  }

  API.saveuser(user).then(function() {
    refreshusers();
  });

  $userText.val("");
  $userDescription.val("");
};

// handleDeleteBtnClick is called when an user's delete button is clicked
// Remove the user from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteuser(idToDelete).then(function() {
    refreshusers();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$userList.on("click", ".delete", handleDeleteBtnClick);
