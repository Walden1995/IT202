var zips = [];

function getResults(){
  $.get("https://data.cityofchicago.org/resource/cwig-ma7x.json?$query=select%20results%20group%20by%20results",function(callback){
    $.each(callback,function(indx,curr){
      $('#results').append("<option>"+curr.results+"</option>");
    });
  });
}

function getTypes(){
  $.get("https://data.cityofchicago.org/resource/cwig-ma7x.json?$query=select%20facility_type%20group%20by%20facility_type", function(callback){
   var types = [];
    $.each(callback,function(i,ucurr){
      var istrue = 0;
      if(ucurr.facility_type){
        var currstring = ucurr.facility_type.toUpperCase();
        $.each(types,function(c,tcurr){
          if(tcurr === currstring){
            istrue = 1;
          }
        });

        if(!istrue){
          types.push(currstring);
        }
      }
    });
    $.each(types,function(index,curr){
      $('#types').append("<option>"+curr+"</option>");
    });
  });
}

$(document).ready( function(){
  $.get("https://data.cityofchicago.org/resource/unjd-c2ca.json?$query=%20select%20zip%20group%20by%20zip",function(response){
    $.each(response,function(ix,cu){
      zips.push(cu.zip);
    });
    console.log(zips);
  });

  getTypes();
  getResults();
  document.getElementById("InputBtn").className += " active";
  document.getElementById("Input").style.display = "block";
});

function submit(){
  var zip = $('#zip').val();
  var date = $('#date').val();
  var type = $('#types  :selected').text();
  var result = $('#results  :selected').text();
  var query = "https://data.cityofchicago.org/resource/cwig-ma7x.json?";
  var istrue = 0;
  if(zip != ""){
    $.each(zips,function(indx,curr){
      if(zip === curr){
        istrue = 1;
        console.log(curr);
      }
    });
  }

  if((istrue === 1) || (date != "") || (type != "") || (result != "")){
    query = query+"$query=select * where ";
    console.log("activated?");
  }

  if(istrue === 0 && zip !=""){
    alert("Zip Code is not from Chicago"); 
  } else if(istrue === 1){
    query = query + "zip=" + zip;
    if(date != "" || type != "" || result != ""){
      query = query + " AND ";
    }
  }
  if(date != ""){
    query = query + "inspection_date='" + date + "T00:00:00.000'";
    if(type != "" || result != ""){
        query = query + " AND ";
    }
  }

  if(type != ""){
    query = query + "UPPER(inspection_type)='" + type + "'";
    if(result != ""){
        query = query + " AND ";
    }
  }

  if(result != ""){
    query = query + "results='"+result+"'";
  }
  
  getdata(query);
}

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}