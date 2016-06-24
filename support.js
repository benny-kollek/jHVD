function selectMarkers(){
  loadImageMask();
  if(document.getElementById("selectMarkersButton").innerHTML == "Done"){
    document.getElementById("selectMarkersButton").innerHTML = "Select Markers";
    document.getElementById("selectMarkersButton").style.color = "black";
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

function loadImageMask() {
  var maskSpace = document.getElementById("imageMaskSpace");
  var image = document.getElementById("image");
  var h = document.getElementById("image").height.toString() + "px";
  var w = document.getElementById("image").width.toString() + "px";
  console.log(h);
  console.log(w);

  maskSpace.style.height = h;
  maskSpace.style.width = w;


};
