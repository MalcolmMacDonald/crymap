
var points = [];
var mapimg;

var clat = 49.2517118;
var clon = -122.9624611;

var ww = 1024;
var hh = 512;
var zoom = 10;


const publicToken = "?access_token=pk.eyJ1IjoibWFsY29sbW1hY2RvbmFsZCIsImEiOiJjazF3bTZhMHUwMzh2M2NtdHZzeGhuemRjIn0.ItRgGN211RV2MG_bXbYuvw";


function preload() {

  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' + clon + ',' + clat + ',' + zoom + '/' + ww + 'x' + hh + publicToken);
  getFirebasePoints();

}

function setup() {


  createCanvas(ww, hh);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

}
function getFirebasePoints() {

  var firebaseConfig = {
    apiKey: "AIzaSyBrPpdZAlNGzNt62CpajR8ebrW0heH3a2s",
    authDomain: "crymap-208e4.firebaseapp.com",
    databaseURL: "https://crymap-208e4.firebaseio.com",
    projectId: "crymap-208e4",
    storageBucket: "crymap-208e4.appspot.com",
    messagingSenderId: "807429581646",
    appId: "1:807429581646:web:f0c8f4e4b7082314dc4c1f",
    measurementId: "G-3FPQWDDBTR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  console.log(firebase);
  var database = firebase.database();
  var ref = database.ref('hortons');
  ref.on("value", gotData, errData);
}

function gotData(data) {
  points.push(data.val());

  console.log(points);

  var cx = mercX(clon);
  var cy = mercY(clat);
  translate(width / 2, height / 2);
  for (var i = 0; i < points[0].length; i++) {
    var pointData = points[0][i];
    console.log(pointData);
    var lat = pointData.coordinates[1];
    var lon = pointData.coordinates[0];
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;
    // This addition fixes the case where the longitude is non-zero and
    // points can go off the screen.
    /* if (x < - width / 2) {
       x += width;
     } else if (x > width / 2) {
       x -= width;
     }*/
    stroke(255, 0, 255);
    fill(255, 0, 255, 200);
    ellipse(x, y, 5, 5);
  }
}
function errData(data) {
  console.log(data);
}


function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}


function draw() {

  //background(18);

}
