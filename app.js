
var firebaseConfig = {
  apiKey: "AIzaSyDhCrYVVdR5KLqrUZn2qqyJdNIGGau4s2c",
  authDomain: "fir-demo-6dcaf.firebaseapp.com",
  databaseURL: "https://fir-demo-6dcaf.firebaseio.com",
  projectId: "fir-demo-6dcaf",
  storageBucket: "fir-demo-6dcaf.appspot.com",
  messagingSenderId: "254292077950",
  appId: "1:254292077950:web:30513dc145367b62"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var clickCounter = 0;
var database = firebase.database();

$('.btn').on('click', function (event) {
  event.preventDefault();
  var trainName = $('#data-train-name').val();
  var destination = $('#data-destination').val();
  var firstTrain = $('#data-first-train').val();
  var frequency = $('#data-frequency').val();

  var newTrain = {
    name: trainName,
    destination: destination,
    first: firstTrain,
    freq: frequency
  };

  database.ref().push(newTrain);
  $('#data-train-name').val('');
  $('#data-destination').val('');
  $('#data-first-train').val('');
  $('#data-frequency').val('');
})



database.ref().on('child_added', function (childSnapshot) {
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination
  var firstTrain = childSnapshot.val().first
  var frequency = childSnapshot.val().freq

  var nameCell = $('<td>').text(trainName);
  var destCell = $('<td>').text(destination);
  // var firstCell = $('<td>').text(firstTrain);
  var freqCell = $('<td>').text(frequency);


  var firstTrainTime = moment(firstTrain, 'hh:mm');
  console.log(firstTrainTime)

  var now = moment().format('HH:mm');
  console.log('now', now)

  var timeDiff = moment().diff(moment(firstTrainTime), 'minutes');
  console.log('timeDiff', timeDiff);

  var remainder = timeDiff % frequency;
  console.log(remainder);

  var minutesAway = frequency - remainder;
  var minCell = $('<td>').text(minutesAway);
  console.log('minutesAway', minutesAway);

  var nextArrival = moment().add(minutesAway, 'minutes').format('HH:mm');
  console.log(nextArrival);
  var nextCell = $('<td>').text(nextArrival);

  var newRow = $('<tr>').append(nameCell, destCell, freqCell, nextCell, minCell);
  $('.table').append(newRow)
})
