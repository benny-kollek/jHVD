// hard coded global variables:
frames = 240;
bufferTime = 40;
// note: subjectN is global by user input

// soft coded global variables:
subject = [];
markedCoordinates = [];


function selectMarkers(){
  showImageMask();
  if(document.getElementById("selectMarkersButton").innerHTML == "Done"){
    document.getElementById("selectMarkersButton").innerHTML = "Select Markers";
    document.getElementById("selectMarkersButton").style.color = "black";
    hideImageMask();
  }
  else {
    document.getElementById("selectMarkersButton").innerHTML = "Done";
    document.getElementById("selectMarkersButton").style.color = "red";
  };
};


function loadImage(){
  subjectN = document.getElementById("subjectNumber").value;
  document.getElementById("image").src = "lib/stills/" + subjectN + "/s 001.png";
};

function loadMask(){
  var maskSpace = document.getElementById("imageMaskSpace");
  maskSpace.style.height = document.getElementById("image").height.toString() + "px";
  maskSpace.style.width = document.getElementById("image").width.toString() + "px";
  document.getElementById("loadMaskButton").style.color = "green";
  document.getElementById("loadMaskButton").innerHTML = "Mask Loaded";
  document.getElementById("loadMaskButton").disabled = true;
  document.getElementById("selectMarkersButton").disabled = false;
  document.getElementById("analyzeButton").disabled = false;


};

function showImageMask() {
  document.getElementById("imageMaskSpace").style.opacity = "0.2";
};

function hideImageMask() {
  document.getElementById("imageMaskSpace").style.opacity = "0";
};

//Every time the image is clicked, a coordinate is added to the global array
//And a divider is created to mark the spot that has been clicked
function pointClick(event) {
  markedCoordinates.push({x:event.clientX, y:event.clientY, r: 0, g: 0, b:0, l:0});
  var id = event.clientX.toString() + 'x' + event.clientY.toString();
  console.log("Clicked: " + id);
  var newPix = '<div class="pix" id="' + id + '"></div>';
  document.getElementById("imageMaskSpace").innerHTML = document.getElementById("imageMaskSpace").innerHTML.concat(newPix);
  setTimeout(function(){
    document.getElementById(id).style.left = event.clientX.toString() + "px";
    document.getElementById(id).style.top = event.clientY.toString() + "px";
  }, 300);
}

//This function is run when the analyze button is clicked
//CHecks if any coordinates have been clicked, then runs startOnloadLoop()
function analyzeSubject(){
  if(markedCoordinates.length == 0){
    window.alert("No coordinates have been selected")
  }
    else {
    analyzeFrame();
    }
}

function getFrame(){
  return parseInt(document.getElementById("image").src.slice(39,42));
}

function incrementSrc(){
  console.log("on frame: " + getFrame());
  var newFrame = lpad((getFrame() + 1), 3);
  //maybe pass parameter of the frame to analyze to analyzeFrame?
  document.getElementById("image").src = "lib/stills/" + subjectN + "/s " + newFrame + ".png";
  console.log("incremented to frame : " + newFrame);
  setTimeout(function(){
    checkLoad(newFrame);
  }, bufferTime);
}

function checkLoad(newFrame){
  if(!document.getElementById("image").complete){
    console.log(getFrame(newFrame) + " did not load, try to increase buffer time");
  }
  else{
    console.log(getFrame(newFrame) + " loaded")
    analyzeFrame();
  }
}

function analyzeFrame(){
    console.log("analyzeFrame() has begun for frame " + getFrame());
    document.getElementById("image").onload = null;
    var coordinates = markedCoordinates;
    img = document.getElementById('image');
    canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
      for(i=0; i<markedCoordinates.length; i++){
        var x = coordinates[i].x;
        var y = coordinates[i].y;
        //in the following line I could potentially get an entire rectangle (for now 1 pixel)
        var pixelData = canvas.getContext('2d').getImageData(x, y, x+1, y+1).data;
        coordinates[i].r = pixelData[0];
        coordinates[i].g = pixelData[1];
        coordinates[i].b = pixelData[2];
        coordinates[i].l = brightness(coordinates[i]);
      }
      console.log("about to push");
    subject.push($.extend(true, {}, coordinates));
    console.log("coordinates of frame " + getFrame() + " pushed");
    if(getFrame() < 240){
      console.log("about to increment frame");
      incrementSrc();
    }
    else{
      csvDownload();
    }
}

function brightness(coordinates){
  var r = coordinates.r;
  var g = coordinates.g;
  var b = coordinates.b;
  return Math.sqrt((0.241*r)*(0.241*r)+(0.691*g)*(0.691*g)+(0.068*b)*(0.068*b))
}

function lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}


function csvDownload(){
  var csvArray = ["Subject Number", "Frame Number", "Point X", "Point Y", "R", "G", "B", "L"]
  for(n=0;n<subject.length; n++){
    for(m=0;m<Object.keys(subject[n]).length;m++){
      csvArray.push(subjectN);
      csvArray.push(n);
      csvArray.push(subject[n][m].x);
      csvArray.push(subject[n][m].y);
      csvArray.push(subject[n][m].r);
      csvArray.push(subject[n][m].g);
      csvArray.push(subject[n][m].b);
      csvArray.push(subject[n][m].l);
      console.log(csvArray);
    }
  }
  console.log(csvArray);
  var csvString = csvArray.join(",");
  console.log(csvString);
  //use .join to turn the array into a string
  //make sure to use comma as separator
  //%0A?
}
