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
  }
};


function loadImage(){
  var subjectN = document.getElementById("subjectNumber").value;
  document.getElementById("image").src = "lib/stills/v" + subjectN + "/001.png";
};

function showImageMask() {
  document.getElementById("imageMaskSpace").style.backgroundColor = "red";
  var maskSpace = document.getElementById("imageMaskSpace");

  if(maskSpace.style.height != "0px") { //setting height and width
    maskSpace.style.height = document.getElementById("image").height.toString() + "px";
    maskSpace.style.width = document.getElementById("image").width.toString() + "px";
  }
};

function hideImageMask() {
  document.getElementById("imageMaskSpace").style.backgroundColor = "transparent";
};
