function getdata(input){
  initMap(input);
}

function initMap(input) {
  var uluru = {lat: 41.8781, lng: -87.6298};
  var map = new google.maps.Map(document.getElementById('Map'), {
    zoom: 10,
    center: uluru
  });
  
  if(input != ""){
    $.get(input,function(response){
      console.log(response);
      plotdata(response,map);
    });
  }
}

function plotdata(datatoplot,gmap){
  $("#textout").empty();
  var div = $("#textout");
  var i = 0;

  $.each(datatoplot,function(index,curr){
    i++;
    var card = $("#sample").clone();
    card.removeClass("tabinactive");    
    
    var newpos = {lat: parseFloat(curr.latitude), lng: parseFloat(curr.longitude)};
    
    var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>';
    if(curr.results === "Buisness Not Located" || curr.results === "Fail"){
      contentString = contentString + '<h2 id="firstHeading" class="firstHeading" style="background-color:red">'+curr.inspection_id+'</h1>';
    } else if (curr.results === "Out of Business" || curr.results === "Not Ready" || curr.results === "No Entry" || curr.results === "Pass w/ Conditions"){
      contentString = contentString + '<h2 id="firstHeading" class="firstHeading" style="background-color:orange">'+curr.inspection_id+'</h1>';
    } else {
      contentString = contentString + '<h2 id="firstHeading" class="firstHeading" style="background-color:green">'+curr.inspection_id+'</h1>';      
    }
    
    contentString = contentString + '<div id="bodyContent">'+
    '<p><b>'+curr.dba_name +' is a '+curr.facility_type +
    ' located at '+curr.address+'</p><p>Inspected on: '+ curr.inspection_date.split("T",1)[0] +
    '</p><p>Inspection status: '+ curr.results +
    '</p>'+
    '</div>'+
    '</div>';

    if(curr.results === "Buisness Not Located" || curr.results === "Fail"){
      card.find("#title").attr("style","background-color:#ff7777");
    } else if (curr.results === "Out of Business" || curr.results === "Not Ready" || curr.results === "No Entry" || curr.results === "Pass w/ Conditions"){
      card.find("#title").attr("style","background-color:#ff9933");
    } else {
      card.find("#title").attr("style","background-color:#bbff55");
    }

    card.find("#title").text(curr.inspection_id);
    card.find("#name").text(curr.dba_name);
    card.find("#cardinfo").text(curr.facility_type + " at " + curr.address + " had inspection on " + curr.inspection_date.split("T",1)[0]);
    card.find("#status").text("Status: " + curr.results);
    div.append(card);

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: newpos,
      map: gmap,
      title: curr.inspection_id + " " + curr.results
    });
    
    marker.addListener('click', function() {
      infowindow.open(gmap, marker);
    });
  });
  $("#Numcount").text(i + " inspections returned.");
}