
//document.getElementById('wrap').style.height = (window.innerHeight) + "px";
$(document).ready(function() {
  
  $('select').material_select();
  $('.tooltipped').tooltip({delay: 50});

  $('textarea#description, textarea#method').characterCounter();
  $('.carousel').carousel();
});

$('.recipes').dropdown();
$('.dropdown-button').dropdown();

(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

/* $(function() {
  $('textarea').froalaEditor({
    // Set custom buttons with separator between them.
    toolbarButtons: ['fullscreen','undo', 'redo' , '|', 'bold', 'italic', 'underline', 'formatOL', 'formatUL', 'clearFormatting', '|', 'help', '|', 'html'],
    // toolbarButtonsXS: ['undo', 'redo' , 'bold', 'italic', 'underline']
  });
}); */