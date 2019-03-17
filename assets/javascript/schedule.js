  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA0RvjYaXvS77Q0UMcrU78Esc07Ec7G6Ok",
    authDomain: "projectpaul-e79a6.firebaseapp.com",
    databaseURL: "https://projectpaul-e79a6.firebaseio.com",
    projectId: "projectpaul-e79a6",
    storageBucket: "projectpaul-e79a6.appspot.com",
    messagingSenderId: "61422469449"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// 2. Button for adding trains // using the preventdefault button only when using the submit button to prevent the page from reloading
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainStart = $("#first-train-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    endpoint:destination,
    start: trainStart,
    interval: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain);

  // Clears all of the text-boxes after new train schedule is appended
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().endpoint;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().interval;

    var trainStartConverted = moment(trainStart, "hh:mm").subtract(1, "years");

    var timeDifference = moment().diff(moment(trainStartConverted), "minutes");

    var timeApart = timeDifference%trainFrequency;

    var minUntil = trainFrequency - timeApart;

    var arrivalTime = moment().add(minUntil, "m").format("LT");
  
    // Create the new row on the train schedule table
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(trainFrequency),
      $("<td>").text(arrivalTime),
      $("<td>").text(minUntil),
    );
  
    // // Append the new row to the table
    $("#train-table > tbody").append(newRow);


  });