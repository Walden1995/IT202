function getdata(input){
  console.log(input);
  initMap(input);
}



function initMap(input) {
  console.log("map");
  var uluru = {lat: 41.8781, lng: -87.6298};
  var map = new google.maps.Map(document.getElementById('Map'), {
    zoom: 5,
    center: uluru
  });
  
  if(input != ""){
    $.get(input,function(response){
      console.log(response);
      plotdata(response,map);
    });
  }
}

function initmap() {
  console.log("map");
  var uluru = {lat: 41.8781, lng: -87.6298};
  var map = new google.maps.Map(document.getElementById('Map'), {
    zoom: 5,
    center: uluru
  });
}


function plotdata(datatoplot,gmap){
  $.each(datatoplot,function(index,curr){
    var newpos = {lat: parseFloat(curr.latitude), lng: parseFloat(curr.longitude)};
    
    var contentString = curr.inspection_id;
    
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: newpos,
      map: gmap,
      title: curr.inspection_id
    });
    
    marker.addListener('click', function() {
      infowindow.open(gmap, marker);
    });
  });
}