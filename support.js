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
  var subjectN = document.getElementById("subjectNumber").value;
  document.getElementById("image").src = "lib/stills/v" + subjectN + "/001.png";
};

function loadMask(){
  var maskSpace = document.getElementById("imageMaskSpace");
  maskSpace.style.height = document.getElementById("image").height.toString() + "px";
  maskSpace.style.width = document.getElementById("image").width.toString() + "px";
  document.getElementById("loadMaskButton").style.color = "green";
  document.getElementById("loadMaskButton").innerHTML = "Mask Loaded";
  document.getElementById("loadMaskButton").disabled = true;
};

function showImageMask() {
  document.getElementById("imageMaskSpace").style.opacity = "0.2";
};

function hideImageMask() {
  document.getElementById("imageMaskSpace").style.opacity = "0";
};

function pointClick(event) {
  markedCoordinates.push({x:event.clientX, y:event.clientY, r: 0, g: 0, b:0, l1:0, l2:0, l3:0});
  var id = event.clientX.toString() + 'x' + event.clientY.toString();
  console.log("Clicked: " + id);
  var newPix = '<div class="pix" id="' + id + '"></div>';
  document.getElementById("imageMaskSpace").innerHTML = document.getElementById("imageMaskSpace").innerHTML.concat(newPix);
  setTimeout(function(){
    document.getElementById(id).style.left = event.clientX.toString() + "px";
    document.getElementById(id).style.top = event.clientY.toString() + "px";
  }, 300);
}

function analyze(){
  var img = document.getElementById('image');
  var canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

  for(i=0; i<markedCoordinates.length; i++){
    var x = markedCoordinates[i].x;
    var y = markedCoordinates[i].y;
    //in the following line I could potentially get an entire rectangle (for now 1 pixel)
    var pixelData = canvas.getContext('2d').getImageData(x, y, x+1, y+1).data;
    markedCoordinates[i].r = pixelData[0];
    markedCoordinates[i].g = pixelData[1];
    markedCoordinates[i].b = pixelData[2];
    setBrightness(i);
  }
}

//n is point in markedCoordinates array
function setBrightness(n){
  var r = markedCoordinates[n].r
  var g = markedCoordinates[n].g
  var b = markedCoordinates[n].b
  markedCoordinates[n].l1 = Math.sqrt((0.241*r)+(0.691*g)+(0.068*b)
  
}
