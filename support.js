function loadJS() {
  //document.getElementById("selectMarkersButton").addEventListener("click", selectMarkers());
};

function selectMarkers(){
  if(document.getElementById("selectMarkersButton").innerHTML == "Done"){
    document.getElementById("selectMarkersButton").innerHTML = "Select Markers";
    document.getElementById("selectMarkersButton").style.color = "black";
  }
  else {
    document.getElementById("selectMarkersButton").innerHTML = "Done";
    document.getElementById("selectMarkersButton").style.color = "red";
  }
};
