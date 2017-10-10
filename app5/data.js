function getData(){
  $.get("https://data.cityofchicago.org/resource/suj7-cg3j.json?$select=vehicle_make_model,COUNT(vehicle_make_model)&$group=vehicle_make_model", function(response){
    drawChart(response);
  });
  }
  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  var chart2;
  var data2;
  function drawChart(carData) {

    // Create the data table.
    var data = new google.visualization.DataTable();

    
    data.addColumn('string', 'Vehicle_Make_Model');
    data.addColumn('number', 'Count');
    $.each(carData,function(index,curr){
      data.addRow([curr.vehicle_make_model, parseFloat(curr.COUNT_vehicle_make_model)]);
    })
    // Set chart options
    var options = {'title':'City info',
                  
    width: $(window).width(),
    height: $(window).height()*0.75
  };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById("chart_div"));
    chart.draw(data, options);

    chart2= chart;
    data2 = data;
  }

  $(window).resize(function(){
      var options = {
        'title':'City info',
        width: $(window).width(),
    height: $(window).height()*0.75
      }
      chart2.draw(data2, options);
  });
