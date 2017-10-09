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
        var currstring = ucurr.facility_type;
        $.each(types,function(c,tcurr){
          if(tcurr === currstring.toUpperCase()){
            istrue = 1;
          }
        });

        if(!istrue){
          types.push(currstring.toUpperCase());
        }
      }
    });
    $.each(types,function(index,curr){
      $('#types').append("<option>"+curr+"</option>");
    });
  });
}

function submit(){
  $('#Numcount').text("");
  var zip = $('#zip').val();
  var date = $('#date').val();
  var type = $('#types  :selected').text();
  var result = $('#results  :selected').text();
  $(".tabcontent").hide();
  $(".tablinks").removeClass("active");
  $("#MapBtn").addClass("active");
  $("#Map").show();
  query = "https://data.cityofchicago.org/resource/cwig-ma7x.json?";
  var istrue = 0;
  if(zip != ""){
    $.each(zips,function(indx,curr){
      if(zip === curr){
        istrue = 1;
      }
    });
  }

  if((istrue === 1) || (date != "") || (type != "") || (result != "")){
    query = query+"$query=select * where ";
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
    query = query + "upper(facility_type)='" + type + "'";
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
  $(".tabcontent").hide();
  $(".tablinks").removeClass("active");

  $('#' + tabName).show();
  evt.currentTarget.className += " active";
}