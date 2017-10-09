function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  $(".tabcontent").hide();
  $(".tablinks").removeClass("active");

  $('#' + tabName).show();
  evt.currentTarget.className += " active";
}