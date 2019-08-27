header = new function() {};

$(document).ready(function() {
  /* Register event */
  $('.menu #login').on('click', function() {
    $('#dropdown-login').toggleClass('show');
  })

  /* CLick outside the box will close it  */
  $(window).click(function(e) {
    if (!e.target.matches('#login')) {
      if ($('#dropdown-login').hasClass('show')) {
        $('#dropdown-login').removeClass('show')
      }
    }
  }) 
})

