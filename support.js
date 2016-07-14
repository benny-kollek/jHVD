// hard coded global variables:
frames = 240;

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

function analyzeSubject(){
  if(markedCoordinates.length == 0){
    window.alert("No coordinates have been selected")
  }
    else {
    //   for(currentFrame = 1; currentFrame <= frames; currentFrame ++){
    //     loadFrame(currentFrame, analyzeFrame);
    //     //analyzeFrame();
    // }
    startOnLoadLoop();
  }
}

function startOnloadLoop(){
  document.getElementById("image").onload = analyzeFrame();
  incrementSrc();
}

function getFrame(){
  return parseInt(document.getElementById("image").src.slice(39,42));
}

function incrementSrc(){
  var newFrame = lpad((getFrame() + 1), 3);
  console.log(newFrame);
  document.getElementById("image").src = "lib/stills/" + subjectN + "/s " + newFrame + ".png";
}

//add an onload event to the image that calls analyze frame
//i can't use a loop to change the name of the src
//tag it an onload function when we click analyze
// the onload function analyzes the frame, then reloads itself
//the onload function reads it's own image src and increases by one
//until limit
function loadFrame(currentFrame, callback){
  threeFrame = lpad(currentFrame, 3);
  //document.getElementById("image").src = "lib/stills/" + subjectN + "/s " + threeFrame + ".png";
  // the above line is the problem. We need to wait for it to finish before moving on
  $('#image').attr('src',"lib/stills/" + subjectN + "/s " + threeFrame + ".png");
  if(!document.getElementById("image").complete){
    console.log(currentFrame + " did not load");
  }
  else{
    console.log(currentFrame + " loaded")
  }
  callback();
}

function analyzeFrame(){
    var coordinates = markedCoordinates;
    img = document.getElementById('image');
    canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
      for(i=0; i<markedCoordinates.length; i++){
        var x = markedCoordinates[i].x;
        var y = markedCoordinates[i].y;
        //in the following line I could potentially get an entire rectangle (for now 1 pixel)
        var pixelData = canvas.getContext('2d').getImageData(x, y, x+1, y+1).data;
        coordinates[i].r = pixelData[0];
        coordinates[i].g = pixelData[1];
        coordinates[i].b = pixelData[2];
        coordinates[i].l = brightness(coordinates[i]);
      }
    subject.push(coordinates);
}

//n is point in markedCoordinates array
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
