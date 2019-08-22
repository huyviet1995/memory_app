var modal = function() {}

modal.switchViews = function({option =  '#sign-in-view'} = {}) {
  var view, otherView;
  if (option == '#sign-in-option') {
    view = '#sign-in-view';
    otherView = '#sign-up-view';
  }
  else if (option = '#sign-up-option') {
    view = '#sign-up-view';
    otherView = '#sign-in-view';
  }
  
  $(view).css({
    'display': 'table-cell'
  })

  $(otherView).css({
    'display': 'none'
  })
}

$(document).ready(function() {
  $('#box-header #sign-in-option').on('click', function() {
    modal.switchViews({option: '#sign-in-option'})
  })

  $('#box-header #sign-up-option').on('click', function() {
    modal.switchViews({option: '#sign-up-option'}) 
  })
})