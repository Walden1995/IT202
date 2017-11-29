function plotNasa(input, lat, long){
  if(input != ""){
    $.get(input,function(response){
      console.log(response);
      plotdata(response, initMap(), lat, long);
    });
  }
}

function initMap() {
  var uluru = {lat: 41.8781, lng: -87.6298};
  var map = new google.maps.Map(document.getElementById('Map'), {
    zoom: 6,
    center: uluru
  });
  return map;
}

function plotdata(datatoplot,gmap, lat, long){
  // gmap.center = {lat: lat, lng: long};
  
  $.each(datatoplot,function(index,curr){
    var newpos = {lat: parseFloat(curr.geolocation.coordinates[1]), lng: parseFloat(curr.geolocation.coordinates[0])};
    console.log(newpos);
    var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>';
    if(curr.fall === "Fell"){
      contentString = contentString + '<h2 id="firstHeading" class="firstHeading" style="background-color:red">'+curr.name+'</h1>';
    } else if (curr.results === "Found"){
      contentString = contentString + '<h2 id="firstHeading" class="firstHeading" style="background-color:green">'+curr.name+'</h1>';
    }
    
    contentString = contentString + '<div id="bodyContent">'+
    '<p><b>'+curr.id +' is a '+curr.recclass +'</p><p>Reported on: '+ curr.year.split("T",1)[0] +
    '</p>'+
    '</div>'+
    '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: newpos,
      map: gmap,
      title: curr.id + " " + curr.fall
    });
    
    marker.addListener('click', function() {
      infowindow.open(gmap, marker);
    });
  });
}