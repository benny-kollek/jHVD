function loadJS() {
  //document.getElementById("selectMarkersButton").addEventListener("click", selectMarkers());
};

function selectMarkers(){
  if(document.getElementById("selectMarkersButton").innerHTML == "Done"){
    document.getElementById("selectMarkersButton").innerHTML = "Select Markers";
  }
  else {
    document.getElementById("selectMarkersButton").innerHTML = "Done";
  }
};
